package com.skillsync.bootstrap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsync.entity.*;
import com.skillsync.repository.*;
import com.skillsync.service.JsonUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Seeds the database on startup with:
 *  - Default admin user
 *  - Skills, paths, milestones, code tasks (from classpath JSON, which mirrors
 *    src/data/skills.ts and src/data/tasks.ts in the frontend).
 *
 * Safe to run multiple times: it only inserts when the corresponding table is empty.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository users;
    private final UserStatsRepository stats;
    private final SkillRepository skills;
    private final LearningPathRepository paths;
    private final MilestoneRepository milestones;
    private final CodeTaskRepository codeTasks;
    private final PasswordEncoder encoder;

    @Value("${app.bootstrap.admin-email}")    private String adminEmail;
    @Value("${app.bootstrap.admin-password}") private String adminPassword;
    @Value("${app.bootstrap.admin-name}")     private String adminName;

    public DataSeeder(UserRepository users, UserStatsRepository stats, SkillRepository skills,
                      LearningPathRepository paths, MilestoneRepository milestones,
                      CodeTaskRepository codeTasks, PasswordEncoder encoder) {
        this.users = users;
        this.stats = stats;
        this.skills = skills;
        this.paths = paths;
        this.milestones = milestones;
        this.codeTasks = codeTasks;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedAdmin();
        seedSkills();
        seedPaths();
        seedCodeTasks();
    }

    private void seedAdmin() {
        users.findByEmailIgnoreCase(adminEmail).ifPresentOrElse(u -> {}, () -> {
            User u = new User();
            u.setEmail(adminEmail);
            u.setPasswordHash(encoder.encode(adminPassword));
            u.setFullName(adminName);
            u.setRole(Role.ADMIN);
            u.setStatus(AccountStatus.ACTIVE);
            User saved = users.save(u);
            stats.save(new UserStats(saved.getId()));
        });
    }

    private void seedSkills() {
        if (skills.count() > 0) return;
        List<Map<String, Object>> raw = readJson("data/skills.json");
        if (raw == null) return;
        for (Map<String, Object> s : raw) {
            Skill sk = new Skill();
            sk.setTitle((String) s.get("title"));
            sk.setCategory((String) s.get("category"));
            sk.setLevel((String) s.get("level"));
            sk.setDifficulty(Skill.Difficulty.valueOf((String) s.get("difficulty")));
            sk.setXp(((Number) s.get("xp")).intValue());
            sk.setDescription((String) s.get("description"));
            sk.setPathSlug((String) s.get("pathSlug"));
            sk.setAccent(Skill.Accent.valueOf((String) s.get("accent")));
            skills.save(sk);
        }
    }

    private void seedPaths() {
        if (paths.count() > 0) return;
        Map<String, Object> raw = readJsonObject("data/paths.json");
        if (raw == null) return;
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> pathList = (List<Map<String, Object>>) raw.get("paths");
        @SuppressWarnings("unchecked")
        Map<String, List<Map<String, Object>>> msBySlug =
                (Map<String, List<Map<String, Object>>>) raw.get("milestonesByPath");

        for (Map<String, Object> p : pathList) {
            LearningPath lp = new LearningPath();
            lp.setTitle((String) p.get("title"));
            lp.setDescription((String) p.get("description"));
            lp.setStudents(0);
            int milestoneCount = 0;
            String slug = (String) p.get("slug");
            if (slug != null && msBySlug != null && msBySlug.containsKey(slug)) {
                milestoneCount = msBySlug.get(slug).size();
            }
            lp.setMilestones(milestoneCount);
            lp = paths.save(lp);

            if (slug != null && msBySlug != null && msBySlug.containsKey(slug)) {
                int ord = 0;
                for (Map<String, Object> ms : msBySlug.get(slug)) {
                    Milestone m = new Milestone();
                    m.setPathId(lp.getId());
                    m.setTitle((String) ms.get("title"));
                    m.setType((String) ms.get("type"));
                    m.setStatus(MilestoneStatus.valueOf((String) ms.getOrDefault("status", "active")));
                    m.setXpReward(((Number) ms.getOrDefault("xp_reward", 0)).intValue());
                    m.setOrd(ord++);
                    @SuppressWarnings("unchecked")
                    Map<String, Object> payload = (Map<String, Object>) ms.get("payload");
                    m.setPayload(payload == null ? "{}" : JsonUtil.stringify(payload));
                    milestones.save(m);
                }
            }
        }
    }

    private void seedCodeTasks() {
        if (codeTasks.count() > 0) return;
        List<Map<String, Object>> raw = readJson("data/code_tasks.json");
        if (raw == null) return;
        for (Map<String, Object> t : raw) {
            CodeTask ct = new CodeTask();
            ct.setId((String) t.get("id"));
            ct.setTitle((String) t.get("title"));
            ct.setDifficulty(CodeTask.Difficulty.valueOf((String) t.get("difficulty")));
            ct.setAcceptance((String) t.get("acceptance"));
            ct.setTags(JsonUtil.stringify(t.get("tags")));
            ct.setInstructions((String) t.get("instructions"));
            ct.setHints(JsonUtil.stringify(t.get("hints")));
            ct.setEditorial((String) t.get("editorial"));
            @SuppressWarnings("unchecked")
            Map<String, Object> starter = (Map<String, Object>) t.get("starter_code");
            ct.setStarterCode(JsonUtil.stringify(starter));
            ct.setFunctionName((String) t.get("functionName"));
            ct.setTestCases(JsonUtil.stringify(t.get("test_cases")));
            ct.setXpReward(((Number) t.getOrDefault("xp_reward", 0)).intValue());
            codeTasks.save(ct);
        }
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> readJson(String classpath) {
        try (InputStream in = getClass().getClassLoader().getResourceAsStream(classpath)) {
            if (in == null) return null;
            return new ObjectMapper().readValue(in, List.class);
        } catch (Exception e) {
            System.err.println("[DataSeeder] Failed to read " + classpath + ": " + e.getMessage());
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> readJsonObject(String classpath) {
        try (InputStream in = getClass().getClassLoader().getResourceAsStream(classpath)) {
            if (in == null) return null;
            return new ObjectMapper().readValue(in, Map.class);
        } catch (Exception e) {
            System.err.println("[DataSeeder] Failed to read " + classpath + ": " + e.getMessage());
            return null;
        }
    }
}

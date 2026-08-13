package com.skillsync.service;

import com.skillsync.dto.AuthDtos.UserStatsDto;
import com.skillsync.dto.StatsDtos;
import com.skillsync.entity.AccountStatus;
import com.skillsync.entity.User;
import com.skillsync.entity.UserStats;
import com.skillsync.exception.ApiException;
import com.skillsync.repository.UserRepository;
import com.skillsync.repository.UserStatsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class StatsService {

    private final UserStatsRepository statsRepo;
    private final UserRepository users;

    public StatsService(UserStatsRepository statsRepo, UserRepository users) {
        this.statsRepo = statsRepo;
        this.users = users;
    }

    public UserStatsDto get(Long userId) {
        UserStats s = statsRepo.findById(userId).orElseGet(() -> new UserStats(userId));
        return toDto(s);
    }

    @Transactional
    public UserStatsDto update(Long userId, StatsDtos.UpdateStatsRequest req) {
        UserStats s = statsRepo.findById(userId).orElseGet(() -> new UserStats(userId));

        int xpDelta = req.xpDelta() == null ? 0 : req.xpDelta();
        if (xpDelta > 0) s.setXp(s.getXp() + xpDelta);

        if (req.streak() != null) s.setStreak(Math.max(0, req.streak()));

        if (req.milestoneId() != null && !req.milestoneId().isBlank()) {
            Set<String> completed = new LinkedHashSet<>(JsonUtil.readStringList(s.getCompletedMilestones()));
            completed.add(req.milestoneId());
            s.setCompletedMilestones(JsonUtil.stringify(new ArrayList<>(completed)));
        }

        s.setRankLabel(computeRank(s.getXp()));
        s.setLastActiveAt(Instant.now());
        s = statsRepo.save(s);
        return toDto(s);
    }

    @Transactional
    public UserStatsDto grantXp(Long userId, int amount) {
        UserStats s = statsRepo.findById(userId).orElseGet(() -> new UserStats(userId));
        s.setXp(s.getXp() + amount);
        s.setRankLabel(computeRank(s.getXp()));
        s.setLastActiveAt(Instant.now());
        return toDto(statsRepo.save(s));
    }

    @Transactional
    public UserStatsDto reset(Long userId) {
        UserStats s = statsRepo.findById(userId).orElseThrow(() -> ApiException.notFound("Stats not found"));
        s.setXp(0);
        s.setStreak(0);
        s.setRankLabel("New Pathfinder");
        s.setCompletedMilestones("[]");
        s.setLastActiveAt(Instant.now());
        return toDto(statsRepo.save(s));
    }

    public StatsDtos.LeaderboardResponse leaderboard(String range, String currentUserEmail) {
        List<UserStats> top = statsRepo.findTop10ByOrderByXpDesc();
        Instant cutoff = switch (range == null ? "all-time" : range) {
            case "weekly"  -> Instant.now().minus(7, ChronoUnit.DAYS);
            case "monthly" -> Instant.now().minus(30, ChronoUnit.DAYS);
            default        -> Instant.EPOCH;
        };
        List<StatsDtos.LeaderboardEntryDto> entries = new ArrayList<>();
        int rank = 1;
        for (UserStats s : top) {
            if (s.getLastActiveAt() != null && s.getLastActiveAt().isBefore(cutoff) && !"all-time".equals(range)) {
                continue;
            }
            User u = users.findById(s.getUserId()).orElse(null);
            if (u == null || u.getStatus() != AccountStatus.ACTIVE) continue;
            String badge = s.getXp() >= 3000 ? "Master Pathfinder"
                         : s.getXp() >= 1500 ? "Specialist"
                         : s.getXp() >= 500  ? "Intermediate Pathfinder"
                         : "New Pathfinder";
            String name = (u.getFullName() == null || u.getFullName().isBlank())
                    ? u.getEmail().split("@")[0] : u.getFullName();
            boolean isCurrent = currentUserEmail != null
                    && currentUserEmail.equalsIgnoreCase(u.getEmail());
            entries.add(new StatsDtos.LeaderboardEntryDto(
                    rank++, name, u.getEmail(), s.getXp(), s.getStreak(), badge, isCurrent));
        }
        return new StatsDtos.LeaderboardResponse(range == null ? "all-time" : range, entries);
    }

    public List<StatsDtos.AdminStudentDto> adminStudentList() {
        List<User> all = users.findByRoleOrderByCreatedAtAsc(com.skillsync.entity.Role.USER);
        List<StatsDtos.AdminStudentDto> out = new ArrayList<>();
        for (User u : all) {
            UserStats s = statsRepo.findById(u.getId()).orElse(new UserStats(u.getId()));
            String name = (u.getFullName() == null || u.getFullName().isBlank())
                    ? u.getEmail().split("@")[0] : u.getFullName();
            out.add(new StatsDtos.AdminStudentDto(
                    u.getId(), name, u.getEmail(),
                    s.getXp(), s.getStreak(), s.getRankLabel(),
                    u.getStatus().name().toLowerCase()));
        }
        return out;
    }

    @Transactional
    public StatsDtos.AdminStudentDto updateStatus(Long userId, String statusStr) {
        User u = users.findById(userId).orElseThrow(() -> ApiException.notFound("User not found"));
        AccountStatus next;
        try {
            next = AccountStatus.valueOf(statusStr.toUpperCase());
        } catch (Exception e) {
            throw ApiException.badRequest("Invalid status: " + statusStr);
        }
        u.setStatus(next);
        users.save(u);
        UserStats s = statsRepo.findById(userId).orElse(new UserStats(userId));
        String name = (u.getFullName() == null || u.getFullName().isBlank())
                ? u.getEmail().split("@")[0] : u.getFullName();
        return new StatsDtos.AdminStudentDto(
                u.getId(), name, u.getEmail(),
                s.getXp(), s.getStreak(), s.getRankLabel(), u.getStatus().name().toLowerCase());
    }

    private String computeRank(int xp) {
        if (xp >= 3000) return "Grandmaster Pathfinder";
        if (xp >= 1500) return "Master Pathfinder";
        if (xp >= 500)  return "Intermediate Pathfinder";
        return "New Pathfinder";
    }

    public UserStatsDto toDto(UserStats s) {
        return new UserStatsDto(
                s.getXp(), s.getStreak(), s.getRankLabel(),
                JsonUtil.readStringList(s.getCompletedMilestones()));
    }
}

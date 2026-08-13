package com.skillsync.service;

import com.skillsync.dto.SkillDtos;
import com.skillsync.entity.Skill;
import com.skillsync.exception.ApiException;
import com.skillsync.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository repo;

    public SkillService(SkillRepository repo) {
        this.repo = repo;
    }

    public List<SkillDtos.SkillDto> list(String category, String q) {
        List<Skill> src = (category == null || category.isBlank() || category.equalsIgnoreCase("All"))
                ? repo.findAllByOrderByIdAsc()
                : repo.findByCategoryIgnoreCaseOrderByIdAsc(category);
        String needle = q == null ? "" : q.toLowerCase();
        return src.stream()
                .filter(s -> needle.isEmpty()
                        || s.getTitle().toLowerCase().contains(needle)
                        || s.getDescription().toLowerCase().contains(needle))
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public SkillDtos.SkillDto create(SkillDtos.CreateSkillRequest req) {
        Skill s = new Skill();
        s.setTitle(req.title());
        s.setCategory(req.category());
        s.setLevel(req.level());
        s.setDifficulty(Skill.Difficulty.valueOf(req.difficulty()));
        s.setXp(req.xp());
        s.setDescription(req.description());
        s.setPathSlug(req.pathSlug());
        s.setAccent(Skill.Accent.valueOf(req.accent()));
        s = repo.save(s);
        return toDto(s);
    }

    public SkillDtos.SkillDto toDto(Skill s) {
        return new SkillDtos.SkillDto(
                s.getId(),
                s.getTitle(),
                s.getCategory(),
                s.getLevel(),
                s.getDifficulty().name(),
                s.getXp(),
                s.getDescription(),
                s.getPathSlug(),
                s.getAccent().name()
        );
    }
}

package com.skillsync.repository;

import com.skillsync.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllByOrderByIdAsc();
    List<Skill> findByCategoryIgnoreCaseOrderByIdAsc(String category);
}

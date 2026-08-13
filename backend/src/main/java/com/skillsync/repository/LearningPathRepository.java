package com.skillsync.repository;

import com.skillsync.entity.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {
    List<LearningPath> findAllByOrderByIdAsc();
}

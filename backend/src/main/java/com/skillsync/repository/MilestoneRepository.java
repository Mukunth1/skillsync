package com.skillsync.repository;

import com.skillsync.entity.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    List<Milestone> findByPathIdOrderByOrdAsc(Long pathId);
    long countByPathId(Long pathId);
}

package com.skillsync.repository;

import com.skillsync.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Submission> findByUserIdAndTaskIdOrderByCreatedAtDesc(Long userId, String taskId);
}

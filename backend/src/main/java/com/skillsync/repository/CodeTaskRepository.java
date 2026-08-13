package com.skillsync.repository;

import com.skillsync.entity.CodeTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CodeTaskRepository extends JpaRepository<CodeTask, String> {
    List<CodeTask> findAllByOrderByIdAsc();
    long count();
}

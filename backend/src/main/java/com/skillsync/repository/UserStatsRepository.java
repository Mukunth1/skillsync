package com.skillsync.repository;

import com.skillsync.entity.UserStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserStatsRepository extends JpaRepository<UserStats, Long> {
    List<UserStats> findTop10ByOrderByXpDesc();
}

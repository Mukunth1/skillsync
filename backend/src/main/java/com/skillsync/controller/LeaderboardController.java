package com.skillsync.controller;

import com.skillsync.dto.StatsDtos;
import com.skillsync.security.AuthPrincipal;
import com.skillsync.service.StatsService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    private final StatsService stats;

    public LeaderboardController(StatsService stats) {
        this.stats = stats;
    }

    @GetMapping
    public StatsDtos.LeaderboardResponse leaderboard(
            @RequestParam(value = "range", required = false, defaultValue = "all-time") String range,
            @AuthenticationPrincipal AuthPrincipal principal) {
        String email = principal == null ? null : principal.getEmail();
        return stats.leaderboard(range, email);
    }
}

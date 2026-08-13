package com.skillsync.controller;

import com.skillsync.dto.AuthDtos.UserStatsDto;
import com.skillsync.dto.StatsDtos;
import com.skillsync.security.AuthPrincipal;
import com.skillsync.service.StatsService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me")
public class UserStatsController {

    private final StatsService stats;

    public UserStatsController(StatsService stats) {
        this.stats = stats;
    }

    @GetMapping("/stats")
    public UserStatsDto get(@AuthenticationPrincipal AuthPrincipal principal) {
        return stats.get(principal.getId());
    }

    @PatchMapping("/stats")
    public UserStatsDto update(@AuthenticationPrincipal AuthPrincipal principal,
                                          @Valid @RequestBody StatsDtos.UpdateStatsRequest req) {
        return stats.update(principal.getId(), req);
    }
}

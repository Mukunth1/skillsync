package com.skillsync.controller;

import com.skillsync.dto.AuthDtos.UserStatsDto;
import com.skillsync.dto.StatsDtos;
import com.skillsync.service.StatsService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final StatsService stats;

    public AdminController(StatsService stats) {
        this.stats = stats;
    }

    @GetMapping("/users")
    public List<StatsDtos.AdminStudentDto> listUsers() {
        return stats.adminStudentList();
    }

    @PostMapping("/users/{id}/grant-xp")
    public UserStatsDto grantXp(@PathVariable Long id,
                                          @Valid @RequestBody StatsDtos.GrantXpRequest req) {
        return stats.grantXp(id, req.amount());
    }

    @PostMapping("/users/{id}/reset")
    public UserStatsDto reset(@PathVariable Long id) {
        return stats.reset(id);
    }

    @PatchMapping("/users/{id}/status")
    public StatsDtos.AdminStudentDto updateStatus(@PathVariable Long id,
                                                   @Valid @RequestBody StatsDtos.UpdateStatusRequest req) {
        return stats.updateStatus(id, req.status());
    }
}

package com.skillsync.dto;

import com.skillsync.dto.AuthDtos.UserStatsDto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class StatsDtos {

    public record UpdateStatsRequest(
            @Min(0) Integer xpDelta,
            Integer streak,
            String milestoneId
    ) {}

    public record LeaderboardEntryDto(
            int rank,
            String name,
            String email,
            int xp,
            int streak,
            String badge,
            boolean isCurrentUser
    ) {}

    public record LeaderboardResponse(
            String range,
            List<LeaderboardEntryDto> entries
    ) {}

    public record AdminStudentDto(
            Long id,
            String name,
            String email,
            int xp,
            int streak,
            String rank,
            String status
    ) {}

    public record GrantXpRequest(
            @Min(1) Integer amount
    ) {}

    public record UpdateStatusRequest(
            @NotBlank String status
    ) {}
}

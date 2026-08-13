package com.skillsync.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

    public record RegisterRequest(
            @NotBlank @Email String email,
            @NotBlank @Size(min = 6, max = 100) String password,
            @NotBlank @Size(min = 1, max = 120) String fullName,
            Boolean admin
    ) {}

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}

    public record UserDto(
            Long id,
            String email,
            String fullName,
            String role,
            String status
    ) {}

    public record UserStatsDto(
            int xp,
            int streak,
            String rank,
            java.util.List<String> completedMilestones
    ) {}

    public record AuthResponse(
            String token,
            UserDto user,
            UserStatsDto stats
    ) {}

    public record MeResponse(
            UserDto user,
            UserStatsDto stats
    ) {}
}

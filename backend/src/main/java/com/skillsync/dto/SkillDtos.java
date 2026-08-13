package com.skillsync.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SkillDtos {

    public record SkillDto(
            Long id,
            String title,
            String category,
            String level,
            String difficulty,
            int xp,
            String description,
            String pathSlug,
            String accent
    ) {}

    public record CreateSkillRequest(
            @NotBlank String title,
            @NotBlank String category,
            @NotBlank String level,
            @NotBlank String difficulty,
            @NotNull Integer xp,
            @NotBlank String description,
            @NotBlank String pathSlug,
            @NotBlank String accent
    ) {}
}

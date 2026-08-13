package com.skillsync.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.Map;

public class PathDtos {

    public record PathDto(
            Long id,
            String title,
            String description,
            int students,
            int milestones
    ) {}

    public record CreatePathRequest(
            @NotBlank String title,
            @NotBlank String description
    ) {}

    public record MilestoneDto(
            Long id,
            Long pathId,
            String title,
            String type,
            String status,
            int xpReward,
            int ord,
            Map<String, Object> payload
    ) {}

    public record PathWithMilestonesDto(
            Long id,
            String title,
            String description,
            int students,
            int milestoneCount,
            List<MilestoneDto> milestoneList
    ) {}

    public record UpdateMilestoneStatusRequest(
            @NotBlank String status // "locked" | "active" | "completed"
    ) {}
}

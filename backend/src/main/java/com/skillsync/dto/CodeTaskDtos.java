package com.skillsync.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.Map;

public class CodeTaskDtos {

    public record CodeTaskDto(
            String id,
            String title,
            String difficulty,
            String acceptance,
            List<String> tags,
            String instructions,
            List<String> hints,
            String editorial,
            Map<String, String> starterCode,
            String functionName,
            List<Map<String, Object>> testCases,
            int xpReward
    ) {}

    public record SubmissionRequest(
            @NotBlank String language,
            @NotBlank String status, // "Passed" or "Failed"
            @NotNull Integer latencyMs
    ) {}

    public record SubmissionDto(
            Long id,
            String taskId,
            String language,
            String status,
            int latencyMs,
            String createdAt
    ) {}
}

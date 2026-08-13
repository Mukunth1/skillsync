package com.skillsync.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsync.dto.CodeTaskDtos;
import com.skillsync.entity.CodeTask;
import com.skillsync.entity.Submission;
import com.skillsync.exception.ApiException;
import com.skillsync.repository.CodeTaskRepository;
import com.skillsync.repository.SubmissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CodeTaskService {

    private final CodeTaskRepository tasks;
    private final SubmissionRepository submissions;

    public CodeTaskService(CodeTaskRepository tasks, SubmissionRepository submissions) {
        this.tasks = tasks;
        this.submissions = submissions;
    }

    public List<CodeTaskDtos.CodeTaskDto> list() {
        return tasks.findAllByOrderByIdAsc().stream().map(this::toDto).toList();
    }

    public CodeTaskDtos.CodeTaskDto byId(String id) {
        CodeTask t = tasks.findById(id).orElseThrow(() -> ApiException.notFound("Task not found"));
        return toDto(t);
    }

    public CodeTaskDtos.CodeTaskDto daily() {
        long count = tasks.count();
        if (count == 0) throw ApiException.notFound("No tasks available");
        long dayIndex = System.currentTimeMillis() / 86_400_000L;
        List<CodeTask> all = tasks.findAllByOrderByIdAsc();
        return toDto(all.get((int) (dayIndex % all.size())));
    }

    @Transactional
    public CodeTaskDtos.SubmissionDto recordSubmission(String taskId, Long userId,
                                                       CodeTaskDtos.SubmissionRequest req) {
        if (!tasks.existsById(taskId)) throw ApiException.notFound("Task not found");
        Submission s = new Submission();
        s.setUserId(userId);
        s.setTaskId(taskId);
        s.setLanguage(req.language());
        s.setStatus(req.status());
        s.setLatencyMs(req.latencyMs());
        s = submissions.save(s);
        return toSubmissionDto(s);
    }

    public List<CodeTaskDtos.SubmissionDto> userSubmissions(Long userId, String taskId) {
        List<Submission> list = (taskId == null)
                ? submissions.findByUserIdOrderByCreatedAtDesc(userId)
                : submissions.findByUserIdAndTaskIdOrderByCreatedAtDesc(userId, taskId);
        return list.stream().map(this::toSubmissionDto).toList();
    }

    public CodeTaskDtos.CodeTaskDto toDto(CodeTask t) {
        Map<String, String> starter = new HashMap<>();
        String raw = t.getStarterCode();
        if (raw != null && !raw.isBlank()) {
            try {
                starter = JsonUtil.readMap(raw).entrySet().stream()
                        .collect(java.util.stream.Collectors.toMap(
                                Map.Entry::getKey, e -> String.valueOf(e.getValue())));
            } catch (Exception ignored) {}
        }
        List<String> tags = JsonUtil.readStringList(t.getTags());
        List<String> hints = JsonUtil.readStringList(t.getHints());
        List<Map<String, Object>> testCases = List.of();
        if (t.getTestCases() != null && !t.getTestCases().isBlank()) {
            try {
                ObjectMapper M = new ObjectMapper();
                testCases = M.readValue(t.getTestCases(),
                        new TypeReference<List<Map<String, Object>>>() {});
            } catch (Exception ignored) {}
        }
        return new CodeTaskDtos.CodeTaskDto(
                t.getId(), t.getTitle(), t.getDifficulty().name(), t.getAcceptance(),
                tags, t.getInstructions(), hints, t.getEditorial(),
                starter, t.getFunctionName(), testCases, t.getXpReward());
    }

    public CodeTaskDtos.SubmissionDto toSubmissionDto(Submission s) {
        return new CodeTaskDtos.SubmissionDto(
                s.getId(), s.getTaskId(), s.getLanguage(), s.getStatus(),
                s.getLatencyMs(), s.getCreatedAt().toString());
    }
}

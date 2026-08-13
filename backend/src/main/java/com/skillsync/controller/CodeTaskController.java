package com.skillsync.controller;

import com.skillsync.dto.CodeTaskDtos;
import com.skillsync.security.AuthPrincipal;
import com.skillsync.service.CodeTaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class CodeTaskController {

    private final CodeTaskService service;

    public CodeTaskController(CodeTaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<CodeTaskDtos.CodeTaskDto> list() {
        return service.list();
    }

    @GetMapping("/daily")
    public CodeTaskDtos.CodeTaskDto daily() {
        return service.daily();
    }

    @GetMapping("/{id}")
    public CodeTaskDtos.CodeTaskDto byId(@PathVariable String id) {
        return service.byId(id);
    }

    @PostMapping("/{id}/submissions")
    public ResponseEntity<CodeTaskDtos.SubmissionDto> record(
            @PathVariable String id,
            @AuthenticationPrincipal AuthPrincipal principal,
            @Valid @RequestBody CodeTaskDtos.SubmissionRequest req) {
        return ResponseEntity.status(201)
                .body(service.recordSubmission(id, principal.getId(), req));
    }

    @GetMapping("/{id}/submissions")
    public List<CodeTaskDtos.SubmissionDto> mine(
            @PathVariable String id,
            @AuthenticationPrincipal AuthPrincipal principal) {
        return service.userSubmissions(principal.getId(), id);
    }
}

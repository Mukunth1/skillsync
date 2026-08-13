package com.skillsync.controller;

import com.skillsync.dto.SkillDtos;
import com.skillsync.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService service;

    public SkillController(SkillService service) {
        this.service = service;
    }

    @GetMapping
    public List<SkillDtos.SkillDto> list(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "q", required = false) String q) {
        return service.list(category, q);
    }

    @PostMapping
    public ResponseEntity<SkillDtos.SkillDto> create(@Valid @RequestBody SkillDtos.CreateSkillRequest req) {
        return ResponseEntity.status(201).body(service.create(req));
    }
}

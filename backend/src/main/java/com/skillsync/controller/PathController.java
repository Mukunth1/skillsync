package com.skillsync.controller;

import com.skillsync.dto.PathDtos;
import com.skillsync.service.PathService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paths")
public class PathController {

    private final PathService service;

    public PathController(PathService service) {
        this.service = service;
    }

    @GetMapping
    public List<PathDtos.PathDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public PathDtos.PathWithMilestonesDto byId(@PathVariable Long id) {
        return service.byId(id);
    }

    @PostMapping
    public ResponseEntity<PathDtos.PathDto> create(@Valid @RequestBody PathDtos.CreatePathRequest req) {
        return ResponseEntity.status(201).body(service.create(req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/milestones/{milestoneId}/status")
    public PathDtos.MilestoneDto updateMilestoneStatus(@PathVariable Long milestoneId,
                                                       @Valid @RequestBody PathDtos.UpdateMilestoneStatusRequest req) {
        return service.updateStatus(milestoneId, req.status());
    }
}

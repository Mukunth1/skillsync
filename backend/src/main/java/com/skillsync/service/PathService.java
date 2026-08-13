package com.skillsync.service;

import com.skillsync.dto.PathDtos;
import com.skillsync.entity.LearningPath;
import com.skillsync.entity.Milestone;
import com.skillsync.entity.MilestoneStatus;
import com.skillsync.exception.ApiException;
import com.skillsync.repository.LearningPathRepository;
import com.skillsync.repository.MilestoneRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class PathService {

    private final LearningPathRepository paths;
    private final MilestoneRepository milestones;

    public PathService(LearningPathRepository paths, MilestoneRepository milestones) {
        this.paths = paths;
        this.milestones = milestones;
    }

    public List<PathDtos.PathDto> list() {
        return paths.findAllByOrderByIdAsc().stream().map(this::toDto).toList();
    }

    public PathDtos.PathWithMilestonesDto byId(Long id) {
        LearningPath p = paths.findById(id).orElseThrow(() -> ApiException.notFound("Path not found"));
        List<PathDtos.MilestoneDto> ms = milestones.findByPathIdOrderByOrdAsc(id).stream()
                .map(this::toMilestoneDto)
                .toList();
        return new PathDtos.PathWithMilestonesDto(
                p.getId(), p.getTitle(), p.getDescription(),
                p.getStudents(), p.getMilestones(), ms);
    }

    @Transactional
    public PathDtos.PathDto create(PathDtos.CreatePathRequest req) {
        LearningPath p = new LearningPath();
        p.setTitle(req.title());
        p.setDescription(req.description());
        p = paths.save(p);
        return toDto(p);
    }

    @Transactional
    public void delete(Long id) {
        if (!paths.existsById(id)) throw ApiException.notFound("Path not found");
        paths.deleteById(id);
    }

    @Transactional
    public PathDtos.MilestoneDto updateStatus(Long milestoneId, String statusStr) {
        Milestone m = milestones.findById(milestoneId)
                .orElseThrow(() -> ApiException.notFound("Milestone not found"));
        MilestoneStatus next;
        try {
            next = MilestoneStatus.valueOf(statusStr);
        } catch (Exception e) {
            throw ApiException.badRequest("Invalid status: " + statusStr);
        }
        m.setStatus(next);
        return toMilestoneDto(milestones.save(m));
    }

    public PathDtos.PathDto toDto(LearningPath p) {
        return new PathDtos.PathDto(p.getId(), p.getTitle(), p.getDescription(), p.getStudents(), p.getMilestones());
    }

    public PathDtos.MilestoneDto toMilestoneDto(Milestone m) {
        Map<String, Object> payload = JsonUtil.readMap(m.getPayload());
        return new PathDtos.MilestoneDto(
                m.getId(), m.getPathId(), m.getTitle(), m.getType(),
                m.getStatus().name(), m.getXpReward(), m.getOrd(), payload);
    }
}

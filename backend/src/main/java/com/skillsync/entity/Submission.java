package com.skillsync.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "submissions", indexes = {
        @Index(name = "idx_submissions_user", columnList = "user_id, created_at"),
        @Index(name = "idx_submissions_task", columnList = "task_id, created_at")
})
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "task_id", nullable = false, length = 80)
    private String taskId;

    @Column(nullable = false, length = 16)
    private String language;

    @Column(nullable = false, length = 16)
    private String status; // "Passed" or "Failed"

    @Column(name = "latency_ms", nullable = false)
    private int latencyMs;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTaskId() { return taskId; }
    public void setTaskId(String taskId) { this.taskId = taskId; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getLatencyMs() { return latencyMs; }
    public void setLatencyMs(int latencyMs) { this.latencyMs = latencyMs; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}

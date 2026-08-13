package com.skillsync.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "user_stats")
public class UserStats {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false)
    private int xp = 0;

    @Column(nullable = false)
    private int streak = 0;

    @Column(name = "rank_label", nullable = false, length = 64)
    private String rankLabel = "New Pathfinder";

    /** Comma-separated milestone IDs (kept simple — frontend treats as a set). */
    @Lob
    @Column(name = "completed_milestones", nullable = false, columnDefinition = "TEXT")
    private String completedMilestones = "";

    @Column(name = "last_active_at")
    private Instant lastActiveAt;

    public UserStats() {}

    public UserStats(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public int getStreak() { return streak; }
    public void setStreak(int streak) { this.streak = streak; }

    public String getRankLabel() { return rankLabel; }
    public void setRankLabel(String rankLabel) { this.rankLabel = rankLabel; }

    public String getCompletedMilestones() { return completedMilestones; }
    public void setCompletedMilestones(String completedMilestones) { this.completedMilestones = completedMilestones; }

    public Instant getLastActiveAt() { return lastActiveAt; }
    public void setLastActiveAt(Instant lastActiveAt) { this.lastActiveAt = lastActiveAt; }
}

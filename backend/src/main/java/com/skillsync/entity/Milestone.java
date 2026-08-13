package com.skillsync.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "milestones")
public class Milestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "path_id", nullable = false)
    private Long pathId;

    @Column(nullable = false, length = 200)
    private String title;

    /** "quiz" or "code" */
    @Column(nullable = false, length = 16)
    private String type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private MilestoneStatus status = MilestoneStatus.locked;

    @Column(name = "xp_reward", nullable = false)
    private int xpReward = 0;

    /** JSON payload (quiz questions or code task data) */
    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String payload = "{}";

    @Column(nullable = false)
    private int ord = 0;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPathId() { return pathId; }
    public void setPathId(Long pathId) { this.pathId = pathId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public MilestoneStatus getStatus() { return status; }
    public void setStatus(MilestoneStatus status) { this.status = status; }

    public int getXpReward() { return xpReward; }
    public void setXpReward(int xpReward) { this.xpReward = xpReward; }

    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }

    public int getOrd() { return ord; }
    public void setOrd(int ord) { this.ord = ord; }
}

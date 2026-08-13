package com.skillsync.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "paths")
public class LearningPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private int students = 0;

    @Column(nullable = false)
    private int milestones = 0;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getStudents() { return students; }
    public void setStudents(int students) { this.students = students; }

    public int getMilestones() { return milestones; }
    public void setMilestones(int milestones) { this.milestones = milestones; }
}

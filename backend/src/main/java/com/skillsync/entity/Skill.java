package com.skillsync.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 80)
    private String category;

    @Column(nullable = false, length = 40)
    private String level;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Difficulty difficulty;

    @Column(nullable = false)
    private int xp;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "path_slug", nullable = false, length = 80)
    private String pathSlug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Accent accent;

    public enum Difficulty { Easy, Intermediate, Hard, Advanced }
    public enum Accent { gold, sky, emerald, rose, violet }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPathSlug() { return pathSlug; }
    public void setPathSlug(String pathSlug) { this.pathSlug = pathSlug; }

    public Accent getAccent() { return accent; }
    public void setAccent(Accent accent) { this.accent = accent; }
}

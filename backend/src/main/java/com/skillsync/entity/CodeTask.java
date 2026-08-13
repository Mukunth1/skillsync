package com.skillsync.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "code_tasks")
public class CodeTask {

    @Id
    @Column(length = 80)
    private String id;

    @Column(nullable = false, length = 200)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Difficulty difficulty;

    @Column(length = 20)
    private String acceptance;

    /** JSON array of strings */
    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String tags = "[]";

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String instructions;

    /** JSON array of strings */
    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String hints = "[]";

    @Lob
    @Column(columnDefinition = "TEXT")
    private String editorial;

    /** JSON object: { javascript, python, java, cpp, c } */
    @Lob
    @Column(name = "starter_code", nullable = false, columnDefinition = "TEXT")
    private String starterCode;

    @Column(name = "function_name", nullable = false, length = 120)
    private String functionName;

    /** JSON array of { name, args, expected } */
    @Lob
    @Column(name = "test_cases", nullable = false, columnDefinition = "TEXT")
    private String testCases;

    @Column(name = "xp_reward", nullable = false)
    private int xpReward = 0;

    public enum Difficulty { Easy, Medium, Hard }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }

    public String getAcceptance() { return acceptance; }
    public void setAcceptance(String acceptance) { this.acceptance = acceptance; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }

    public String getHints() { return hints; }
    public void setHints(String hints) { this.hints = hints; }

    public String getEditorial() { return editorial; }
    public void setEditorial(String editorial) { this.editorial = editorial; }

    public String getStarterCode() { return starterCode; }
    public void setStarterCode(String starterCode) { this.starterCode = starterCode; }

    public String getFunctionName() { return functionName; }
    public void setFunctionName(String functionName) { this.functionName = functionName; }

    public String getTestCases() { return testCases; }
    public void setTestCases(String testCases) { this.testCases = testCases; }

    public int getXpReward() { return xpReward; }
    public void setXpReward(int xpReward) { this.xpReward = xpReward; }
}

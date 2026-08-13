/**
 * Skill Sync API types — mirror the Spring Boot DTOs in
 * backend/src/main/java/com/skillsync/dto/*.
 *
 * These are the only types that should change when the backend shape
 * changes; UI components continue to use their existing local types.
 */

export type Role = 'USER' | 'ADMIN';
export type AccountStatus = 'ACTIVE' | 'SUSPENDED';

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  status: AccountStatus;
}

export interface UserStats {
  xp: number;
  streak: number;
  rank: string;
  completedMilestones: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
  stats: UserStats;
}

export interface MeResponse {
  user: User;
  stats: UserStats;
}

export interface Skill {
  id: number;
  title: string;
  category: string;
  level: string;
  difficulty: 'Easy' | 'Intermediate' | 'Hard' | 'Advanced';
  xp: number;
  description: string;
  pathSlug: string;
  accent: 'gold' | 'sky' | 'emerald' | 'rose' | 'violet';
}

export interface LearningPath {
  id: number;
  title: string;
  description: string;
  students: number;
  milestones: number;
}

export interface Milestone {
  id: number;
  pathId: number;
  title: string;
  type: 'quiz' | 'code';
  status: 'locked' | 'active' | 'completed';
  xpReward: number;
  ord: number;
  payload: unknown;
}

export interface PathWithMilestones extends LearningPath {
  milestoneList: Milestone[];
}

export interface TestCase {
  name: string;
  args: unknown[];
  expected: unknown;
}

export interface CodeTask {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance?: string;
  tags: string[];
  instructions: string;
  hints: string[];
  editorial?: string;
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
    c: string;
  };
  functionName: string;
  testCases: TestCase[];
  xpReward: number;
}

export interface Submission {
  id: number;
  taskId: string;
  language: string;
  status: 'Passed' | 'Failed';
  latencyMs: number;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  email: string;
  xp: number;
  streak: number;
  badge: string;
  isCurrentUser: boolean;
}

export interface LeaderboardResponse {
  range: string;
  entries: LeaderboardEntry[];
}

export interface AdminStudent {
  id: number;
  name: string;
  email: string;
  xp: number;
  streak: number;
  rank: string;
  status: 'active' | 'suspended';
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

/**
 * Skill Sync API client — talks to the Spring Boot backend at VITE_API_BASE_URL.
 * Replaces src/lib/supabase.js. Stores JWT in localStorage under "skillsync_jwt".
 */

import type {
  AdminStudent,
  AuthResponse,
  CodeTask,
  LearningPath,
  LeaderboardResponse,
  MeResponse,
  Milestone,
  PathWithMilestones,
  Skill,
  Submission,
  UserStats,
} from '../types/api';

const BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:8080/api';

const TOKEN_KEY = 'skillsync_jwt';

export function getToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null): void {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore — sandboxed iframes
  }
}

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: { auth?: boolean } = { auth: true },
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (options.auth !== false) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  const text = await res.text();
  let payload: unknown = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!res.ok) {
    const message =
      (payload && typeof payload === 'object' && 'message' in payload && typeof (payload as { message: unknown }).message === 'string'
        ? (payload as { message: string }).message
        : `Request failed (${res.status})`);
    throw new ApiError(message, res.status, payload);
  }

  return payload as T;
}

// ---------- Auth ----------

export const auth = {
  register: (email: string, password: string, fullName: string, admin = false) =>
    request<AuthResponse>(
      'POST',
      '/auth/register',
      { email, password, fullName, admin },
      { auth: false },
    ),
  login: (email: string, password: string) =>
    request<AuthResponse>('POST', '/auth/login', { email, password }, { auth: false }),
  logout: () => request<void>('POST', '/auth/logout', undefined, { auth: false }),
  me: () => request<MeResponse>('GET', '/auth/me'),
};

// ---------- User stats ----------

export const stats = {
  get: () => request<UserStats>('GET', '/users/me/stats'),
  update: (patch: { xpDelta?: number; streak?: number; milestoneId?: string }) =>
    request<UserStats>('PATCH', '/users/me/stats', patch),
};

// ---------- Skills ----------

export const skillsApi = {
  list: (params?: { category?: string; q?: string }) => {
    const qs = new URLSearchParams();
    if (params?.category) qs.set('category', params.category);
    if (params?.q) qs.set('q', params.q);
    const suffix = qs.toString() ? `?${qs.toString()}` : '';
    return request<Skill[]>('GET', `/skills${suffix}`, undefined, { auth: false });
  },
};

// ---------- Paths ----------

export const pathsApi = {
  list: () => request<LearningPath[]>('GET', '/paths', undefined, { auth: false }),
  byId: (id: number) => request<PathWithMilestones>('GET', `/paths/${id}`, undefined, { auth: false }),
  create: (body: { title: string; description: string }) =>
    request<LearningPath>('POST', '/paths', body),
  delete: (id: number) => request<void>('DELETE', `/paths/${id}`),
  setMilestoneStatus: (milestoneId: number, status: 'locked' | 'active' | 'completed') =>
    request<Milestone>('PUT', `/paths/milestones/${milestoneId}/status`, { status }),
};

// ---------- Code tasks ----------

export const tasksApi = {
  list: () => request<CodeTask[]>('GET', '/tasks', undefined, { auth: false }),
  byId: (id: string) => request<CodeTask>('GET', `/tasks/${id}`, undefined, { auth: false }),
  daily: () => request<CodeTask>('GET', '/tasks/daily', undefined, { auth: false }),
  submit: (id: string, payload: { language: string; status: 'Passed' | 'Failed'; latencyMs: number }) =>
    request<Submission>('POST', `/tasks/${id}/submissions`, payload),
  mySubmissions: (id: string) => request<Submission[]>('GET', `/tasks/${id}/submissions`),
};

// ---------- Leaderboard ----------

export const leaderboardApi = {
  get: (range: 'weekly' | 'monthly' | 'all-time' = 'all-time') =>
    request<LeaderboardResponse>('GET', `/leaderboard?range=${range}`, undefined, { auth: false }),
};

// ---------- Admin ----------

export const adminApi = {
  users: () => request<AdminStudent[]>('GET', '/admin/users'),
  grantXp: (id: number, amount: number) =>
    request<UserStats>('POST', `/admin/users/${id}/grant-xp`, { amount }),
  reset: (id: number) => request<UserStats>('POST', `/admin/users/${id}/reset`),
  setStatus: (id: number, status: 'active' | 'suspended') =>
    request<AdminStudent>('PATCH', `/admin/users/${id}/status`, { status }),
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApiError, auth, getToken, setToken, stats as statsApi } from '../lib/apiClient';
import { safeStorage } from '../lib/safeStorage';
import type { UserStats } from '../types/api';

/**
 * AuthContext — Spring Boot edition.
 *
 * Public surface is identical to the previous Supabase-backed version so every
 * page (Login, Register, AdminRegister, Dashboard, LeaderboardView, Navbar,
 * ProtectedRoute) keeps working without changes.
 */

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  userStats: UserStats;
  isAdmin: boolean;
  registerUser: (email: string, name: string, password?: string, admin?: boolean) => Promise<boolean>;
  loginUser: (email: string, password?: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateUserStats: (addXp: number, milestoneId?: string) => void;
}

const defaultStats: UserStats = {
  xp: 0,
  streak: 0,
  rank: 'New Pathfinder',
  completedMilestones: [],
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userStats: defaultStats,
  isAdmin: false,
  registerUser: async () => false,
  loginUser: async () => false,
  signOut: async () => {},
  updateUserStats: () => {},
});

const STATS_CACHE_PREFIX = 'skillsync_stats_';

function cacheKey(email: string | null | undefined): string | null {
  if (!email) return null;
  return STATS_CACHE_PREFIX + email.trim().toLowerCase();
}

function readCachedStats(email: string | null | undefined): UserStats | null {
  const k = cacheKey(email);
  if (!k) return null;
  try {
    const raw = safeStorage.getItem(k);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.xp === 'number') return parsed;
  } catch {
    // ignore corrupt cache
  }
  return null;
}

function writeCachedStats(email: string | null | undefined, value: UserStats): void {
  const k = cacheKey(email);
  if (!k) return;
  try {
    safeStorage.setItem(k, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function clearCachedStats(email: string | null | undefined): void {
  const k = cacheKey(email);
  if (!k) return;
  try {
    safeStorage.removeItem(k);
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>(defaultStats);

  // Bootstrap session from stored JWT.
  useEffect(() => {
    let cancelled = false;
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    auth
      .me()
      .then(({ user, stats }) => {
        if (cancelled) return;
        const u: AuthUser = {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        };
        setUser(u);
        setIsAdmin(user.role === 'ADMIN');
        setUserStats({
          xp: stats.xp,
          streak: stats.streak,
          rank: stats.rank,
          completedMilestones: stats.completedMilestones ?? [],
        });
        writeCachedStats(user.email, {
          xp: stats.xp,
          streak: stats.streak,
          rank: stats.rank,
          completedMilestones: stats.completedMilestones ?? [],
        });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          setToken(null);
        } else {
          console.warn('Auth bootstrap failed:', err);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const applyStats = (next: UserStats, email: string | null | undefined) => {
    setUserStats(next);
    writeCachedStats(email, next);
  };

  const registerUser = async (
    email: string,
    name: string,
    password?: string,
    admin = false,
  ): Promise<boolean> => {
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    const cleanEmail = email.trim().toLowerCase();
    const res = await auth.register(cleanEmail, password, name, admin);
    setToken(res.token);
    const u: AuthUser = {
      id: res.user.id,
      email: res.user.email,
      fullName: res.user.fullName,
      role: res.user.role,
    };
    setUser(u);
    setIsAdmin(res.user.role === 'ADMIN');
    applyStats(
      {
        xp: res.stats.xp,
        streak: res.stats.streak,
        rank: res.stats.rank,
        completedMilestones: res.stats.completedMilestones ?? [],
      },
      res.user.email,
    );
    return true;
  };

  const loginUser = async (email: string, password?: string): Promise<boolean> => {
    if (!password) throw new Error('Password is required.');
    const cleanEmail = email.trim().toLowerCase();
    const res = await auth.login(cleanEmail, password);
    setToken(res.token);
    const u: AuthUser = {
      id: res.user.id,
      email: res.user.email,
      fullName: res.user.fullName,
      role: res.user.role,
    };
    setUser(u);
    setIsAdmin(res.user.role === 'ADMIN');
    applyStats(
      {
        xp: res.stats.xp,
        streak: res.stats.streak,
        rank: res.stats.rank,
        completedMilestones: res.stats.completedMilestones ?? [],
      },
      res.user.email,
    );
    return res.user.role === 'ADMIN';
  };

  const signOut = async (): Promise<void> => {
    const prevEmail = user?.email;
    setIsAdmin(false);
    setUser(null);
    setUserStats(defaultStats);
    clearCachedStats(prevEmail);
    setToken(null);
    try {
      await auth.logout();
    } catch {
      // JWT is already cleared locally.
    }
  };

  /**
   * Local mirror used by the dashboard/terminal after a successful run.
   * The actual stats are persisted server-side via the submissions
   * endpoint or the milestone status endpoint — this just updates the
   * in-memory + localStorage copy so the UI feels instant.
   */
  const updateUserStats = (addXp: number, milestoneId?: string) => {
    if (!user) return;
    setUserStats((prev) => {
      const newXp = prev.xp + addXp;
      const completed =
        milestoneId && !prev.completedMilestones.includes(milestoneId)
          ? [...prev.completedMilestones, milestoneId]
          : prev.completedMilestones;
      let newRank = prev.rank;
      if (newXp >= 3000) newRank = 'Grandmaster Pathfinder';
      else if (newXp >= 1500) newRank = 'Master Pathfinder';
      else if (newXp >= 500) newRank = 'Intermediate Pathfinder';
      const next: UserStats = {
        ...prev,
        xp: newXp,
        rank: newRank,
        completedMilestones: completed,
      };
      writeCachedStats(user.email, next);
      return next;
    });
    // Fire-and-forget server sync.
    statsApi
      .update({ xpDelta: addXp, milestoneId })
      .catch((err) => console.warn('stats sync failed:', err));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userStats,
        isAdmin,
        registerUser,
        loginUser,
        signOut,
        updateUserStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

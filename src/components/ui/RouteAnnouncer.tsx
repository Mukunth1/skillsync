import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RouteAnnouncer — Announces route changes to screen readers via a polite aria-live region.
 * Drop-in accessibility fix for SPA navigation.
 *
 * Usage: mount once inside <BrowserRouter>.
 */
export default function RouteAnnouncer() {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // Derive a human-readable title from the path. Pages can be enhanced later.
    const path = location.pathname;
    const title =
      path === '/' || path === '/dashboard'
        ? 'Dashboard'
        : path.startsWith('/path/')
          ? 'Path'
          : path === '/skills'
            ? 'Skill Paths'
            : path === '/leaderboard'
              ? 'Leaderboard'
              : path === '/tasks'
                ? 'Code Terminal'
                : path === '/login'
                  ? 'Sign In'
                  : path === '/register'
                    ? 'Create Account'
                    : path === '/admin'
                      ? 'Admin Control Panel'
                      : 'Page';
    setAnnouncement(`Navigated to ${title}`);
  }, [location.pathname]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {announcement}
    </div>
  );
}

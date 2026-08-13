// Google OAuth is intentionally out of scope for the Spring Boot migration.
// The original implementation relied on Supabase. To keep imports stable
// while preventing runtime calls to the removed Supabase client, this module
// now exports no-op stubs. Wire a real OAuth flow into the Spring backend
// (e.g. /api/auth/google) before re-enabling.

export function signInWithGoogle(_appName) {
  console.warn('[google-auth] Google sign-in is not available in this build.');
}

export async function handleGoogleRedirect() {
  // No-op.
}

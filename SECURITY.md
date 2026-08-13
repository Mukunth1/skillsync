# Security Policy

## Supported versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

Older versions are not maintained. Please upgrade before reporting issues.

## Reporting a vulnerability

If you discover a security vulnerability in SkillSync, **please report it privately** rather than opening a public issue.

**Email**: mukunthr0@gmail.com

Please include:

- A clear description of the vulnerability
- Steps to reproduce
- The potential impact
- Any suggested fixes (optional)

You should expect a response within **7 days**. We will work with you to understand the issue and coordinate a fix before any public disclosure.

## Security best practices for self-hosting

If you run your own instance of SkillSync:

1. **Change the default admin password** — set `BOOTSTRAP_ADMIN_PASSWORD` to a strong value before first start
2. **Set a real `JWT_SECRET`** — at least 32 random characters, stored in an env var or secret manager
3. **Use a dedicated MySQL user** — don't run as `root`; create a `skillsync` user with limited privileges
4. **Use HTTPS** in production — terminate TLS at a reverse proxy (nginx, Caddy, or a load balancer)
5. **Restrict CORS** — set `ALLOWED_ORIGINS` to your actual frontend domain, not `*`
6. **Keep dependencies updated** — run `npm audit` and `./mvnw versions:display-dependency-updates` regularly
7. **Don't commit secrets** — the `.gitignore` excludes `.env*` and `application.properties` overrides; keep it that way

## Known limitations

- The default JWT secret in `application.properties` is a placeholder. **You must override it for any non-local deployment.**
- Password reset flow is not yet implemented (see Roadmap).
- Email verification is not yet implemented (see Roadmap).

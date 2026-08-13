# SkillSync

A full-stack learning platform that turns curated learning paths and coding challenges into a gamified, trackable experience.

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Spring Boot 3.3 + Java 21 + MySQL + JWT

## Repository layout

```
.
├── backend/        # Spring Boot REST API (port 8080)
├── src/            # React + Vite frontend (port 5173)
├── package.json    # Frontend dependencies + scripts
├── pnpm-workspace.yaml
└── .env.local      # VITE_API_BASE_URL=http://localhost:8080/api
```

## Quick start

### 1. Backend

```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE skillsync CHARACTER SET utf8mb4;"

# Run the API
cd backend
./mvnw spring-boot:run
# → http://localhost:8080/api
```

See `backend/README.md` for full configuration, env vars, and the endpoint table.

### 2. Frontend

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
# → http://localhost:5173
```

The Vite dev server proxies API calls to `http://localhost:8080/api` (configured in `.env.local`).

## Default admin (created on first backend boot)

- **Email**: `admin@skillsync.edu`
- **Password**: `admin123`

Change these via the `BOOTSTRAP_ADMIN_*` env vars before first start.

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite 7, TailwindCSS 4, Framer Motion, Three.js, React Router 7 |
| Backend  | Spring Boot 3.3, Spring Security, Spring Data JPA, Hibernate, Jakarta Validation |
| Database | MySQL 8 |
| Auth     | JWT (jjwt 0.12), BCrypt password hashing |
| Tooling  | Maven (`mvnw`), pnpm/npm |

## API surface

All endpoints live under `/api`. Highlights:

- `POST /api/auth/register` / `POST /api/auth/login` — get a JWT
- `GET /api/auth/me` — current user (auth)
- `GET /api/skills`, `GET /api/paths`, `GET /api/tasks/daily` — public catalog
- `POST /api/tasks/{id}/submissions` — submit code (auth)
- `GET /api/leaderboard` — top users
- `GET /api/admin/users` and friends — admin-only

See `backend/README.md` for the complete table.

# SkillSync Backend (Spring Boot 3 + MySQL)

Replaces the Supabase backend. Preserves the existing React/TypeScript/Vite frontend.

## Stack
- Java 21
- Spring Boot 3.3 (Web, Data JPA, Security, Validation)
- MySQL 8 (driver `com.mysql:mysql-connector-j`)
- JWT (jjwt 0.12)

## Configuration (env vars override defaults)
| Var | Default | Purpose |
|---|---|---|
| `SERVER_PORT` | `8080` | HTTP port |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_PORT` | `3306` | MySQL port |
| `DB_NAME` | `skillsync` | Database name |
| `DB_USER` | `root` | MySQL user |
| `DB_PASSWORD` | `admin123` | MySQL password |
| `JWT_SECRET` | (placeholder, 32+ chars) | HS256 secret |
| `JWT_EXPIRATION_MS` | `86400000` | Token TTL |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | CORS origins (comma-separated) |
| `BOOTSTRAP_ADMIN_EMAIL` | `admin@skillsync.edu` | Seeded admin |
| `BOOTSTRAP_ADMIN_PASSWORD` | `admin123` | Seeded admin password |
| `BOOTSTRAP_ADMIN_NAME` | `Admin Overseer` | Seeded admin name |

## Run

```bash
# 1) Create the database
mysql -u root -p -e "CREATE DATABASE skillsync CHARACTER SET utf8mb4;"

# 2) Boot
cd backend
./mvnw spring-boot:run
# → http://localhost:8080/api
```

Tables are created automatically (`spring.jpa.hibernate.ddl-auto=update`).
On first boot, `DataSeeder` populates the `skills`, `learning_paths`,
`path_milestones`, `code_tasks` tables from the JSON in
`src/main/resources/data/` and creates the admin user.

## Endpoints

All under `/api`. Auth = `Authorization: Bearer <jwt>`.

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/api/auth/register` | public | `{email,password,fullName,admin?}` → `{token,user,stats}` |
| POST | `/api/auth/login` | public | `{email,password}` → `{token,user,stats}` |
| POST | `/api/auth/logout` | public | 204 |
| GET | `/api/auth/me` | user | current user + stats |
| GET | `/api/users/me/stats` | user | read stats |
| PATCH | `/api/users/me/stats` | user | `{xpDelta?, streak?, milestoneId?}` |
| GET | `/api/skills?category=&q=` | public | list/search skills |
| POST | `/api/skills` | admin | create |
| GET | `/api/paths` | public | list |
| GET | `/api/paths/{id}` | public | path + milestones |
| POST | `/api/paths` | admin | create |
| DELETE | `/api/paths/{id}` | admin | delete |
| PUT | `/api/paths/milestones/{id}/status` | user | `{status}` |
| GET | `/api/tasks` | public | list code tasks |
| GET | `/api/tasks/daily` | public | daily rotating task |
| GET | `/api/tasks/{id}` | public | one task |
| POST | `/api/tasks/{id}/submissions` | user | `{language,status,latencyMs}` |
| GET | `/api/tasks/{id}/submissions` | user | own history |
| GET | `/api/leaderboard?range=weekly|monthly|all-time` | public | top users |
| GET | `/api/admin/users` | admin | student list |
| POST | `/api/admin/users/{id}/grant-xp` | admin | `{amount}` |
| POST | `/api/admin/users/{id}/reset` | admin | reset XP/streak |
| PATCH | `/api/admin/users/{id}/status` | admin | `{status:active|suspended}` |

## Project layout

```
backend/
├── pom.xml
└── src/main/
    ├── java/com/skillsync/
    │   ├── SkillSyncApplication.java
    │   ├── bootstrap/DataSeeder.java
    │   ├── config/{SecurityConfig,WebConfig}.java
    │   ├── security/{JwtService,JwtAuthFilter,AuthPrincipal,UserDetailsServiceImpl}.java
    │   ├── entity/*.java
    │   ├── repository/*.java
    │   ├── dto/*.java
    │   ├── service/*.java
    │   ├── controller/*.java
    │   └── exception/{ApiException,GlobalExceptionHandler}.java
    └── resources/
        ├── application.properties
        └── data/{skills,paths,code_tasks}.json
```

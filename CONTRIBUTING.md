# Contributing to SkillSync

Thanks for your interest in contributing! 🎉

## 🛠️ Development setup

1. **Fork and clone** the repo
2. **Create the database**:
   ```bash
   mysql -u root -p -e "CREATE DATABASE skillsync CHARACTER SET utf8mb4;"
   ```
3. **Start the backend**:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
4. **Start the frontend** (in a separate terminal):
   ```bash
   npm install
   npm run dev
   ```
5. Open http://localhost:5173

The default admin (`admin@skillsync.edu` / `admin123`) is created on first backend boot.

## 🧪 Before opening a PR

Run the relevant checks:

```bash
# Backend
cd backend
./mvnw test
./mvnw clean compile

# Frontend
npm run lint
npm run build
```

## 📝 Pull request process

1. **Open an issue first** to discuss significant changes (features, refactors, breaking changes)
2. **Branch from `main`** with a descriptive name: `feature/add-oauth-login`, `fix/leaderboard-cache-bug`, etc.
3. **Keep changes focused** — one feature or fix per PR
4. **Update the README** if you change user-facing behavior
5. **Fill out the PR template** (`.github/pull_request_template.md`) — it's loaded automatically
6. **Wait for CI** (if configured) and **request a review** from the CODEOWNERS

## 🐛 Reporting bugs

Use the **Bug report** issue template (`.github/ISSUE_TEMPLATE/bug_report.md`). Include:
- OS, browser, Java/Node versions
- Exact steps to reproduce
- Expected vs actual behavior
- Screenshots or logs if applicable

## 💡 Suggesting features

Use the **Feature request** issue template. Be clear about:
- The problem you're trying to solve
- The proposed solution
- Any alternatives you considered

## 📜 License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).

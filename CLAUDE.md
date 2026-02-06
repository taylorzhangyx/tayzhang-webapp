# Claude Code Guidelines

## Git Workflow

Always use branch-based workflow. Never commit directly to `main`.

### Branch Naming Convention

- `feature/feat-xxx` - New features
- `fix/bug-xxx` - Bug fixes
- `chore/xxx` - Maintenance tasks

### Workflow Steps

1. Create branch from `main` with appropriate naming
2. Make changes and commit
3. Push branch and auto-create PR to `main`

## Project Structure

This is a monorepo using git submodules:

- `tayzhang-posts` - Blog posts content
- `tayzhang-py-backend` - Python backend service
- `tayzhang-webapp` - Web application frontend

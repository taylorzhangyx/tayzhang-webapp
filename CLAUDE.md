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

## Commands

### /update-work-guideline

Analyze the recent conversation for any new development rules, style conventions, or workflow changes. Then:

1. Identify new guidelines from the conversation
2. Show proposed changes to the user
3. Wait for user confirmation before updating
4. Update this CLAUDE.md file with the new guidelines
5. Follow the git workflow (branch, commit, PR)

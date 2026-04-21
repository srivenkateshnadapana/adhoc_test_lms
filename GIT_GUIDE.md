# Git Collaboration Guide: adhoc_test_lms

This guide outlines the standard workflow for contributing to the repository.

## 1. Initial Setup
Run this once to get the project on your machine.
```powershell
git clone https://github.com/srivenkateshnadapana/adhoc_test_lms.git
cd adhoc_test_lms
```

## 2. Start of Work (Daily)
Always sync with the main codebase before starting new changes.
```powershell
# Sync main branch
git checkout main
git pull origin main

# Create your own branch for the task
git checkout -b feature/your-feature-name
```

## 3. During Development
Save your progress locally.
```powershell
# Check modified files
git status

# Add and commit
git add .
git commit -m "feat: description of your changes"
```

## 4. Before Submitting
Ensure your branch is up-to-date with any changes others might have pushed.
```powershell
# Pull latest main into your feature branch
git pull origin main

# Resolve any conflicts if they appear, then commit them.
```

## 5. Share Your Work
Push your branch to GitHub to create a Pull Request.
```powershell
git push origin feature/your-feature-name
```

## 6. Helpful Commands
- `git branch` : List local branches
- `git log --oneline` : View commit history
- `git stash` : Save uncommitted changes for later
- `git stash pop` : Restore stashed changes
- `git checkout branch-name` : Switch between branches

---
name: create-pr
description: Create a pull request for skill-hub changes using gh CLI
argument-hint: "[title]"
allowed-tools: Bash(*), Read(*)
---

# Create Pull Request

Create a pull request for skill-hub changes.

## Usage

```
/create-pr [title]
```

## Arguments

- `title` (optional): PR title. If not provided, will use the last commit message.

## Execution Steps

1. Check if gh is authenticated: `gh auth status`
2. Get current branch: `git rev-parse --abbrev-ref HEAD`
3. Push branch to origin if needed
4. Create PR with `gh pr create --base main`

$ARGUMENTS

# Create Pull Request

Create a pull request for skill-hub changes.

## Usage

```
/create-pr [title] [body]
```

## Arguments

- `title` (optional): PR title. If not provided, will use the last commit message.
- `body` (optional): PR description. If not provided, will be empty.

## Instructions

When this command is invoked:

1. **Check Prerequisites**
   - Verify `gh` CLI is installed and authenticated
   - Verify current directory is a git repository
   - Verify remote `origin` exists

2. **Gather Information**
   - Get current branch name
   - Get last commit message for default title
   - Check for uncommitted changes

3. **Create PR**
   - If there are uncommitted changes, ask user if they want to commit first
   - Push current branch to origin if not already pushed
   - Create PR with `gh pr create`
   - Display the PR URL

## Example

```
/create-pr "Add new analysis skill" "This PR adds a new skill for code analysis"
```

## Execution

$ARGUMENTS

---

Execute the following steps:

```bash
# 1. Check if gh is authenticated
gh auth status

# 2. Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# 3. Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "Warning: You have uncommitted changes"
    git status -s
fi

# 4. Push branch if needed
git push -u origin "$CURRENT_BRANCH" 2>/dev/null || git push origin "$CURRENT_BRANCH"

# 5. Create PR
if [ -n "$ARGUMENTS" ]; then
    # Parse title and body from arguments
    PR_TITLE=$(echo "$ARGUMENTS" | cut -d'"' -f2 2>/dev/null || echo "$ARGUMENTS")
    gh pr create --title "$PR_TITLE" --base main
else
    # Use last commit message as title
    LAST_MSG=$(git log -1 --pretty=%B | head -1)
    gh pr create --title "$LAST_MSG" --base main
fi
```

Report the PR URL to the user after successful creation.

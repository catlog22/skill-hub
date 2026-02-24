#!/bin/bash
#
# Create Pull Request helper script for skill-hub
#
# Usage:
#   ./scripts/create-pr.sh <branch-name> <pr-title> [pr-body]
#   ./scripts/create-pr.sh --help
#
# Examples:
#   ./scripts/create-pr.sh add-new-skill "Add new analysis skill"
#   ./scripts/create-pr.sh fix-index "Fix index.json" "Updated skill metadata"
#
# Prerequisites:
#   - gh CLI installed and authenticated
#   - git remote 'origin' configured
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
REMOTE="origin"
BASE_BRANCH="main"

# Help message
show_help() {
    cat << EOF
Create Pull Request for skill-hub

Usage:
  $0 <branch-name> <pr-title> [pr-body]
  $0 --help

Options:
  branch-name    Name for the new branch
  pr-title       Title for the pull request
  pr-body        Optional body/description for the PR

Examples:
  $0 add-skill-xyz "Add xyz skill"
  $0 update-index "Update index.json" "Added new skills to index"

Prerequisites:
  - GitHub CLI (gh) installed: https://cli.github.com/
  - Authenticated with GitHub: gh auth login
  - Remote 'origin' configured

EOF
    exit 0
}

# Check prerequisites
check_prerequisites() {
    if ! command -v gh &> /dev/null; then
        echo -e "${RED}Error: GitHub CLI (gh) not installed${NC}"
        echo "Install from: https://cli.github.com/"
        exit 1
    fi

    if ! gh auth status &> /dev/null; then
        echo -e "${RED}Error: Not authenticated with GitHub${NC}"
        echo "Run: gh auth login"
        exit 1
    fi

    if ! git remote get-url $REMOTE &> /dev/null; then
        echo -e "${RED}Error: Remote '$REMOTE' not configured${NC}"
        echo "Run: git remote add origin <url>"
        exit 1
    fi
}

# Check for uncommitted changes
check_clean() {
    if ! git diff-index --quiet HEAD --; then
        echo -e "${YELLOW}Warning: You have uncommitted changes${NC}"
        git status -s
        echo ""
        read -p "Continue anyway? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Main script
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    show_help
fi

if [[ $# -lt 2 ]]; then
    echo -e "${RED}Error: Missing required arguments${NC}"
    echo "Usage: $0 <branch-name> <pr-title> [pr-body]"
    echo "Run '$0 --help' for more information"
    exit 1
fi

BRANCH_NAME="$1"
PR_TITLE="$2"
PR_BODY="${3:-}"

check_prerequisites
check_clean

echo -e "${GREEN}Creating PR: $PR_TITLE${NC}"
echo "Branch: $BRANCH_NAME"
echo ""

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Create and switch to new branch
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
    echo -e "${YELLOW}Branch '$BRANCH_NAME' already exists${NC}"
    read -p "Switch to existing branch? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout "$BRANCH_NAME"
    else
        echo "Aborted"
        exit 1
    fi
else
    echo "Creating new branch: $BRANCH_NAME"
    git checkout -b "$BRANCH_NAME"
fi

# Stage all changes
echo ""
echo "Staging changes..."
git add -A

# Check if there's anything to commit
if git diff --cached --quiet; then
    echo -e "${YELLOW}No changes to commit${NC}"
else
    # Commit
    echo "Committing..."
    git commit -m "$PR_TITLE"
fi

# Push branch
echo ""
echo "Pushing to remote..."
git push -u "$REMOTE" "$BRANCH_NAME"

# Create PR
echo ""
echo "Creating pull request..."
if [[ -n "$PR_BODY" ]]; then
    PR_URL=$(gh pr create --title "$PR_TITLE" --body "$PR_BODY" --base "$BASE_BRANCH")
else
    PR_URL=$(gh pr create --title "$PR_TITLE" --body "" --base "$BASE_BRANCH")
fi

echo ""
echo -e "${GREEN}Pull Request created successfully!${NC}"
echo "URL: $PR_URL"

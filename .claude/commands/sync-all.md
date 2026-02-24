---
name: sync-all
description: Update index.json and README.md, then commit and push
argument-hint: "[commit-message]"
allowed-tools: Bash(*), Read(*), Write(*)
---

# Sync All

Update both index.json and README.md, then commit and push changes.

## Usage

```
/sync-all [commit-message]
```

## Arguments

- `commit-message` (optional): Custom commit message. Default: "chore: sync skill index and README"

## Execution Steps

1. Update index.json: `node scripts/update-index.js`
2. Update README.md: `node scripts/update-readme.js`
3. Commit and push if changes exist

$ARGUMENTS

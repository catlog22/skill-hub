# Sync All

Update both index.json and README.md, then commit and push changes.

## Usage

```
/sync-all [commit-message]
```

## Arguments

- `commit-message` (optional): Custom commit message. Default: "chore: sync skill index and README"

## Instructions

Execute the following steps:

1. **Update index.json**
   ```bash
   node scripts/update-index.js
   ```

2. **Update README.md**
   ```bash
   node scripts/update-readme.js
   ```

3. **Check for changes**
   ```bash
   git status --porcelain
   ```

4. **If changes exist, commit and push**
   ```bash
   git add skill-hub/index.json README.md
   git commit -m "${ARGUMENTS:-chore: sync skill index and README}"
   git push origin $(git rev-parse --abbrev-ref HEAD)
   ```

Report the results:
- Skills updated
- Files changed
- Commit hash (if committed)

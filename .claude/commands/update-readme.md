---
name: update-readme
description: Generate README.md from skill-hub/index.json
argument-hint: "[--dry-run]"
allowed-tools: Bash(*), Read(*), Write(*)
---

# Update README

Generate README.md from the skill index.

## Usage

```
/update-readme [--dry-run]
```

## Options

- `--dry-run`: Show changes without writing to file

## Execution

Run the script:

```bash
node scripts/update-readme.js $ARGUMENTS
```

Report the number of skills documented.

---
name: update-index
description: Scan skills directory and update skill-hub/index.json
argument-hint: "[--dry-run] [--verbose]"
allowed-tools: Bash(*), Read(*), Write(*)
---

# Update Skill Index

Scan the skills directory and update the skill-hub/index.json file.

## Usage

```
/update-index [--dry-run] [--verbose]
```

## Options

- `--dry-run`: Show changes without writing to file
- `--verbose`: Show detailed output

## Execution

Run the script:

```bash
node scripts/update-index.js $ARGUMENTS
```

Report the number of skills found and any changes.

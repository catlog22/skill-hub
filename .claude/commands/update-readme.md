# Update README

Generate README.md from the skill index.

## Usage

```
/update-readme [--dry-run]
```

## Options

- `--dry-run`: Show changes without writing to file

## Instructions

Execute the update-readme.js script:

```bash
node scripts/update-readme.js $ARGUMENTS
```

After running, report:
- Number of skills documented
- Path to updated README.md

## What it does

1. Reads `skill-hub/index.json`
2. Generates skill table with ID, name, category, description, tags
3. Creates detailed skill list grouped by category
4. Adds quick start guide and repository structure
5. Writes to `README.md`

## Note

This command should be run after `/update-index` to ensure README reflects the latest skills.

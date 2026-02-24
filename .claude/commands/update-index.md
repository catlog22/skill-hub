# Update Skill Index

Scan the skills directory and update the skill-hub/index.json file.

## Usage

```
/update-index [--dry-run] [--verbose]
```

## Options

- `--dry-run`: Show changes without writing to file
- `--verbose`: Show detailed output including each skill found

## Instructions

Execute the update-index.js script:

```bash
node scripts/update-index.js $ARGUMENTS
```

After running, report:
- Number of skills found
- Skills added/removed (if any)
- Path to updated file

## What it does

1. Scans `skills/` directory for subdirectories
2. Parses `SKILL.md` frontmatter in each skill directory
3. Extracts metadata: name, description, version, tags
4. Auto-detects category based on skill ID and tags
5. Updates `skill-hub/index.json` with sorted skill list

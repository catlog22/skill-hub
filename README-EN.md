# CCW Skill Hub

English | [简体中文](README.md)

A collection of reusable Claude Code skills for enhanced development workflows.

## Overview

- **Skills**: 6
- **Categories**: 3 (Analysis, Documentation, General)
- **Repository**: https://github.com/catlog22/skill-hub

## Quick Start

### Install a Skill

Claude Code Skills supports multiple configuration levels:

| Level | Path | Use Case |
|-------|------|----------|
| **Personal** | `~/.claude/skills/` | Personal use |
| **Project** | `project-dir/.claude/skills/` | Team collaboration |

**Method 1: Project-level (Recommended for teams)**

Clone directly into your project:

```bash
# Clone to project
git clone https://github.com/catlog22/skill-hub.git
# Skills are in .claude/skills/ directory, auto-detected by Claude Code
```

**Method 2: Personal-level**

```bash
# Clone repository
git clone https://github.com/catlog22/skill-hub.git

# Copy skill to personal directory
cp -r skill-hub/.claude/skills/<skill-id> ~/.claude/skills/
```

### Use a Skill

After installation, invoke the skill by name or trigger words in Claude Code.

## Available Skills

| ID | Name | Category | Description |
|----|------|----------|-------------|
| `project-analyze` | Project Analyze | Analysis | Multi-phase iterative project analysis with Mermaid diagrams |
| `copyright-docs` | Copyright Docs | Documentation | CPCC-compliant software design specification documents |
| `software-manual` | Software Manual | Documentation | Interactive TiddlyWiki-style HTML software manuals |
| `skill-generator` | Skill Generator | General | Meta-skill for creating new Claude Code skills |
| `skill-tuning` | Skill Tuning | General | Skill diagnosis and optimization tool |
| `workflow-skill-designer` | Workflow Skill Designer | General | Design orchestrator+phases structured workflow skills |

## Skill Details

### Analysis Category

#### Project Analyze

Multi-phase iterative project analysis with Mermaid diagrams. Generates architecture reports, design reports, method analysis reports.

**Triggers**: "analyze project", "architecture report", "design analysis"

- **ID**: `project-analyze`
- **Version**: 1.0.0
- **Path**: `.claude/skills/project-analyze`

---

### Documentation Category

#### Copyright Docs

Generate software copyright design specification documents compliant with China Copyright Protection Center (CPCC) standards.

**Triggers**: "软件著作权", "设计说明书", "版权登记", "CPCC"

- **ID**: `copyright-docs`
- **Version**: 1.0.0
- **Path**: `.claude/skills/copyright-docs`

#### Software Manual

Generate interactive TiddlyWiki-style HTML software manuals with screenshots, API docs, and multi-level code examples.

**Triggers**: "software manual", "user guide", "documentation"

- **ID**: `software-manual`
- **Version**: 1.0.0
- **Path**: `.claude/skills/software-manual`

---

### General Category

#### Skill Generator

Meta-skill for creating new Claude Code skills with configurable execution modes. Supports sequential and autonomous phase patterns.

**Triggers**: "create skill", "new skill", "skill generator"

- **ID**: `skill-generator`
- **Version**: 1.0.0
- **Path**: `.claude/skills/skill-generator`

#### Skill Tuning

Universal skill diagnosis and optimization tool. Detect and fix skill execution issues including context explosion, long-tail forgetting, data flow disruption.

**Triggers**: "skill tuning", "tune skill", "skill diagnosis"

- **ID**: `skill-tuning`
- **Version**: 1.0.0
- **Path**: `.claude/skills/skill-tuning`

#### Workflow Skill Designer

Meta-skill for designing orchestrator+phases structured workflow skills. Creates SKILL.md coordinator with progressive phase loading.

**Triggers**: "design workflow skill", "create workflow skill"

- **ID**: `workflow-skill-designer`
- **Version**: 1.0.0
- **Path**: `.claude/skills/workflow-skill-designer`

## Contributing

### Add a New Skill

1. Create a new directory in `.claude/skills/` with your skill ID
2. Add a `SKILL.md` file with frontmatter:

```yaml
---
name: your-skill-name
description: Brief description of what your skill does
allowed-tools: Task, Read, Write, Bash
---
```

3. Run `node scripts/update-index.js` to update the index
4. Submit a pull request

### Development Scripts

| Script | Description |
|--------|-------------|
| `node scripts/update-index.js` | Update index.json from skills directory |
| `node scripts/update-readme.js` | Regenerate README files |
| `./scripts/create-pr.sh` | Create a pull request |

### Slash Commands

| Command | Description |
|---------|-------------|
| `/update-index [--dry-run] [--verbose]` | Update skill index |
| `/update-readme [--dry-run]` | Update README files |
| `/create-pr [title]` | Create Pull Request |
| `/sync-all [message]` | Sync index and README, then push |

## Repository Structure

```
skill-hub/
├── skill-hub/
│   └── index.json              # Skill registry
├── .claude/
│   ├── commands/               # Slash commands
│   │   ├── create-pr.md
│   │   ├── sync-all.md
│   │   ├── update-index.md
│   │   └── update-readme.md
│   └── skills/                 # Skills directory
│       ├── project-analyze/
│       ├── copyright-docs/
│       ├── software-manual/
│       ├── skill-generator/
│       ├── skill-tuning/
│       └── workflow-skill-designer/
├── scripts/
│   ├── update-index.js         # Index generator
│   ├── update-readme.js        # README generator
│   └── create-pr.sh            # PR helper
├── README.md                   # Chinese documentation
└── README-EN.md                # English documentation
```

## License

MIT License

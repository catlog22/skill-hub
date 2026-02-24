# CCW Skill Hub

A collection of reusable Claude Code skills for enhanced development workflows.

## Overview

- **Skills**: 3
- **Categories**: 2
- **Last Updated**: 2026/2/24

## Quick Start

### Install a Skill

```bash
# Clone the repository
git clone https://github.com/catlog22/skill-hub.git

# Copy skill to your CCW skills directory
cp -r skill-hub/skills/<skill-id> ~/.ccw/skills/
```

### Use in Claude Code

Skills are automatically detected when placed in the `~/.ccw/skills/` directory.

## Available Skills

| ID | Name | Category | Description | Tags |
|----|------|----------|-------------|------|
| `copyright-docs` | Copyright Docs | Documentation | Generate software copyright design specification document... | `copyright-docs` `generate` `software` `copyright` |
| `project-analyze` | Project Analyze | Analysis | Multi-phase iterative project analysis with Mermaid diagr... | `project-analyze` `multi-phase` `iterative` `project` |
| `software-manual` | Software Manual | Documentation | Generate interactive TiddlyWiki-style HTML software manua... | `software-manual` `generate` `interactive` `tiddlywiki-style` |

## Detailed Skill List


### Analysis

#### Project Analyze

Multi-phase iterative project analysis with Mermaid diagrams. Generates architecture reports, design reports, method analysis reports. Use when analyzing codebases, understanding project structure, re

- **ID**: `project-analyze`
- **Version**: 1.0.0
- **Tags**: `project-analyze` `multi-phase` `iterative` `project` `analysis` `mermaid` `diagrams` `generates`
- **Path**: `skills/project-analyze`


### Documentation

#### Copyright Docs

Generate software copyright design specification documents compliant with China Copyright Protection Center (CPCC) standards. Creates complete design documents with Mermaid diagrams based on source co

- **ID**: `copyright-docs`
- **Version**: 1.0.0
- **Tags**: `copyright-docs` `generate` `software` `copyright` `design` `specification` `documents` `compliant`
- **Path**: `skills/copyright-docs`

#### Software Manual

Generate interactive TiddlyWiki-style HTML software manuals with screenshots, API docs, and multi-level code examples. Use when creating user guides, software documentation, or API references. Trigger

- **ID**: `software-manual`
- **Version**: 1.0.0
- **Tags**: `software-manual` `generate` `interactive` `tiddlywiki-style` `html` `software` `manuals` `screenshots`
- **Path**: `skills/software-manual`



## Contributing

### Add a New Skill

1. Create a new directory in `skills/` with your skill ID
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
| `node scripts/update-readme.js` | Regenerate README.md |
| `./scripts/create-pr.sh` | Create a pull request |

## Repository Structure

```
skill-hub/
├── skill-hub/
│   └── index.json       # Skill registry
├── skills/
│   ├── project-analyze/ # Project analysis skill
│   ├── copyright-docs/  # Copyright documentation skill
│   └── software-manual/ # Software manual skill
├── scripts/
│   ├── update-index.js  # Index generator
│   ├── update-readme.js # README generator
│   └── create-pr.sh     # PR helper
└── README.md
```

## License

MIT License - See [LICENSE](LICENSE) for details.

---

*This README is auto-generated. Do not edit manually. Run `node scripts/update-readme.js` to update.*

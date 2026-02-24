#!/usr/bin/env node
/**
 * Auto-generate/update README.md based on skills in index.json
 *
 * Usage:
 *   node scripts/update-readme.js [--dry-run] [--verbose]
 *
 * Options:
 *   --dry-run   Show changes without writing
 *   --verbose   Show detailed output
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'skill-hub', 'index.json');
const README_FILE = path.join(ROOT_DIR, 'README.md');

// Parse command line args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');

function log(msg) {
  if (verbose) console.log(msg);
}

/**
 * Generate skill table markdown
 */
function generateSkillTable(skills) {
  const header = `| ID | Name | Category | Description | Tags |
|----|------|----------|-------------|------|`;

  const rows = skills.map(skill => {
    const tags = skill.tags.slice(0, 4).map(t => `\`${t}\``).join(' ');
    const desc = skill.description.length > 60
      ? skill.description.slice(0, 57) + '...'
      : skill.description;
    return `| \`${skill.id}\` | ${skill.name} | ${skill.category} | ${desc} | ${tags} |`;
  }).join('\n');

  return `${header}\n${rows}`;
}

/**
 * Generate category sections
 */
function generateCategorySections(skills) {
  const categories = {};

  skills.forEach(skill => {
    const cat = skill.category || 'General';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(skill);
  });

  let markdown = '';

  Object.keys(categories).sort().forEach(category => {
    markdown += `\n### ${category}\n\n`;
    categories[category].forEach(skill => {
      markdown += `#### ${skill.name}\n\n`;
      markdown += `${skill.description}\n\n`;
      markdown += `- **ID**: \`${skill.id}\`\n`;
      markdown += `- **Version**: ${skill.version}\n`;
      markdown += `- **Tags**: ${skill.tags.map(t => `\`${t}\``).join(' ')}\n`;
      markdown += `- **Path**: \`${skill.path}\`\n\n`;
    });
  });

  return markdown;
}

/**
 * Generate full README content
 */
function generateReadme(index) {
  const skillCount = index.skills.length;
  const categories = [...new Set(index.skills.map(s => s.category))].length;

  return `# CCW Skill Hub

A collection of reusable Claude Code skills for enhanced development workflows.

## Overview

- **Skills**: ${skillCount}
- **Categories**: ${categories}
- **Last Updated**: ${new Date(index.updated_at).toLocaleDateString()}

## Quick Start

### Install a Skill

\`\`\`bash
# Clone the repository
git clone https://github.com/catlog22/skill-hub.git

# Copy skill to your CCW skills directory
cp -r skill-hub/skills/<skill-id> ~/.ccw/skills/
\`\`\`

### Use in Claude Code

Skills are automatically detected when placed in the \`~/.ccw/skills/\` directory.

## Available Skills

${generateSkillTable(index.skills)}

## Detailed Skill List

${generateCategorySections(index.skills)}

## Contributing

### Add a New Skill

1. Create a new directory in \`skills/\` with your skill ID
2. Add a \`SKILL.md\` file with frontmatter:

\`\`\`yaml
---
name: your-skill-name
description: Brief description of what your skill does
allowed-tools: Task, Read, Write, Bash
---
\`\`\`

3. Run \`node scripts/update-index.js\` to update the index
4. Submit a pull request

### Development Scripts

| Script | Description |
|--------|-------------|
| \`node scripts/update-index.js\` | Update index.json from skills directory |
| \`node scripts/update-readme.js\` | Regenerate README.md |
| \`./scripts/create-pr.sh\` | Create a pull request |

## Repository Structure

\`\`\`
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
\`\`\`

## License

MIT License - See [LICENSE](LICENSE) for details.

---

*This README is auto-generated. Do not edit manually. Run \`node scripts/update-readme.js\` to update.*
`;
}

/**
 * Main function
 */
function main() {
  if (!fs.existsSync(INDEX_FILE)) {
    console.error('Index file not found:', INDEX_FILE);
    console.error('Run scripts/update-index.js first');
    process.exit(1);
  }

  const index = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
  const newReadme = generateReadme(index);

  if (dryRun) {
    console.log('=== DRY RUN - README that would be generated ===\n');
    console.log(newReadme);
    return;
  }

  fs.writeFileSync(README_FILE, newReadme);
  console.log(`Updated ${README_FILE}`);
  console.log(`Skills documented: ${index.skills.length}`);
}

main();

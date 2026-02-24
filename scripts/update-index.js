#!/usr/bin/env node
/**
 * Auto-update skill-hub/index.json by scanning skills directory
 *
 * Usage:
 *   node scripts/update-index.js [--dry-run] [--verbose]
 *
 * Options:
 *   --dry-run   Show changes without writing
 *   --verbose   Show detailed output
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const SKILLS_DIR = path.join(ROOT_DIR, '.claude', 'skills');
const INDEX_FILE = path.join(ROOT_DIR, 'skill-hub', 'index.json');

// Parse command line args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');

function log(msg) {
  if (verbose) console.log(msg);
}

/**
 * Parse SKILL.md frontmatter to extract metadata
 */
function parseSkillMd(skillPath) {
  const skillMdPath = path.join(skillPath, 'SKILL.md');
  if (!fs.existsSync(skillMdPath)) {
    return null;
  }

  const content = fs.readFileSync(skillMdPath, 'utf-8');
  // Handle both LF and CRLF line endings
  const frontmatterMatch = content.match(/---\r?\n([\s\S]*?)\r?\n---/);

  if (!frontmatterMatch) {
    return null;
  }

  const frontmatter = frontmatterMatch[1];
  const metadata = {};

  // Parse YAML-like frontmatter (normalize line endings)
  frontmatter.split(/\r?\n/).forEach(line => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Only treat 'allowed-tools' as array, others as string
      if (key === 'allowed-tools') {
        metadata[key] = value.split(',').map(v => v.trim());
      } else {
        metadata[key] = value.trim();
      }
    }
  });

  return metadata;
}

/**
 * Get skill version from SKILL.md or package.json
 */
function getSkillVersion(skillPath) {
  // Try package.json first
  const pkgPath = path.join(skillPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      return pkg.version || '1.0.0';
    } catch (e) {}
  }
  return '1.0.0';
}

/**
 * Detect category from skill path and metadata
 */
function detectCategory(skillId, metadata) {
  const categoryMap = {
    'analyze': 'Analysis',
    'analysis': 'Analysis',
    'review': 'Code Quality',
    'test': 'Testing',
    'doc': 'Documentation',
    'documentation': 'Documentation',
    'manual': 'Documentation',
    'copyright': 'Documentation',
    'deploy': 'Deployment',
    'build': 'Build',
    'security': 'Security',
    'refactor': 'Refactoring',
    'debug': 'Debugging',
    'api': 'API',
    'ui': 'UI/UX',
    'frontend': 'Frontend',
    'backend': 'Backend',
  };

  // Check skill ID for category hints
  const idLower = skillId.toLowerCase();
  for (const [keyword, category] of Object.entries(categoryMap)) {
    if (idLower.includes(keyword)) {
      return category;
    }
  }

  // Check tags in metadata
  if (metadata.tags) {
    const tags = Array.isArray(metadata.tags) ? metadata.tags : [metadata.tags];
    for (const tag of tags) {
      const tagLower = tag.toLowerCase();
      for (const [keyword, category] of Object.entries(categoryMap)) {
        if (tagLower.includes(keyword)) {
          return category;
        }
      }
    }
  }

  return 'General';
}

/**
 * Extract tags from description and metadata
 */
function extractTags(skillId, metadata) {
  const tags = new Set();

  // Add skill ID as tag
  tags.add(skillId);

  // Extract from description (ensure it's a string)
  if (metadata.description) {
    const desc = Array.isArray(metadata.description)
      ? metadata.description.join(' ')
      : String(metadata.description);
    const keywords = desc.toLowerCase().split(/\s+/);
    const stopWords = ['a', 'an', 'the', 'and', 'or', 'with', 'for', 'to', 'of', 'in', 'on'];
    keywords.forEach(word => {
      if (word.length > 3 && !stopWords.includes(word)) {
        tags.add(word.replace(/[^a-z0-9-]/g, ''));
      }
    });
  }

  // Use existing tags if present
  if (metadata.tags) {
    const existingTags = Array.isArray(metadata.tags) ? metadata.tags : [metadata.tags];
    existingTags.forEach(tag => tags.add(tag.trim()));
  }

  return Array.from(tags).filter(t => t.length > 0).slice(0, 8);
}

/**
 * Scan skills directory and build index entries
 */
function scanSkills() {
  const skills = [];

  if (!fs.existsSync(SKILLS_DIR)) {
    console.error('Skills directory not found:', SKILLS_DIR);
    return skills;
  }

  const skillDirs = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const skillId of skillDirs) {
    const skillPath = path.join(SKILLS_DIR, skillId);
    const metadata = parseSkillMd(skillPath);

    if (!metadata) {
      log(`Skipping ${skillId}: No SKILL.md or invalid frontmatter`);
      continue;
    }

    const name = metadata.name || skillId;
    const description = metadata.description || `Skill: ${skillId}`;
    const version = getSkillVersion(skillPath);
    const category = detectCategory(skillId, metadata);
    const tags = extractTags(skillId, metadata);

    const entry = {
      id: skillId,
      name: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      description: description.slice(0, 200), // Truncate long descriptions
      version,
      author: 'CCW Team',
      category,
      tags,
      path: `skills/${skillId}`
    };

    skills.push(entry);
    log(`Found skill: ${skillId} (${category})`);
  }

  return skills.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Main function
 */
function main() {
  console.log('Scanning skills directory...');

  const existingIndex = fs.existsSync(INDEX_FILE)
    ? JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'))
    : { version: '1.0.0', skills: [] };

  const newSkills = scanSkills();

  const newIndex = {
    version: existingIndex.version,
    updated_at: new Date().toISOString(),
    skills: newSkills
  };

  if (dryRun) {
    console.log('\n=== DRY RUN - Changes that would be made ===\n');
    console.log('Current skills:', existingIndex.skills.map(s => s.id).join(', '));
    console.log('New skills:', newSkills.map(s => s.id).join(', '));

    // Show added/removed/changed
    const existingIds = new Set(existingIndex.skills.map(s => s.id));
    const newIds = new Set(newSkills.map(s => s.id));

    const added = [...newIds].filter(id => !existingIds.has(id));
    const removed = [...existingIds].filter(id => !newIds.has(id));

    if (added.length) console.log('\nAdded:', added.join(', '));
    if (removed.length) console.log('Removed:', removed.join(', '));

    console.log('\nNew index.json content:');
    console.log(JSON.stringify(newIndex, null, 2));
    return;
  }

  // Ensure directory exists
  const indexDir = path.dirname(INDEX_FILE);
  if (!fs.existsSync(indexDir)) {
    fs.mkdirSync(indexDir, { recursive: true });
  }

  fs.writeFileSync(INDEX_FILE, JSON.stringify(newIndex, null, 2) + '\n');
  console.log(`\nUpdated ${INDEX_FILE}`);
  console.log(`Total skills: ${newSkills.length}`);
}

main();

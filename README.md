# CCW Skill Hub

[English](README-EN.md) | 简体中文

Claude Code 技能仓库 - 可复用的开发工作流技能集合。

## 概述

- **技能数量**: 6
- **分类**: 3 (Analysis, Documentation, General)
- **仓库地址**: https://github.com/catlog22/skill-hub

## 快速开始

### 安装技能

Claude Code Skills 支持多种配置级别：

| 配置级别 | 路径 | 适用场景 |
|---------|------|---------|
| **个人级** | `~/.claude/skills/` | 个人使用 |
| **项目级** | `项目目录/.claude/skills/` | 团队协作 |

**方法一：项目级安装（推荐团队）**

直接将此仓库作为项目依赖使用：

```bash
# 克隆到项目中
git clone https://github.com/catlog22/skill-hub.git
# Skills 位于 .claude/skills/ 目录，Claude Code 会自动检测
```

**方法二：个人级安装**

```bash
# 克隆仓库
git clone https://github.com/catlog22/skill-hub.git

# 复制技能到个人目录
cp -r skill-hub/.claude/skills/<skill-id> ~/.claude/skills/
```

### 使用技能

安装后，在 Claude Code 中直接输入技能名称或触发词即可调用。

## 可用技能

| ID | 名称 | 分类 | 描述 |
|----|------|------|------|
| `project-analyze` | 项目分析 | Analysis | 多阶段迭代式项目分析，生成架构报告、设计报告、方法分析报告 |
| `copyright-docs` | 软著文档 | Documentation | 生成符合中国版权保护中心(CPCC)标准的软件设计说明书 |
| `software-manual` | 软件手册 | Documentation | 生成交互式 TiddlyWiki 风格的 HTML 软件手册 |
| `skill-generator` | 技能生成器 | General | 创建新的 Claude Code 技能的元技能 |
| `skill-tuning` | 技能调优 | General | 技能诊断和优化工具 |
| `workflow-skill-designer` | 工作流设计器 | General | 设计编排器+阶段结构的工作流技能 |

## 技能详解

### Analysis 分类

#### Project Analyze (项目分析)

多阶段迭代式项目分析，使用 Mermaid 图表。生成架构报告、设计报告、方法分析报告。

**触发词**: "analyze project", "architecture report", "design analysis"

- **ID**: `project-analyze`
- **版本**: 1.0.0
- **路径**: `.claude/skills/project-analyze`

---

### Documentation 分类

#### Copyright Docs (软著文档)

生成符合中国版权保护中心(CPCC)标准的软件设计说明书。基于源代码分析创建完整的设计文档和 Mermaid 图表。

**触发词**: "软件著作权", "设计说明书", "版权登记", "CPCC"

- **ID**: `copyright-docs`
- **版本**: 1.0.0
- **路径**: `.claude/skills/copyright-docs`

#### Software Manual (软件手册)

生成交互式 TiddlyWiki 风格的 HTML 软件手册，包含截图、API 文档和多级代码示例。

**触发词**: "software manual", "user guide", "documentation"

- **ID**: `software-manual`
- **版本**: 1.0.0
- **路径**: `.claude/skills/software-manual`

---

### General 分类

#### Skill Generator (技能生成器)

创建新的 Claude Code 技能的元技能。支持顺序执行和自主执行两种模式。

**触发词**: "create skill", "new skill", "skill generator"

- **ID**: `skill-generator`
- **版本**: 1.0.0
- **路径**: `.claude/skills/skill-generator`

#### Skill Tuning (技能调优)

通用技能诊断和优化工具。检测和修复技能执行问题，包括上下文爆炸、长尾遗忘、数据流中断等。

**触发词**: "skill tuning", "tune skill", "skill diagnosis"

- **ID**: `skill-tuning`
- **版本**: 1.0.0
- **路径**: `.claude/skills/skill-tuning`

#### Workflow Skill Designer (工作流设计器)

设计编排器+阶段结构的工作流技能。创建带有渐进式阶段加载的 SKILL.md。

**触发词**: "design workflow skill", "create workflow skill"

- **ID**: `workflow-skill-designer`
- **版本**: 1.0.0
- **路径**: `.claude/skills/workflow-skill-designer`

## 贡献指南

### 添加新技能

1. 在 `.claude/skills/` 目录下创建新的技能目录
2. 添加 `SKILL.md` 文件，包含 YAML 头：

```yaml
---
name: your-skill-name
description: 技能功能描述
allowed-tools: Task, Read, Write, Bash
---
```

3. 运行 `node scripts/update-index.js` 更新索引
4. 提交 Pull Request

### 开发脚本

| 脚本 | 描述 |
|------|------|
| `node scripts/update-index.js` | 扫描技能目录并更新 index.json |
| `node scripts/update-readme.js` | 重新生成 README.md |
| `./scripts/create-pr.sh` | 创建 Pull Request |

### Slash Commands

| 命令 | 功能 |
|------|------|
| `/update-index [--dry-run] [--verbose]` | 更新技能索引 |
| `/update-readme [--dry-run]` | 更新 README.md |
| `/create-pr [title]` | 创建 Pull Request |
| `/sync-all [message]` | 同步索引和 README 并推送 |

## 仓库结构

```
skill-hub/
├── skill-hub/
│   └── index.json              # 技能注册表
├── .claude/
│   ├── commands/               # Slash 命令
│   │   ├── create-pr.md
│   │   ├── sync-all.md
│   │   ├── update-index.md
│   │   └── update-readme.md
│   └── skills/                 # 技能目录
│       ├── project-analyze/
│       ├── copyright-docs/
│       ├── software-manual/
│       ├── skill-generator/
│       ├── skill-tuning/
│       └── workflow-skill-designer/
├── scripts/
│   ├── update-index.js         # 索引生成器
│   ├── update-readme.js        # README 生成器
│   └── create-pr.sh            # PR 辅助脚本
├── README.md                   # 中文文档
└── README-EN.md                # 英文文档
```

## 许可证

MIT License

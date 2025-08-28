#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the JSON configurations
const configPath = path.join(__dirname, '../examples/badge-configurations.json');
const configurations = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Generate badge grid
function generateBadgeGrid() {
  let markdown = `# Conventional Comments Badge Grid

A simple grid display of all conventional comment badges.

## Default Badges (No Decorations)

`;

  // Add default badges in a grid
  const defaultConfigs = configurations.configurations.filter(config => config.decorations.length === 0);
  defaultConfigs.forEach(config => {
    markdown += `![${config.id}](${config.badgeUrl}) `;
  });

  markdown += `

## Decorated Badges (With Relevant Decorations)

`;

  // Add decorated badges in a grid
  const decoratedConfigs = configurations.configurations.filter(config => config.decorations.length > 0);
  decoratedConfigs.forEach(config => {
    markdown += `![${config.id}](${config.badgeUrl}) `;
  });

  markdown += `

---

*Generated from badge-configurations.json on ${new Date().toLocaleString()}*
`;

  return markdown;
}

// Generate recap table
function generateRecapTable() {
  let markdown = `# Conventional Comments Badge Recap

This document provides a comprehensive overview of all available conventional comment badge configurations.

## Summary

- **Total Labels:** ${configurations.metadata.totalLabels}
- **Total Configurations:** ${configurations.configurations.length}
- **Generated:** ${new Date(configurations.metadata.generated).toLocaleString()}

## Labels Overview

| Label | Description | Default Color | Relevant Decoration |
|-------|-------------|---------------|-------------------|
`;

  // Add labels table
  Object.entries(configurations.labels).forEach(([label, info]) => {
    markdown += `| **${label}** | ${info.description} | \`${info.defaultColor}\` | ${info.relevantDecoration.join(', ')} |\n`;
  });

  markdown += `
## All Badge Configurations

### Default Badges (No Decorations)

| Label | Badge | Description |
|-------|-------|-------------|
`;

  // Add default badges
  const defaultConfigs = configurations.configurations.filter(config => config.decorations.length === 0);
  defaultConfigs.forEach(config => {
    markdown += `| **${config.label}** | ![${config.id}](${config.badgeUrl}) | ${config.description} |\n`;
  });

  markdown += `
### Decorated Badges (With Relevant Decorations)

| Label | Decorations | Badge | Example |
|-------|-------------|-------|---------|
`;

  // Add decorated badges
  const decoratedConfigs = configurations.configurations.filter(config => config.decorations.length > 0);
  decoratedConfigs.forEach(config => {
    markdown += `| **${config.label}** | ${config.decorations.join(', ')} | ![${config.id}](${config.badgeUrl}) | ${config.example} |\n`;
  });

  markdown += `
## Color Palette

| Color Name | Hex Code |
|------------|----------|
`;

  // Add color palette
  configurations.colorPalette.forEach(color => {
    markdown += `| **${color.name}** | \`${color.hex}\` |\n`;
  });

  markdown += `
## Usage Examples

### Programmatic Usage

\`\`\`typescript
import { generateConventionalShield } from 'conventional-shields';

// Default badge
const defaultBadge = generateConventionalShield({
  label: 'praise'
});

// Badge with decorations
const decoratedBadge = generateConventionalShield({
  label: 'issue',
  decorations: ['security', 'blocking']
});

// Manual colors
const customBadge = generateConventionalShield({
  label: 'suggestion',
  decorations: ['performance'],
  autoColor: false,
  color: '#ff0000',
  labelColor: '#00ff00'
});
\`\`\`

### Markdown Usage

\`\`\`markdown
<!-- Default praise badge -->
![praise](https://img.shields.io/badge/praise-90be6d?style=for-the-badge&labelColor=90be6d)

<!-- Issue with security decoration -->
![issue-security](https://img.shields.io/badge/issue-security,blocking-9b2226?style=for-the-badge&labelColor=f9c74f)

<!-- Suggestion with performance decoration -->
![suggestion-performance](https://img.shields.io/badge/suggestion-performance-bb3e03?style=for-the-badge&labelColor=277da1)
\`\`\`

## Quick Reference

### Available Labels
${Object.entries(configurations.labels).map(([label, info]) => 
  `- **${label}** - ${info.description}`
).join('\n')}

### Common Decorations
- **non-blocking** - Should not prevent acceptance
- **blocking** - Should prevent acceptance until resolved
- **if-minor** - Should resolve only if changes are minor
- **security** - Security-related comment
- **test** - Test-related comment
- **ux** - User experience related
- **performance** - Performance related
- **accessibility** - Accessibility related
- **documentation** - Documentation related
- **style** - Code style related
- **refactor** - Refactoring suggestion
- **bug** - Bug-related
- **feature** - Feature-related
- **breaking** - Breaking change
- **deprecated** - Deprecation related
- **experimental** - Experimental feature
- **wip** - Work in progress
- **draft** - Draft status
- **review** - Review related
- **approved** - Approved status
- **rejected** - Rejected status

---

*Generated from badge-configurations.json on ${new Date().toLocaleString()}*
`;

  return markdown;
}

// Generate and write recap file
const recapMarkdown = generateRecapTable();
const recapOutputPath = path.join(__dirname, '../examples/badge-recap.md');
fs.writeFileSync(recapOutputPath, recapMarkdown, 'utf8');

// Generate and write badge grid file
const gridMarkdown = generateBadgeGrid();
const gridOutputPath = path.join(__dirname, '../examples/badge-grid.md');
fs.writeFileSync(gridOutputPath, gridMarkdown, 'utf8');

console.log(`✅ Generated badge recap at: ${recapOutputPath}`);
console.log(`✅ Generated badge grid at: ${gridOutputPath}`);
console.log(`📊 Created comprehensive overview of ${configurations.configurations.length} configurations`);
console.log(`🏷️  ${Object.keys(configurations.labels).length} labels with default + decorated examples`);
console.log(`🎨 Color palette with ${configurations.colorPalette.length} colors documented`);

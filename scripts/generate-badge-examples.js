#!/usr/bin/env node

const {
  generateConventionalShield,
  generatePraiseBadge,
  generateSuggestionBadge,
  generateIssueBadge,
  generateQuestionBadge,
  generateTodoBadge,
  generateChoreBadge,
  palette
} = require('../dist/index.js');
const fs = require('fs');
const path = require('path');

// All conventional comment labels
const labels = [
  'praise',
  'nitpick', 
  'suggestion',
  'issue',
  'todo',
  'question',
  'thought',
  'chore',
  'note',
  'typo',
  'polish',
  'quibble'
];

// Sample decorations for each label
const sampleDecorations = {
  praise: ['non-blocking'],
  nitpick: ['style', 'non-blocking'],
  suggestion: ['performance'],
  issue: ['security', 'blocking'],
  todo: ['test'],
  question: ['ux'],
  thought: ['non-blocking'],
  chore: ['documentation'],
  note: ['non-blocking'],
  typo: ['style'],
  polish: ['ux'],
  quibble: ['style', 'non-blocking']
};

// Generate markdown content
function generateMarkdown() {
  let markdown = `# Conventional Comments Badge Examples

This file contains examples of all conventional comment badges with their respective colors.

## Auto-Coloring Features

Conventional comment badges automatically color both the label and message parts:
- **Label colors** are based on the comment type (praise, suggestion, issue, etc.)
- **Message colors** are based on the first decoration (security, blocking, performance, etc.)
- **No decorations**: Both label and message use the label's color

## All Labels

`;

  // Generate badges for each label
  labels.forEach(label => {
    const decorations = sampleDecorations[label];
    const badgeUrl = generateConventionalShield({
      label,
      decorations
    });
    
    markdown += `### ${label.charAt(0).toUpperCase() + label.slice(1)}\n\n`;
    markdown += `**Decorations:** ${decorations.join(', ')}\n\n`;
    markdown += `![${label}](${badgeUrl})\n\n`;
    markdown += `\`\`\`markdown\n![${label}](${badgeUrl})\n\`\`\`\n\n`;
    markdown += `---\n\n`;
  });

  // Add with decorations section
  markdown += `## Auto-Coloring Examples

### Examples with Different Decorations

`;

  const decorationExamples = [
    {
      label: 'suggestion',
      decorations: ['security', 'blocking'],
      description: 'Blocking security suggestion (BlueGray label, Red message)'
    },
    {
      label: 'issue',
      decorations: ['ux', 'non-blocking'],
      description: 'Non-blocking UX issue (Yellow label, MintGreen message)'
    },
    {
      label: 'suggestion',
      decorations: ['test', 'if-minor'],
      description: 'Test suggestion (BlueGray label, Cyan message)'
    },
    {
      label: 'question',
      decorations: ['performance', 'non-blocking'],
      description: 'Performance question (DarkBlue label, Orange message)'
    },
    {
      label: 'todo',
      decorations: ['accessibility'],
      description: 'Accessibility todo (Cream label, Blue message)'
    },
    {
      label: 'praise',
      decorations: ['feature'],
      description: 'Feature praise (LightGreen label, LightGreen message)'
    },
    {
      label: 'thought',
      decorations: ['refactor'],
      description: 'Refactor thought (Cyan label, DarkBlue message)'
    },
    {
      label: 'chore',
      decorations: ['deprecated'],
      description: 'Deprecated chore (DarkOrange label, Orange message)'
    }
  ];

  decorationExamples.forEach(example => {
    const badgeUrl = generateConventionalShield({
      label: example.label,
      decorations: example.decorations
    });
    
    markdown += `### ${example.description}\n\n`;
    markdown += `**Label:** ${example.label}\n`;
    markdown += `**Decorations:** ${example.decorations.join(', ')}\n\n`;
    markdown += `![${example.label}](${badgeUrl})\n\n`;
    markdown += `\`\`\`markdown\n![${example.label}](${badgeUrl})\n\`\`\`\n\n`;
    markdown += `---\n\n`;
  });

  // Add manual override examples
  markdown += `## Manual Color Override

You can disable auto-coloring and use custom colors:

\`\`\`typescript
const customBadge = generateConventionalShield({
  label: 'praise',
  decorations: ['security'],
  autoColor: false,
  color: '#ff0000',        // Red message
  labelColor: '#00ff00'    // Green label
});
\`\`\`

`;

  const manualBadge = generateConventionalShield({
    label: 'praise',
    decorations: ['security'],
    autoColor: false,
    color: '#ff0000',
    labelColor: '#00ff00'
  });

  markdown += `**Manual colors:** Red message, Green label\n\n`;
  markdown += `![manual](${manualBadge})\n\n`;
  markdown += `\`\`\`markdown\n![manual](${manualBadge})\n\`\`\`\n\n`;
  markdown += `---\n\n`;

  // Add color palette section
  markdown += `## Color Palette

The following colors are used in the badges:

`;

  palette.colors.forEach((color, index) => {
    markdown += `- **${color.name}**: \`${color.hex}\`\n`;
  });

  markdown += `
## Usage

### Programmatic Usage

\`\`\`typescript
import { generateConventionalShield } from 'conventional-shields';

// Auto-colored badge
const badge = generateConventionalShield({
  label: '${labels[0]}',
  decorations: ['non-blocking']
});

// Manual colors
const customBadge = generateConventionalShield({
  label: '${labels[1]}',
  decorations: ['style'],
  autoColor: false,
  color: '#ff0000',
  labelColor: '#00ff00'
});
\`\`\`

## Available Labels

${labels.map(label => `- **${label}**`).join('\n')}

## Common Decorations

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

*Generated on ${new Date().toISOString()}*
`;

  return markdown;
}

// Write to file
const outputPath = path.join(__dirname, '../examples/badge-examples.md');
const markdown = generateMarkdown();

// Ensure examples directory exists
const examplesDir = path.dirname(outputPath);
if (!fs.existsSync(examplesDir)) {
  fs.mkdirSync(examplesDir, { recursive: true });
}

fs.writeFileSync(outputPath, markdown, 'utf8');
console.log(`✅ Generated badge examples at: ${outputPath}`);
console.log(`📊 Created ${labels.length} label examples + decoration examples`);

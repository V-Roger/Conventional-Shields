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
  markdown += `## With Decorations

### Examples with Common Decorations

`;

  const decorationExamples = [
    {
      label: 'suggestion',
      decorations: ['security', 'blocking'],
      description: 'Blocking security suggestion'
    },
    {
      label: 'issue',
      decorations: ['ux', 'non-blocking'],
      description: 'Non-blocking UX issue'
    },
    {
      label: 'suggestion',
      decorations: ['test', 'if-minor'],
      description: 'Test suggestion (if-minor)'
    },
    {
      label: 'question',
      decorations: ['performance', 'non-blocking'],
      description: 'Performance question'
    },
    {
      label: 'todo',
      decorations: ['accessibility'],
      description: 'Accessibility todo'
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

  // Add color palette section
  markdown += `## Color Palette

The following colors are used in the badges:

`;

  palette.colors.forEach((color, index) => {
    markdown += `- **${color.name}**: \`${color.hex}\`\n`;
  });

  markdown += `
## Usage

### CLI Usage

\`\`\`bash
# Generate a badge with decorations
conventional-shields generate ${labels[0]} non-blocking

# Generate with multiple decorations
conventional-shields generate ${labels[1]} style non-blocking
\`\`\`

### Programmatic Usage

\`\`\`typescript
import { generateConventionalShield } from 'conventional-shields';

const badge = generateConventionalShield({
  label: '${labels[0]}',
  decorations: ['non-blocking']
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

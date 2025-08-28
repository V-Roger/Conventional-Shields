#!/usr/bin/env node

const {
  generateConventionalShield,
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

// One relevant decoration for each label
const labelDecorations = {
  praise: ['feature'],
  nitpick: ['style', 'non-blocking'],
  suggestion: ['performance'],
  issue: ['security', 'blocking'],
  todo: ['test'],
  question: ['ux'],
  thought: ['refactor'],
  chore: ['documentation'],
  note: ['security'],
  typo: ['documentation'],
  polish: ['ux'],
  quibble: ['style']
};

// Label descriptions
const labelDescriptions = {
  praise: 'Praises highlight something positive',
  nitpick: 'Nitpicks are trivial preference-based requests',
  suggestion: 'Suggestions propose improvements',
  issue: 'Issues highlight specific problems',
  todo: 'TODO\'s are small, trivial, but necessary changes',
  question: 'Questions for clarification or investigation',
  thought: 'Thoughts represent ideas that popped up from reviewing',
  chore: 'Chores are simple tasks that must be done',
  note: 'Notes highlight something the reader should take note of',
  typo: 'Typo comments for misspellings',
  polish: 'Polish comments for quality improvements',
  quibble: 'Quibbles are very much like nitpicks'
};

// Generate badge configurations
function generateConfigurations() {
  const configurations = {
    metadata: {
      generated: new Date().toISOString(),
      totalLabels: labels.length,
      totalConfigurations: labels.length * 2, // Default + one decoration each
      version: '1.0.0'
    },
    labels: {},
    colorPalette: palette.colors,
    configurations: []
  };

  // Add label information
  labels.forEach(label => {
    configurations.labels[label] = {
      description: labelDescriptions[label],
      defaultColor: getLabelColor(label),
      relevantDecoration: labelDecorations[label]
    };
  });

  // Generate badge configurations
  labels.forEach(label => {
    // Default configuration (no decorations)
    const defaultConfig = {
      id: `${label}-default`,
      label: label,
      decorations: [],
      badgeUrl: generateConventionalShield({
        label,
        decorations: []
      }),
      description: `${label} badge with no decorations`,
      example: getExampleText(label, [])
    };
    configurations.configurations.push(defaultConfig);

    // Configuration with relevant decoration
    const decoration = labelDecorations[label];
    const decoratedConfig = {
      id: `${label}-decorated`,
      label: label,
      decorations: decoration,
      badgeUrl: generateConventionalShield({
        label,
        decorations: decoration
      }),
      description: `${label} badge with ${decoration.join(', ')} decoration`,
      example: getExampleText(label, decoration)
    };
    configurations.configurations.push(decoratedConfig);
  });

  return configurations;
}

// Helper function to get label color
function getLabelColor(label) {
  const labelColors = {
    praise: '#90be6d',
    nitpick: '#94d2bd',
    suggestion: '#277da1',
    issue: '#f9c74f',
    todo: '#e9d8a6',
    question: '#1d3557',
    thought: '#06ffa5',
    chore: '#ee6c4d',
    note: '#001219',
    typo: '#fb8500',
    polish: '#94d2bd',
    quibble: '#94d2bd'
  };
  return labelColors[label] || '#000000';
}

// Helper function to get example text
function getExampleText(label, decorations) {
  const examples = {
    praise: {
      '': 'Great work!',
      'feature': 'Great feature implementation!'
    },
    nitpick: {
      '': 'Minor preference',
      'style,non-blocking': 'Minor style preference, not blocking'
    },
    suggestion: {
      '': 'Consider this improvement',
      'performance': 'Consider performance optimization'
    },
    issue: {
      '': 'Issue found',
      'security,blocking': 'Critical security issue that blocks acceptance'
    },
    todo: {
      '': 'TODO item',
      'test': 'Add tests for this feature'
    },
    question: {
      '': 'Question about this',
      'ux': 'UX design question'
    },
    thought: {
      '': 'Thought about this',
      'refactor': 'Refactoring idea'
    },
    chore: {
      '': 'Chore task',
      'documentation': 'Update documentation'
    },
    note: {
      '': 'Note about this',
      'security': 'Security note'
    },
    typo: {
      '': 'Typo found',
      'documentation': 'Fix documentation typo'
    },
    polish: {
      '': 'Polish needed',
      'ux': 'UX polish needed'
    },
    quibble: {
      '': 'Minor quibble',
      'style': 'Style quibble'
    }
  };

  const decorationKey = decorations.join(',');
  return examples[label]?.[decorationKey] || `${label} with ${decorationKey || 'no decorations'}`;
}

// Generate and write JSON file
const configurations = generateConfigurations();
const outputPath = path.join(__dirname, '../examples/badge-configurations.json');

// Ensure examples directory exists
const examplesDir = path.dirname(outputPath);
if (!fs.existsSync(examplesDir)) {
  fs.mkdirSync(examplesDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(configurations, null, 2), 'utf8');

console.log(`✅ Generated badge configurations at: ${outputPath}`);
console.log(`📊 Created ${configurations.configurations.length} badge configurations`);
console.log(`🏷️  ${labels.length} labels with default + one relevant decoration each`);
console.log(`🎨 Color palette with ${palette.colors.length} colors included`);

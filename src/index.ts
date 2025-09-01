import palette from './config/palette.json';

// Badge style options
type BadgeStyle = 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';

// Badge generator options interface
interface BadgeOptions {
  label?: string;
  message: string;
  color?: string;
  style?: BadgeStyle;
  logo?: string;
  logoColor?: string;
  logoSize?: string;
  labelColor?: string;
  cacheSeconds?: number;
  links?: string[];
}

// Conventional Comments labels as defined in https://conventionalcomments.org/#labels
type ConventionalLabel =
  | 'praise'      // Praises highlight something positive
  | 'nitpick'     // Nitpicks are trivial preference-based requests
  | 'suggestion'  // Suggestions propose improvements
  | 'issue'       // Issues highlight specific problems
  | 'todo'        // TODO's are small, trivial, but necessary changes
  | 'question'    // Questions for clarification or investigation
  | 'thought'     // Thoughts represent ideas that popped up from reviewing
  | 'chore'       // Chores are simple tasks that must be done
  | 'note'        // Notes highlight something the reader should take note of
  | 'typo'        // Typo comments for misspellings
  | 'polish'      // Polish comments for quality improvements
  | 'quibble';    // Quibbles are very much like nitpicks

// Conventional Comments decorations as defined in https://conventionalcomments.org/#decorations
type ConventionalDecoration =
  | 'non-blocking'  // Should not prevent acceptance
  | 'blocking'      // Should prevent acceptance until resolved
  | 'if-minor'      // Should resolve only if changes are minor
  | 'security'      // Security-related comment
  | 'test'          // Test-related comment
  | 'ux'            // User experience related
  | 'performance'   // Performance related
  | 'accessibility' // Accessibility related
  | 'documentation' // Documentation related
  | 'style'         // Code style related
  | 'refactor'      // Refactoring suggestion
  | 'bug'           // Bug-related
  | 'feature'       // Feature-related
  | 'breaking'      // Breaking change
  | 'deprecated'    // Deprecation related
  | 'experimental'  // Experimental feature
  | 'wip'           // Work in progress
  | 'draft'         // Draft status
  | 'review'        // Review related
  | 'approved'      // Approved status
  | 'rejected';     // Rejected status


const availableLabels: ConventionalLabel[] = [
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

const availableDecorations: ConventionalDecoration[] = [
  'non-blocking',
  'blocking',
  'if-minor',
  'security',
  'test',
  'ux',
  'performance',
  'accessibility',
  'documentation',
  'style',
  'refactor',
  'bug',
  'feature',
  'breaking',
  'deprecated',
  'experimental',
  'wip',
  'draft',
  'review',
  'approved',
  'rejected'
];

// Create color LUT from config palette
const colorLUT: Record<string, string> = {};
palette.colors.forEach(color => {
  colorLUT[color.name] = color.hex;
});

// Color mapping for conventional comment labels using LUT
const labelColors: Record<ConventionalLabel, string> = {
  praise: colorLUT['LightGreen'] || 'brightgreen',
  nitpick: colorLUT['MintGreen'] || 'blue',
  suggestion: colorLUT['Blue'] || 'purple',
  issue: colorLUT['Yellow'] || 'yellow',
  todo: colorLUT['Cream'] || 'orange',
  question: colorLUT['DarkBlue'] || 'blue',
  thought: colorLUT['Cyan'] || 'lightblue',
  chore: colorLUT['DarkOrange'] || 'brown',
  note: colorLUT['Black'] || 'blue',
  typo: colorLUT['Orange'] || 'orange',
  polish: colorLUT['MintGreen'] || 'blue',
  quibble: colorLUT['MintGreen'] || 'blue',
};

// Color mapping for conventional comment decorations using LUT
const decorationColors: Record<ConventionalDecoration, string> = {
  'non-blocking': colorLUT['LightGreen'] || 'brightgreen',
  'blocking': colorLUT['Red'] || 'red',
  'if-minor': colorLUT['Yellow'] || 'yellow',
  'security': colorLUT['Burgundy'] || 'red',
  'test': colorLUT['Cyan'] || 'lightblue',
  'ux': colorLUT['MintGreen'] || 'lightgreen',
  'performance': colorLUT['BurntOrange'] || 'orange',
  'accessibility': colorLUT['Blue'] || 'blue',
  'documentation': colorLUT['BlueGray'] || 'blue',
  'style': colorLUT['Black'] || 'lightgray',
  'refactor': colorLUT['DarkBlue'] || 'blue',
  'bug': colorLUT['Burgundy'] || 'red',
  'feature': colorLUT['LightGreen'] || 'green',
  'breaking': colorLUT['Burgundy'] || 'red',
  'deprecated': colorLUT['BurntOrange'] || 'orange',
  'experimental': colorLUT['Cyan'] || 'lightblue',
  'wip': colorLUT['Yellow'] || 'yellow',
  'draft': colorLUT['Black'] || 'lightgray',
  'review': colorLUT['Blue'] || 'blue',
  'approved': colorLUT['LightGreen'] || 'green',
  'rejected': colorLUT['Red'] || 'red',
};

// Conventional shield options interface
interface ConventionalShieldOptions extends Omit<BadgeOptions, 'message'> {
  label: ConventionalLabel;                    // Required: The type of comment
  decorations?: ConventionalDecoration[];      // Optional: Additional context decorations
  autoColor?: boolean;                         // Optional: Auto-assign colors based on label type
  message?: string;                            // Optional: Custom message (overrides decorations)
}

// URL encoding helper for badge content
function encodeBadgeContent(content: string): string {
  return content
    .replace(/-/g, '--')  // Double dash for dash
    .replace(/_/g, '__')  // Double underscore for underscore
    .replace(/\s/g, '_'); // Single underscore for space
}

// Remove '#' from hex colors for Shields.io compatibility
function normalizeColor(color: string): string {
  return color.startsWith('#') ? color.slice(1) : color;
}

// Generate badge URL based on Shields.io static badge API
function generateBadge(options: BadgeOptions): string {
  const baseUrl = 'https://img.shields.io/badge/';

  // Build the badge content (label-message-color)
  let badgeContent = '';

  if (options.label) {
    badgeContent += encodeBadgeContent(options.label);
  }

  if (options.message) {
    badgeContent += '-' + encodeBadgeContent(options.message);
  }

  if (options.color) {
    badgeContent += '-' + normalizeColor(options.color);
  }

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (options.style && options.style !== 'flat') {
    queryParams.append('style', options.style);
  }

  if (options.logo) {
    queryParams.append('logo', options.logo);
  }

  if (options.logoColor) {
    queryParams.append('logoColor', options.logoColor);
  }

  if (options.logoSize) {
    queryParams.append('logoSize', options.logoSize);
  }

  if (options.labelColor) {
    queryParams.append('labelColor', normalizeColor(options.labelColor));
  }

  if (options.cacheSeconds) {
    queryParams.append('cacheSeconds', options.cacheSeconds.toString());
  }

  if (options.links && options.links.length > 0) {
    options.links.forEach(link => {
      queryParams.append('link', link);
    });
  }

  const queryString = queryParams.toString();
  const fullUrl = baseUrl + badgeContent + (queryString ? '?' + queryString : '');

  return fullUrl;
}

// Generate conventional comment badge
function generateConventionalShield(options: ConventionalShieldOptions): string {
  const {
    label,
    decorations = [],
    autoColor = true,
    ...badgeOptions
  } = options;

  // Build the message with only decorations
  let message = '';

  if (decorations.length > 0) {
    message = decorations.join(',');
  }

  // Auto-assign colors based on label type and decorations if enabled
  let color = badgeOptions.color;
  let labelColor = badgeOptions.labelColor;

  if (autoColor) {
    // Auto-color the label (left side)
    labelColor = labelColors[label];

    // Auto-color the message (right side) based on decorations
    if (decorations.length > 0) {
      // Use the first decoration's color, or fall back to label color
      color = decorationColors[decorations[0]] || labelColors[label];
    } else {
      // No decorations, use label color for message
      color = labelColors[label];
    }
  }

  // Generate badge with conventional comment formatting
  return generateBadge({
    ...badgeOptions,
    label,
    message,
    color,
    labelColor,
    style: badgeOptions.style || 'for-the-badge'
  });
}

// Convenience functions for common conventional comment types
function generatePraiseBadge(decorations?: ConventionalDecoration[]): string {
  return generateConventionalShield({
    label: 'praise',
    decorations
  });
}

function generateSuggestionBadge(decorations?: ConventionalDecoration[]): string {
  return generateConventionalShield({
    label: 'suggestion',
    decorations
  });
}

function generateIssueBadge(decorations?: ConventionalDecoration[]): string {
  return generateConventionalShield({
    label: 'issue',
    decorations
  });
}

function generateQuestionBadge(decorations?: ConventionalDecoration[]): string {
  return generateConventionalShield({
    label: 'question',
    decorations
  });
}

function generateTodoBadge(decorations?: ConventionalDecoration[]): string {
  return generateConventionalShield({
    label: 'todo',
    decorations
  });
}

function generateChoreBadge(decorations?: ConventionalDecoration[]): string {
  return generateConventionalShield({
    label: 'chore',
    decorations
  });
}

// Export functions and types
export {
  generateBadge,
  generateConventionalShield,
  generatePraiseBadge,
  generateSuggestionBadge,
  generateIssueBadge,
  generateQuestionBadge,
  generateTodoBadge,
  generateChoreBadge,
  palette,
  availableLabels,
  availableDecorations,
  type BadgeOptions,
  type BadgeStyle,
  type ConventionalLabel,
  type ConventionalDecoration,
  type ConventionalShieldOptions
};

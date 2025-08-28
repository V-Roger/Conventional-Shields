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


// Create color LUT from config palette
const colorLUT: Record<string, string> = {};
palette.colors.forEach(color => {
  colorLUT[color.name] = color.hex;
});

// Color mapping for conventional comment labels using LUT
const labelColors: Record<ConventionalLabel, string> = {
  praise: colorLUT['LightGreen'] || 'brightgreen',
  nitpick: colorLUT['Blue'] || 'blue',
  suggestion: colorLUT['BlueGray'] || 'purple',
  issue: colorLUT['Yellow'] || 'yellow',
  todo: colorLUT['Cream'] || 'orange',
  question: colorLUT['DarkBlue'] || 'blue',
  thought: colorLUT['Cyan'] || 'lightblue',
  chore: colorLUT['DarkOrange'] || 'brown',
  note: colorLUT['MintGreen'] || 'blue',
  typo: colorLUT['Amber'] || 'orange',
  polish: colorLUT['Blue'] || 'blue',
  quibble: colorLUT['Blue'] || 'blue',
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

  badgeContent += '-' + encodeBadgeContent(options.message);

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
    queryParams.append('labelColor', options.labelColor);
  }

  if (options.color) {
    queryParams.append('color', normalizeColor(options.color));
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

  // Auto-assign colors based on label type if enabled
  const color = autoColor ? labelColors[label] : badgeOptions.color;

  // Generate badge with conventional comment formatting
  return generateBadge({
    ...badgeOptions,
    label,
    message,
    color,
    style: badgeOptions.style || 'flat'
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
  type BadgeOptions,
  type BadgeStyle,
  type ConventionalLabel,
  type ConventionalDecoration,
  type ConventionalShieldOptions
};

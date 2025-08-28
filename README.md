# Conventional Shields

A TypeScript library for generating Shields.io badges with a focus on conventional comments and code review workflows.

## Features

- 🎨 **Color Palette**: 20 carefully selected colors for consistent badge styling
- 🏷️ **Badge Generator**: Full implementation of Shields.io static badge API
- 💬 **Conventional Comments**: Complete support for [Conventional Comments](https://conventionalcomments.org/#labels) specification
- 🚀 **Convenience Functions**: Pre-built functions for common badge types and comment labels
- 📝 **TypeScript Support**: Full type safety and IntelliSense support

## Installation

```bash
npm install conventional-shields
```

## Usage

### Programmatic Usage

#### Basic Badge Generation

```typescript
import { generateBadge } from 'conventional-shields';

// Simple badge
const badge = generateBadge({
  message: 'passing',
  color: 'brightgreen'
});

// Badge with label
const versionBadge = generateBadge({
  label: 'version',
  message: '1.0.0',
  color: 'blue'
});
```

### Conventional Comments Badges

```typescript
import { 
  generateConventionalShield,
  generatePraiseBadge,
  generateSuggestionBadge,
  generateIssueBadge,
  generateQuestionBadge,
  generateTodoBadge,
  generateChoreBadge
} from 'conventional-shields';

// Basic conventional comment badges (with decorations)
const praise = generatePraiseBadge(['non-blocking']);
const suggestion = generateSuggestionBadge(['performance']);
const issue = generateIssueBadge(['security', 'blocking']);

// With decorations
const blockingSuggestion = generateSuggestionBadge(['security', 'blocking']);
const nonBlockingIssue = generateIssueBadge(['ux', 'non-blocking']);

// Advanced usage with custom options
const customBadge = generateConventionalShield({
  label: 'thought',
  decorations: ['performance', 'non-blocking'],
  style: 'flat-square',
  logo: 'lightbulb'
});
```

### Advanced Options

```typescript
import { generateBadge } from 'conventional-shields';

const advancedBadge = generateBadge({
  label: 'coverage',
  message: '95%',
  color: '#f94144', // Custom hex color
  style: 'flat-square',
  logo: 'typescript',
  logoColor: 'white',
  logoSize: 'auto',
  labelColor: '#005f73',
  cacheSeconds: 3600,
  links: ['https://example.com', 'https://docs.example.com']
});
```

## API Reference

### `generateBadge(options: BadgeOptions): string`

Main function for generating badge URLs.

#### BadgeOptions Interface

```typescript
interface BadgeOptions {
  label?: string;           // Left side text
  message: string;          // Right side text (required)
  color?: string;           // Background color (hex, rgb, rgba, hsl, hsla, or CSS named colors)
  style?: BadgeStyle;       // Badge style: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social'
  logo?: string;            // Icon slug from simple-icons
  logoColor?: string;       // Logo color
  logoSize?: string;        // Logo size ('auto' for adaptive sizing)
  labelColor?: string;      // Label background color
  cacheSeconds?: number;    // HTTP cache lifetime
  links?: string[];         // Clickable links (works with <object> tags)
}
```

### Conventional Comments Functions

- `generateConventionalShield(options: ConventionalShieldOptions): string` - Main function for conventional comment badges
- `generatePraiseBadge(decorations?: ConventionalDecoration[]): string`
- `generateSuggestionBadge(decorations?: ConventionalDecoration[]): string`
- `generateIssueBadge(decorations?: ConventionalDecoration[]): string`
- `generateQuestionBadge(decorations?: ConventionalDecoration[]): string`
- `generateTodoBadge(decorations?: ConventionalDecoration[]): string`
- `generateChoreBadge(decorations?: ConventionalDecoration[]): string`

### Color Palette

The library includes a curated palette of 20 colors:

```typescript
import { palette } from 'conventional-shields';

// Available colors:
// "#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f", "#90be6d", "#43aa8b", 
// "#4d908e", "#577590", "#277da1", "#001219", "#005f73", "#0a9396", "#94d2bd", 
// "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"
```

## Examples

### Conventional Comments Badges

```typescript
// Praise comment
const praiseBadge = generatePraiseBadge(['non-blocking']);

// Suggestion with decorations
const suggestionBadge = generateSuggestionBadge(['style', 'non-blocking']);

// Issue with blocking decoration
const issueBadge = generateIssueBadge(['performance', 'blocking']);

// Question for clarification
const questionBadge = generateQuestionBadge(['non-blocking']);

// Todo with test decoration
const todoBadge = generateTodoBadge(['test']);

// Chore with documentation decoration
const choreBadge = generateChoreBadge(['documentation']);
```

### Available Labels

The library supports all [Conventional Comments](https://conventionalcomments.org/#labels) labels:

- **praise** - Praises highlight something positive
- **nitpick** - Trivial preference-based requests
- **suggestion** - Propose improvements
- **issue** - Highlight specific problems
- **todo** - Small, trivial, but necessary changes
- **question** - For clarification or investigation
- **thought** - Ideas that popped up from reviewing
- **chore** - Simple tasks that must be done
- **note** - Highlight something to take note of
- **typo** - Misspellings
- **polish** - Quality improvements
- **quibble** - Very much like nitpicks

### Available Decorations

Common decorations for additional context:

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

### Project Status Badges

```typescript
// Development status
const devStatus = generateBadge({
  label: 'status',
  message: 'in development',
  color: 'yellow',
  logo: 'typescript'
});

// Documentation
const docsBadge = generateBadge({
  label: 'docs',
  message: 'available',
  color: 'blue',
  logo: 'readthedocs'
});

// Tests
const testBadge = generateBadge({
  label: 'tests',
  message: '100%',
  color: 'brightgreen',
  logo: 'jest'
});
```

## URL Encoding

The library automatically handles URL encoding according to Shields.io specifications:

- Spaces (` `) → Underscores (`_`)
- Underscores (`_`) → Double underscores (`__`)
- Dashes (`-`) → Double dashes (`--`)

## Supported Colors

The library supports all color formats accepted by Shields.io:

- **Hex**: `#f94144`, `f94144`
- **RGB**: `rgb(249, 65, 68)`
- **RGBA**: `rgba(249, 65, 68, 0.8)`
- **HSL**: `hsl(359, 95%, 62%)`
- **HSLA**: `hsla(359, 95%, 62%, 0.8)`
- **CSS Named Colors**: `red`, `blue`, `green`, `yellow`, etc.

## Development

### Building

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode (watch for changes)
npm run dev

# Generate badge examples
npm run generate-examples
```

### Project Structure

```
src/
├── index.ts              # Main library implementation
└── config/
    └── palette.json      # Color palette configuration

scripts/
└── generate-badge-examples.js  # Example generator

examples/
└── badge-examples.md     # Generated badge examples
```

## License

CC-BY-SA-4.0

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


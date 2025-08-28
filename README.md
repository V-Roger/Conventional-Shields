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

The library includes a curated palette of 20 carefully selected colors for consistent badge styling:

```typescript
import { palette } from 'conventional-shields';
```

#### Visual Color Palette

| Color | Name | Hex Code | Preview |
|-------|------|----------|---------|
| ![Red](https://img.shields.io/badge/Red-f94144?style=flat-square&color=f94144) | Red | `#f94144` | ![Red](https://img.shields.io/badge/-f94144?style=flat-square&color=f94144) |
| ![OrangeRed](https://img.shields.io/badge/OrangeRed-f3722c?style=flat-square&color=f3722c) | OrangeRed | `#f3722c` | ![OrangeRed](https://img.shields.io/badge/-f3722c?style=flat-square&color=f3722c) |
| ![Orange](https://img.shields.io/badge/Orange-f8961e?style=flat-square&color=f8961e) | Orange | `#f8961e` | ![Orange](https://img.shields.io/badge/-f8961e?style=flat-square&color=f8961e) |
| ![LightOrange](https://img.shields.io/badge/LightOrange-f9844a?style=flat-square&color=f9844a) | LightOrange | `#f9844a` | ![LightOrange](https://img.shields.io/badge/-f9844a?style=flat-square&color=f9844a) |
| ![Yellow](https://img.shields.io/badge/Yellow-f9c74f?style=flat-square&color=f9c74f) | Yellow | `#f9c74f` | ![Yellow](https://img.shields.io/badge/-f9c74f?style=flat-square&color=f9c74f) |
| ![LightGreen](https://img.shields.io/badge/LightGreen-90be6d?style=flat-square&color=90be6d) | LightGreen | `#90be6d` | ![LightGreen](https://img.shields.io/badge/-90be6d?style=flat-square&color=90be6d) |
| ![Teal](https://img.shields.io/badge/Teal-43aa8b?style=flat-square&color=43aa8b) | Teal | `#43aa8b` | ![Teal](https://img.shields.io/badge/-43aa8b?style=flat-square&color=43aa8b) |
| ![DarkTeal](https://img.shields.io/badge/DarkTeal-4d908e?style=flat-square&color=4d908e) | DarkTeal | `#4d908e` | ![DarkTeal](https://img.shields.io/badge/-4d908e?style=flat-square&color=4d908e) |
| ![BlueGray](https://img.shields.io/badge/BlueGray-577590?style=flat-square&color=577590) | BlueGray | `#577590` | ![BlueGray](https://img.shields.io/badge/-577590?style=flat-square&color=577590) |
| ![Blue](https://img.shields.io/badge/Blue-277da1?style=flat-square&color=277da1) | Blue | `#277da1` | ![Blue](https://img.shields.io/badge/-277da1?style=flat-square&color=277da1) |
| ![Black](https://img.shields.io/badge/Black-001219?style=flat-square&color=001219) | Black | `#001219` | ![Black](https://img.shields.io/badge/-001219?style=flat-square&color=001219) |
| ![DarkBlue](https://img.shields.io/badge/DarkBlue-005f73?style=flat-square&color=005f73) | DarkBlue | `#005f73` | ![DarkBlue](https://img.shields.io/badge/-005f73?style=flat-square&color=005f73) |
| ![Cyan](https://img.shields.io/badge/Cyan-0a9396?style=flat-square&color=0a9396) | Cyan | `#0a9396` | ![Cyan](https://img.shields.io/badge/-0a9396?style=flat-square&color=0a9396) |
| ![MintGreen](https://img.shields.io/badge/MintGreen-94d2bd?style=flat-square&color=94d2bd) | MintGreen | `#94d2bd` | ![MintGreen](https://img.shields.io/badge/-94d2bd?style=flat-square&color=94d2bd) |
| ![Cream](https://img.shields.io/badge/Cream-e9d8a6?style=flat-square&color=e9d8a6) | Cream | `#e9d8a6` | ![Cream](https://img.shields.io/badge/-e9d8a6?style=flat-square&color=e9d8a6) |
| ![Amber](https://img.shields.io/badge/Amber-ee9b00?style=flat-square&color=ee9b00) | Amber | `#ee9b00` | ![Amber](https://img.shields.io/badge/-ee9b00?style=flat-square&color=ee9b00) |
| ![DarkOrange](https://img.shields.io/badge/DarkOrange-ca6702?style=flat-square&color=ca6702) | DarkOrange | `#ca6702` | ![DarkOrange](https://img.shields.io/badge/-ca6702?style=flat-square&color=ca6702) |
| ![BurntOrange](https://img.shields.io/badge/BurntOrange-bb3e03?style=flat-square&color=bb3e03) | BurntOrange | `#bb3e03` | ![BurntOrange](https://img.shields.io/badge/-bb3e03?style=flat-square&color=bb3e03) |
| ![DarkRed](https://img.shields.io/badge/DarkRed-ae2012?style=flat-square&color=ae2012) | DarkRed | `#ae2012` | ![DarkRed](https://img.shields.io/badge/-ae2012?style=flat-square&color=ae2012) |
| ![Burgundy](https://img.shields.io/badge/Burgundy-9b2226?style=flat-square&color=9b2226) | Burgundy | `#9b2226` | ![Burgundy](https://img.shields.io/badge/-9b2226?style=flat-square&color=9b2226) |

#### Color Usage Examples

```typescript
// Use colors by name (recommended)
const badge1 = generateBadge({
  label: 'status',
  message: 'active',
  color: palette.colors.find(c => c.name === 'LightGreen')?.hex || 'green'
});

// Use colors by hex value
const badge2 = generateBadge({
  label: 'version',
  message: '1.0.0',
  color: '#f94144' // Red
});

// Use in conventional comments
const praiseBadge = generatePraiseBadge(['non-blocking']); // Uses LightGreen
const issueBadge = generateIssueBadge(['blocking']); // Uses Yellow
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


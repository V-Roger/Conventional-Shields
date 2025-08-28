# Conventional Shields

A TypeScript lib for generating [Shields.io](https://shields.io/) badges with a focus on [conventional comments](https://conventionalcomments.org/#labels) for better code review workflows.

## Features

- 🎨 **Color Palette**: 16 pretty colors for consistent badge styling
- 🏷️ **Badge Generator**: implementats the Shields.io static badge API
- 💬 **Conventional Comments**: supports the [Conventional Comments](https://conventionalcomments.org/#labels) specifications
- 🚀 **Convenience Functions**: Pre-built functions for common badge types and comment labels
- 🤖 **Raycast scripts**: for the MacOs users out there

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

// Basic conventional comment badges
const praise = generatePraiseBadge();
const suggestion = generateSuggestionBadge(['performance']);
const issue = generateIssueBadge(['security', 'blocking']);

// With multiple decorations
const blockingSuggestion = generateSuggestionBadge(['security', 'blocking']);
const nonBlockingIssue = generateIssueBadge(['ux', 'non-blocking']);

// Advanced usage with custom options
const customBadge = generateConventionalShield({
  label: 'thought',
  decorations: ['performance', 'non-blocking'],
  style: 'flat-square', // Override default 'for-the-badge' style
});
```

**Auto-Coloring**: Conventional comment badges automatically color both the label and message parts:

- Label colors are based on the comment type (praise, suggestion, issue, etc.)
- Message colors are based on the first decoration (security, blocking, performance, etc.)
- No decorations assign label's color  to both label and message
- Manual override with `autoColor: false` allows custom colors usage

**Default Style**: Conventional comment badges default to `'for-the-badge'` style for better visibility and prominence.

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

The library includes a carefully curated palette of 14 colors for consistent badge styling:

```typescript
import { palette } from 'conventional-shields';
```

#### Visual Color Palette

| Color | Name | Hex Code | Preview |
|-------|------|----------|---------|
| ![Burgundy](https://img.shields.io/badge/Burgundy-9b2226?style=flat-square&color=9b2226) | Burgundy | `#9b2226` | ![Burgundy](https://img.shields.io/badge/-9b2226?style=flat-square&color=9b2226) |
| ![Red](https://img.shields.io/badge/Red-f94144?style=flat-square&color=f94144) | Red | `#f94144` | ![Red](https://img.shields.io/badge/-f94144?style=flat-square&color=f94144) |
| ![BurntOrange](https://img.shields.io/badge/BurntOrange-bb3e03?style=flat-square&color=bb3e03) | BurntOrange | `#bb3e03` | ![BurntOrange](https://img.shields.io/badge/-bb3e03?style=flat-square&color=bb3e03) |
| ![DarkOrange](https://img.shields.io/badge/DarkOrange-ca6702?style=flat-square&color=ca6702) | DarkOrange | `#ca6702` | ![DarkOrange](https://img.shields.io/badge/-ca6702?style=flat-square&color=ca6702) |
| ![Orange](https://img.shields.io/badge/Orange-f8961e?style=flat-square&color=f8961e) | Orange | `#f8961e` | ![Orange](https://img.shields.io/badge/-f8961e?style=flat-square&color=f8961e) |
| ![Yellow](https://img.shields.io/badge/Yellow-f9c74f?style=flat-square&color=f9c74f) | Yellow | `#f9c74f` | ![Yellow](https://img.shields.io/badge/-f9c74f?style=flat-square&color=f9c74f) |
| ![Cream](https://img.shields.io/badge/Cream-e9d8a6?style=flat-square&color=e9d8a6) | Cream | `#e9d8a6` | ![Cream](https://img.shields.io/badge/-e9d8a6?style=flat-square&color=e9d8a6) |
| ![MintGreen](https://img.shields.io/badge/MintGreen-94d2bd?style=flat-square&color=94d2bd) | MintGreen | `#94d2bd` | ![MintGreen](https://img.shields.io/badge/-94d2bd?style=flat-square&color=94d2bd) |
| ![Cyan](https://img.shields.io/badge/Cyan-0a9396?style=flat-square&color=0a9396) | Cyan | `#0a9396` | ![Cyan](https://img.shields.io/badge/-0a9396?style=flat-square&color=0a9396) |
| ![LightGreen](https://img.shields.io/badge/LightGreen-90be6d?style=flat-square&color=90be6d) | LightGreen | `#90be6d` | ![LightGreen](https://img.shields.io/badge/-90be6d?style=flat-square&color=90be6d) |
| ![BlueGray](https://img.shields.io/badge/BlueGray-577590?style=flat-square&color=577590) | BlueGray | `#577590` | ![BlueGray](https://img.shields.io/badge/-577590?style=flat-square&color=577590) |
| ![Blue](https://img.shields.io/badge/Blue-277da1?style=flat-square&color=277da1) | Blue | `#277da1` | ![Blue](https://img.shields.io/badge/-277da1?style=flat-square&color=277da1) |
| ![DarkBlue](https://img.shields.io/badge/DarkBlue-005f73?style=flat-square&color=005f73) | DarkBlue | `#005f73` | ![DarkBlue](https://img.shields.io/badge/-005f73?style=flat-square&color=005f73) |
| ![Black](https://img.shields.io/badge/Black-001219?style=flat-square&color=001219) | Black | `#001219` | ![Black](https://img.shields.io/badge/-001219?style=flat-square&color=001219) |

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
- **polish** - nitpick-like quality improvements
- **quibble** - Very much like nitpicks

### Badge Examples

#### Default Badges (No Decorations)

| | | | |
|---|---|---|---|
| ![praise](https://img.shields.io/badge/praise-90be6d?style=for-the-badge&labelColor=90be6d) | ![nitpick](https://img.shields.io/badge/nitpick-94d2bd?style=for-the-badge&labelColor=94d2bd) | ![suggestion](https://img.shields.io/badge/suggestion-277da1?style=for-the-badge&labelColor=277da1) | ![issue](https://img.shields.io/badge/issue-f9c74f?style=for-the-badge&labelColor=f9c74f) |
| ![todo](https://img.shields.io/badge/todo-e9d8a6?style=for-the-badge&labelColor=e9d8a6) | ![question](https://img.shields.io/badge/question-005f73?style=for-the-badge&labelColor=005f73) | ![thought](https://img.shields.io/badge/thought-0a9396?style=for-the-badge&labelColor=0a9396) | ![chore](https://img.shields.io/badge/chore-ca6702?style=for-the-badge&labelColor=ca6702) |
| ![note](https://img.shields.io/badge/note-001219?style=for-the-badge&labelColor=001219) | ![typo](https://img.shields.io/badge/typo-f8961e?style=for-the-badge&labelColor=f8961e) | ![polish](https://img.shields.io/badge/polish-94d2bd?style=for-the-badge&labelColor=94d2bd) | ![quibble](https://img.shields.io/badge/quibble-94d2bd?style=for-the-badge&labelColor=94d2bd) |

#### Decorated Badges (With Relevant Decorations)

| | | | |
|---|---|---|---|
| ![praise-feature](https://img.shields.io/badge/praise-feature-90be6d?style=for-the-badge&labelColor=90be6d) | ![nitpick-style](https://img.shields.io/badge/nitpick-style,non--blocking-001219?style=for-the-badge&labelColor=94d2bd) | ![suggestion-performance](https://img.shields.io/badge/suggestion-performance-bb3e03?style=for-the-badge&labelColor=277da1) | ![issue-security](https://img.shields.io/badge/issue-security,blocking-9b2226?style=for-the-badge&labelColor=f9c74f) |
| ![todo-test](https://img.shields.io/badge/todo-test-0a9396?style=for-the-badge&labelColor=e9d8a6) | ![question-ux](https://img.shields.io/badge/question-ux-94d2bd?style=for-the-badge&labelColor=005f73) | ![thought-refactor](https://img.shields.io/badge/thought-refactor-005f73?style=for-the-badge&labelColor=0a9396) | ![chore-docs](https://img.shields.io/badge/chore-documentation-577590?style=for-the-badge&labelColor=ca6702) |
| ![note-security](https://img.shields.io/badge/note-security-9b2226?style=for-the-badge&labelColor=001219) | ![typo-docs](https://img.shields.io/badge/typo-documentation-577590?style=for-the-badge&labelColor=f8961e) | ![polish-ux](https://img.shields.io/badge/polish-ux-94d2bd?style=for-the-badge&labelColor=94d2bd) | ![quibble-style](https://img.shields.io/badge/quibble-style-001219?style=for-the-badge&labelColor=94d2bd) |

### Available Decorations

Common decorations for additional context:

- **non-blocking** - Should not prevent acceptance
- **blocking** - Should prevent acceptance until resolved
- **if-minor** - Should resolve only if suggested changes turn out to be minor
- **security**
- **test**
- **ux**
- **performance**
- **accessibility**
- **documentation**
- **style**
- **refactor** - Refactoring suggestion
- **bug**
- **feature**
- **breaking** - Breaking change
- **deprecated**
- **experimental** - Experimental feature
- **wip** - Work In Progress
- **draft**
- **review**
- **approved**
- **rejected**

## License

CC-BY-SA-4.0

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

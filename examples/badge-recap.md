# Conventional Comments Badge Recap

This document provides a comprehensive overview of all available conventional comment badge configurations.

## Summary

- **Total Labels:** 12
- **Total Configurations:** 24
- **Generated:** 8/28/2025, 2:00:23 PM

## Labels Overview

| Label | Description | Default Color | Relevant Decoration |
|-------|-------------|---------------|-------------------|
| **praise** | Praises highlight something positive | `#90be6d` | feature |
| **nitpick** | Nitpicks are trivial preference-based requests | `#94d2bd` | style, non-blocking |
| **suggestion** | Suggestions propose improvements | `#277da1` | performance |
| **issue** | Issues highlight specific problems | `#f9c74f` | security, blocking |
| **todo** | TODO's are small, trivial, but necessary changes | `#e9d8a6` | test |
| **question** | Questions for clarification or investigation | `#1d3557` | ux |
| **thought** | Thoughts represent ideas that popped up from reviewing | `#06ffa5` | refactor |
| **chore** | Chores are simple tasks that must be done | `#ee6c4d` | documentation |
| **note** | Notes highlight something the reader should take note of | `#001219` | security |
| **typo** | Typo comments for misspellings | `#fb8500` | documentation |
| **polish** | Polish comments for quality improvements | `#94d2bd` | ux |
| **quibble** | Quibbles are very much like nitpicks | `#94d2bd` | style |

## All Badge Configurations

### Default Badges (No Decorations)

| Label | Badge | Description |
|-------|-------|-------------|
| **praise** | ![praise-default](https://img.shields.io/badge/praise-90be6d?style=for-the-badge&labelColor=90be6d) | praise badge with no decorations |
| **nitpick** | ![nitpick-default](https://img.shields.io/badge/nitpick-94d2bd?style=for-the-badge&labelColor=94d2bd) | nitpick badge with no decorations |
| **suggestion** | ![suggestion-default](https://img.shields.io/badge/suggestion-277da1?style=for-the-badge&labelColor=277da1) | suggestion badge with no decorations |
| **issue** | ![issue-default](https://img.shields.io/badge/issue-f9c74f?style=for-the-badge&labelColor=f9c74f) | issue badge with no decorations |
| **todo** | ![todo-default](https://img.shields.io/badge/todo-e9d8a6?style=for-the-badge&labelColor=e9d8a6) | todo badge with no decorations |
| **question** | ![question-default](https://img.shields.io/badge/question-005f73?style=for-the-badge&labelColor=005f73) | question badge with no decorations |
| **thought** | ![thought-default](https://img.shields.io/badge/thought-0a9396?style=for-the-badge&labelColor=0a9396) | thought badge with no decorations |
| **chore** | ![chore-default](https://img.shields.io/badge/chore-ca6702?style=for-the-badge&labelColor=ca6702) | chore badge with no decorations |
| **note** | ![note-default](https://img.shields.io/badge/note-001219?style=for-the-badge&labelColor=001219) | note badge with no decorations |
| **typo** | ![typo-default](https://img.shields.io/badge/typo-f8961e?style=for-the-badge&labelColor=f8961e) | typo badge with no decorations |
| **polish** | ![polish-default](https://img.shields.io/badge/polish-94d2bd?style=for-the-badge&labelColor=94d2bd) | polish badge with no decorations |
| **quibble** | ![quibble-default](https://img.shields.io/badge/quibble-94d2bd?style=for-the-badge&labelColor=94d2bd) | quibble badge with no decorations |

### Decorated Badges (With Relevant Decorations)

| Label | Decorations | Badge | Example |
|-------|-------------|-------|---------|
| **praise** | feature | ![praise-decorated](https://img.shields.io/badge/praise-feature-90be6d?style=for-the-badge&labelColor=90be6d) | Great feature implementation! |
| **nitpick** | style, non-blocking | ![nitpick-decorated](https://img.shields.io/badge/nitpick-style,non--blocking-001219?style=for-the-badge&labelColor=94d2bd) | Minor style preference, not blocking |
| **suggestion** | performance | ![suggestion-decorated](https://img.shields.io/badge/suggestion-performance-bb3e03?style=for-the-badge&labelColor=277da1) | Consider performance optimization |
| **issue** | security, blocking | ![issue-decorated](https://img.shields.io/badge/issue-security,blocking-9b2226?style=for-the-badge&labelColor=f9c74f) | Critical security issue that blocks acceptance |
| **todo** | test | ![todo-decorated](https://img.shields.io/badge/todo-test-0a9396?style=for-the-badge&labelColor=e9d8a6) | Add tests for this feature |
| **question** | ux | ![question-decorated](https://img.shields.io/badge/question-ux-94d2bd?style=for-the-badge&labelColor=005f73) | UX design question |
| **thought** | refactor | ![thought-decorated](https://img.shields.io/badge/thought-refactor-005f73?style=for-the-badge&labelColor=0a9396) | Refactoring idea |
| **chore** | documentation | ![chore-decorated](https://img.shields.io/badge/chore-documentation-577590?style=for-the-badge&labelColor=ca6702) | Update documentation |
| **note** | security | ![note-decorated](https://img.shields.io/badge/note-security-9b2226?style=for-the-badge&labelColor=001219) | Security note |
| **typo** | documentation | ![typo-decorated](https://img.shields.io/badge/typo-documentation-577590?style=for-the-badge&labelColor=f8961e) | Fix documentation typo |
| **polish** | ux | ![polish-decorated](https://img.shields.io/badge/polish-ux-94d2bd?style=for-the-badge&labelColor=94d2bd) | UX polish needed |
| **quibble** | style | ![quibble-decorated](https://img.shields.io/badge/quibble-style-001219?style=for-the-badge&labelColor=94d2bd) | Style quibble |

## Color Palette

| Color Name | Hex Code |
|------------|----------|
| **Burgundy** | `#9b2226` |
| **Red** | `#f94144` |
| **BurntOrange** | `#bb3e03` |
| **DarkOrange** | `#ca6702` |
| **Orange** | `#f8961e` |
| **Yellow** | `#f9c74f` |
| **Cream** | `#e9d8a6` |
| **MintGreen** | `#94d2bd` |
| **Cyan** | `#0a9396` |
| **LightGreen** | `#90be6d` |
| **BlueGray** | `#577590` |
| **Blue** | `#277da1` |
| **DarkBlue** | `#005f73` |
| **Black** | `#001219` |

## Usage Examples

### Programmatic Usage

```typescript
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
```

### Markdown Usage

```markdown
<!-- Default praise badge -->
![praise](https://img.shields.io/badge/praise-90be6d?style=for-the-badge&labelColor=90be6d)

<!-- Issue with security decoration -->
![issue-security](https://img.shields.io/badge/issue-security,blocking-9b2226?style=for-the-badge&labelColor=f9c74f)

<!-- Suggestion with performance decoration -->
![suggestion-performance](https://img.shields.io/badge/suggestion-performance-bb3e03?style=for-the-badge&labelColor=277da1)
```

## Quick Reference

### Available Labels
- **praise** - Praises highlight something positive
- **nitpick** - Nitpicks are trivial preference-based requests
- **suggestion** - Suggestions propose improvements
- **issue** - Issues highlight specific problems
- **todo** - TODO's are small, trivial, but necessary changes
- **question** - Questions for clarification or investigation
- **thought** - Thoughts represent ideas that popped up from reviewing
- **chore** - Chores are simple tasks that must be done
- **note** - Notes highlight something the reader should take note of
- **typo** - Typo comments for misspellings
- **polish** - Polish comments for quality improvements
- **quibble** - Quibbles are very much like nitpicks

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

*Generated from badge-configurations.json on 8/28/2025, 2:03:27 PM*

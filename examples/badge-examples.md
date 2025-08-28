# Conventional Comments Badge Examples

This file contains examples of all conventional comment badges with their respective colors.

## All Labels

### Praise

**Decorations:** non-blocking

![praise](https://img.shields.io/badge/praise-non--blocking-90be6d?color=90be6d)

```markdown
![praise](https://img.shields.io/badge/praise-non--blocking-90be6d?color=90be6d)
```

---

### Nitpick

**Decorations:** style, non-blocking

![nitpick](https://img.shields.io/badge/nitpick-style,non--blocking-277da1?color=277da1)

```markdown
![nitpick](https://img.shields.io/badge/nitpick-style,non--blocking-277da1?color=277da1)
```

---

### Suggestion

**Decorations:** performance

![suggestion](https://img.shields.io/badge/suggestion-performance-577590?color=577590)

```markdown
![suggestion](https://img.shields.io/badge/suggestion-performance-577590?color=577590)
```

---

### Issue

**Decorations:** security, blocking

![issue](https://img.shields.io/badge/issue-security,blocking-f9c74f?color=f9c74f)

```markdown
![issue](https://img.shields.io/badge/issue-security,blocking-f9c74f?color=f9c74f)
```

---

### Todo

**Decorations:** test

![todo](https://img.shields.io/badge/todo-test-e9d8a6?color=e9d8a6)

```markdown
![todo](https://img.shields.io/badge/todo-test-e9d8a6?color=e9d8a6)
```

---

### Question

**Decorations:** ux

![question](https://img.shields.io/badge/question-ux-005f73?color=005f73)

```markdown
![question](https://img.shields.io/badge/question-ux-005f73?color=005f73)
```

---

### Thought

**Decorations:** non-blocking

![thought](https://img.shields.io/badge/thought-non--blocking-0a9396?color=0a9396)

```markdown
![thought](https://img.shields.io/badge/thought-non--blocking-0a9396?color=0a9396)
```

---

### Chore

**Decorations:** documentation

![chore](https://img.shields.io/badge/chore-documentation-ca6702?color=ca6702)

```markdown
![chore](https://img.shields.io/badge/chore-documentation-ca6702?color=ca6702)
```

---

### Note

**Decorations:** non-blocking

![note](https://img.shields.io/badge/note-non--blocking-94d2bd?color=94d2bd)

```markdown
![note](https://img.shields.io/badge/note-non--blocking-94d2bd?color=94d2bd)
```

---

### Typo

**Decorations:** style

![typo](https://img.shields.io/badge/typo-style-ee9b00?color=ee9b00)

```markdown
![typo](https://img.shields.io/badge/typo-style-ee9b00?color=ee9b00)
```

---

### Polish

**Decorations:** ux

![polish](https://img.shields.io/badge/polish-ux-277da1?color=277da1)

```markdown
![polish](https://img.shields.io/badge/polish-ux-277da1?color=277da1)
```

---

### Quibble

**Decorations:** style, non-blocking

![quibble](https://img.shields.io/badge/quibble-style,non--blocking-277da1?color=277da1)

```markdown
![quibble](https://img.shields.io/badge/quibble-style,non--blocking-277da1?color=277da1)
```

---

## With Decorations

### Examples with Common Decorations

### Blocking security suggestion

**Label:** suggestion
**Decorations:** security, blocking

![suggestion](https://img.shields.io/badge/suggestion-security,blocking-577590?color=577590)

```markdown
![suggestion](https://img.shields.io/badge/suggestion-security,blocking-577590?color=577590)
```

---

### Non-blocking UX issue

**Label:** issue
**Decorations:** ux, non-blocking

![issue](https://img.shields.io/badge/issue-ux,non--blocking-f9c74f?color=f9c74f)

```markdown
![issue](https://img.shields.io/badge/issue-ux,non--blocking-f9c74f?color=f9c74f)
```

---

### Test suggestion (if-minor)

**Label:** suggestion
**Decorations:** test, if-minor

![suggestion](https://img.shields.io/badge/suggestion-test,if--minor-577590?color=577590)

```markdown
![suggestion](https://img.shields.io/badge/suggestion-test,if--minor-577590?color=577590)
```

---

### Performance question

**Label:** question
**Decorations:** performance, non-blocking

![question](https://img.shields.io/badge/question-performance,non--blocking-005f73?color=005f73)

```markdown
![question](https://img.shields.io/badge/question-performance,non--blocking-005f73?color=005f73)
```

---

### Accessibility todo

**Label:** todo
**Decorations:** accessibility

![todo](https://img.shields.io/badge/todo-accessibility-e9d8a6?color=e9d8a6)

```markdown
![todo](https://img.shields.io/badge/todo-accessibility-e9d8a6?color=e9d8a6)
```

---

## Color Palette

The following colors are used in the badges:

- **Red**: `#f94144`
- **OrangeRed**: `#f3722c`
- **Orange**: `#f8961e`
- **LightOrange**: `#f9844a`
- **Yellow**: `#f9c74f`
- **LightGreen**: `#90be6d`
- **Teal**: `#43aa8b`
- **DarkTeal**: `#4d908e`
- **BlueGray**: `#577590`
- **Blue**: `#277da1`
- **Black**: `#001219`
- **DarkBlue**: `#005f73`
- **Cyan**: `#0a9396`
- **MintGreen**: `#94d2bd`
- **Cream**: `#e9d8a6`
- **Amber**: `#ee9b00`
- **DarkOrange**: `#ca6702`
- **BurntOrange**: `#bb3e03`
- **DarkRed**: `#ae2012`
- **Burgundy**: `#9b2226`

## Usage

### CLI Usage

```bash
# Generate a badge with decorations
conventional-shields generate praise non-blocking

# Generate with multiple decorations
conventional-shields generate nitpick style non-blocking
```

### Programmatic Usage

```typescript
import { generateConventionalShield } from 'conventional-shields';

const badge = generateConventionalShield({
  label: 'praise',
  decorations: ['non-blocking']
});
```

## Available Labels

- **praise**
- **nitpick**
- **suggestion**
- **issue**
- **todo**
- **question**
- **thought**
- **chore**
- **note**
- **typo**
- **polish**
- **quibble**

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

*Generated on 2025-08-28T09:25:56.059Z*

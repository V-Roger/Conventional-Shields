# Raycast Script Commands for Conventional Shields

This directory contains Raycast script commands that allow you to generate conventional comment badges on the fly using the Conventional Shields library.

## Installation

1. **Add Script Directory to Raycast:**
   - Open Raycast preferences
   - Go to Extensions tab
   - Click the plus button
   - Select "Add Script Directory"
   - Choose this `raycast-scripts` directory

2. **Ensure Project is Built:**
   - The scripts will automatically build the project if needed
   - Make sure you have Node.js installed

## Available Commands

### 1. Generate Conventional Badge

**Command:** `Generate Conventional Badge`

**Description:** Full-featured badge generator with custom labels, decorations, and messages.

**Arguments:**
- **Label** (required): The conventional comment type (praise, suggestion, issue, etc.)
- **Decorations** (optional): Comma-separated list of decorations (security, blocking, etc.)
- **Custom Message** (optional): Custom message that overrides decorations

**Examples:**
```
Label: suggestion
Decorations: security,blocking
Custom Message: (leave empty)
```

```
Label: praise
Decorations: (leave empty)
Custom Message: Great work!
```

### 2. Quick Conventional Badge

**Command:** `Quick Conventional Badge`

**Description:** Fast badge generator with predefined common combinations.

**Arguments:**
- **Quick badge type** (required): Predefined badge type

**Available Quick Types:**

**Main Labels:**
- `praise` - Praise
- `nitpick` - Nitpick
- `suggestion` - Suggestion
- `issue` - Issue
- `todo` - TODO
- `question` - Question
- `thought` - Thought
- `chore` - Chore
- `note` - Note
- `typo` - Typo
- `polish` - Polish
- `quibble` - Quibble

**Common Shortcuts:**
- `bug` - Issue (bug)
- `feature` - Suggestion (feature)
- `security` - Issue (security)
- `performance` - Suggestion (performance)
- `ux` - Suggestion (UX)
- `test` - TODO (test)
- `docs` - Chore (documentation)
- `style` - Nitpick (style)
- `refactor` - Suggestion (refactor)
- `breaking` - Issue (breaking)
- `deprecated` - Chore (deprecated)
- `experimental` - Suggestion (experimental)
- `wip` - TODO (WIP)
- `review` - Question (review)
- `approved` - Praise (approved)
- `rejected` - Issue (rejected)

**Label:Decoration Combinations:**
- `issue:blocking` - Issue with blocking
- `issue:security` - Issue with security
- `issue:bug` - Issue with bug
- `issue:breaking` - Issue with breaking
- `suggestion:performance` - Suggestion with performance
- `suggestion:ux` - Suggestion with UX
- `suggestion:refactor` - Suggestion with refactor
- `suggestion:feature` - Suggestion with feature
- `suggestion:experimental` - Suggestion with experimental
- `todo:test` - TODO with test
- `todo:wip` - TODO with WIP
- `chore:documentation` - Chore with documentation
- `chore:deprecated` - Chore with deprecated
- `nitpick:style` - Nitpick with style
- `praise:approved` - Praise with approved
- `question:review` - Question with review

**Non-blocking Variants:**
- `praise:non-blocking` - Praise (non-blocking)
- `issue:non-blocking` - Issue (non-blocking)
- `suggestion:non-blocking` - Suggestion (non-blocking)
- `todo:non-blocking` - TODO (non-blocking)
- `chore:non-blocking` - Chore (non-blocking)
- `question:non-blocking` - Question (non-blocking)
- `thought:non-blocking` - Thought (non-blocking)
- `note:non-blocking` - Note (non-blocking)

*Note: `nitpick`, `polish`, and `quibble` are inherently non-blocking by nature.*

**Example:**
```
Quick badge type: bug
```

## Usage Examples

### Using the Full Generator

1. Open Raycast (⌘ + Space)
2. Type "Generate Conventional Badge"
3. Enter the label: `suggestion`
4. Enter decorations: `security,blocking`
5. Press Enter

**Result:**
```
✅ Badge generated successfully!

📋 Badge Details:
  Label: suggestion
  Decorations: security, blocking

🔗 Badge URL:
https://img.shields.io/badge/suggestion-security%2Cblocking-ff0000?style=for-the-badge&labelColor=607d8b

📝 Markdown (copied to clipboard):
![suggestion](https://img.shields.io/badge/suggestion-security%2Cblocking-ff0000?style=for-the-badge&labelColor=607d8b)

✅ Markdown copied to clipboard
💡 Tip: The markdown is ready to paste in your documentation!
```

### Using the Quick Generator

1. Open Raycast (⌘ + Space)
2. Type "Quick Conventional Badge"
3. Enter the type: `bug`
4. Press Enter

**Result:**
```
✅ Quick badge generated: bug

📋 Badge Details:
  Type: bug
  Label: issue

🔗 Badge URL:
https://img.shields.io/badge/issue--f9c74f?style=for-the-badge&labelColor=f9c74f

📝 Markdown (copied to clipboard):
![bug](https://img.shields.io/badge/issue--f9c74f?style=for-the-badge&labelColor=f9c74f)

✅ Markdown copied to clipboard
💡 Tip: The markdown is ready to paste in your documentation!
```

## Valid Labels

- `praise` - Praises highlight something positive
- `nitpick` - Nitpicks are trivial preference-based requests
- `suggestion` - Suggestions propose improvements
- `issue` - Issues highlight specific problems
- `todo` - TODO's are small, trivial, but necessary changes
- `question` - Questions for clarification or investigation
- `thought` - Thoughts represent ideas that popped up from reviewing
- `chore` - Chores are simple tasks that must be done
- `note` - Notes highlight something the reader should take note of
- `typo` - Typo comments for misspellings
- `polish` - Polish comments for quality improvements
- `quibble` - Quibbles are very much like nitpicks

## Valid Decorations

- `non-blocking` - Should not prevent acceptance
- `blocking` - Should prevent acceptance until resolved
- `if-minor` - Should resolve only if changes are minor
- `security` - Security-related comment
- `test` - Test-related comment
- `ux` - User experience related
- `performance` - Performance related
- `accessibility` - Accessibility related
- `documentation` - Documentation related
- `style` - Code style related
- `refactor` - Refactoring suggestion
- `bug` - Bug-related
- `feature` - Feature-related
- `breaking` - Breaking change
- `deprecated` - Deprecation related
- `experimental` - Experimental feature
- `wip` - Work in progress
- `draft` - Draft status
- `review` - Review related
- `approved` - Approved status
- `rejected` - Rejected status

## Auto-Coloring

The badges automatically use appropriate colors based on:
- **Label colors**: Based on the comment type
- **Message colors**: Based on the first decoration (or label color if no decorations)

## Clipboard Integration

Both scripts automatically copy the generated markdown to your clipboard:
- **macOS**: Uses `pbcopy`
- **Linux**: Uses `xclip` or `xsel`
- **Fallback**: Shows manual copy instructions if clipboard tools aren't available

The markdown is ready to paste immediately into:
- GitHub README files
- Documentation
- Code review comments
- Project wikis
- Any markdown editor

## Troubleshooting

### Node.js Not Found
- Ensure Node.js is installed and in your PATH
- The scripts require Node.js 18.0.0 or higher

### Build Errors
- The scripts will automatically attempt to build the project
- If build fails, manually run `npm run build` in the project root

### Invalid Arguments
- Check the valid labels and decorations lists above
- Use the quick badge generator for common combinations

## Integration

These badges can be used in:
- GitHub README files
- Documentation
- Code review comments
- Project wikis
- Any markdown or HTML content

The generated URLs point to Shields.io static badge images that will automatically update when the badge parameters change.

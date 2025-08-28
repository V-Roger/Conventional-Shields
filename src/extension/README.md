# Conventional Comments Badges Browser Extension

A browser extension that adds conventional comment badges to GitHub Pull Request review comments, making code reviews more structured and visually appealing.

## Features

- 🎯 **Conventional Comments Support**: All 12 conventional comment types (praise, suggestion, issue, etc.)
- 🏷️ **Decoration Tags**: 21 different decoration tags for additional context
- 👀 **Live Preview**: See how your badge will look before inserting
- ⚡ **Quick Badges**: One-click insertion of common badge types
- 🎨 **GitHub Integration**: Seamlessly integrates with GitHub's comment interface
- 🌙 **Dark Mode Support**: Works with GitHub's dark theme
- 📱 **Responsive Design**: Works on desktop and mobile browsers

## Installation

### Chrome/Edge/Brave

1. **Download the Extension**

   ```bash
   # Clone or download this repository
   git clone <repository-url>
   cd Conventional-Shields/extension
   ```

2. **Load Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `extension` folder from this repository

3. **Verify Installation**
   - You should see "Conventional Comments Badges" in your extensions list
   - The extension icon should appear in your browser toolbar

### Firefox

1. **Package the Extension**
2. 
   ```bash
   # Install web-ext if you haven't already
   npm install -g web-ext
   
   # Build the extension
   web-ext build
   ```

3. **Install in Firefox**
   - Go to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select the `.zip` file created by web-ext

## Usage

### Basic Usage

1. **Navigate to a GitHub Pull Request**
   - Go to any GitHub repository
   - Open a Pull Request
   - Scroll to the "Files changed" tab

2. **Add a Review Comment**
   - Click the "+" button next to any line number
   - Or click "Add review comment" at the bottom

3. **Use the Badge Selector**
   - You'll see a new "Conventional Comments Badges" section above the comment box
   - Select your comment type (praise, suggestion, issue, etc.)
   - Choose relevant decorations (non-blocking, security, performance, etc.)
   - Preview your badge in real-time
   - Click "Insert Badge" to add it to your comment

4. **Complete Your Comment**
   - Add your detailed comment text
   - Submit the review comment

### Quick Badges

1. **Open the Extension Popup**
   - Click the extension icon in your browser toolbar
   - You'll see a popup with quick badge options

2. **Insert Quick Badges**
   - Click any quick badge button (Praise, Suggestion, Issue, etc.)
   - The badge will be automatically inserted into the active comment form
   - Perfect for common comment types

### Badge Types

| Type | Description | Color |
|------|-------------|-------|
| **praise** | Highlight something positive | Green |
| **nitpick** | Trivial preference-based requests | Mint |
| **suggestion** | Propose improvements | Blue |
| **issue** | Highlight specific problems | Yellow |
| **todo** | Small, trivial, but necessary changes | Cream |
| **question** | For clarification or investigation | Dark Blue |
| **thought** | Ideas that popped up from reviewing | Cyan |
| **chore** | Simple tasks that must be done | Orange |
| **note** | Highlight something to take note of | Black |
| **typo** | Misspellings | Orange |
| **polish** | Quality improvements | Mint |
| **quibble** | Very much like nitpicks | Mint |

### Decorations

Common decorations for additional context:

- **non-blocking** / **blocking** - Should not/should prevent acceptance
- **security** - Security-related comment
- **performance** - Performance-related comment
- **ux** - User experience related
- **test** - Test-related comment
- **documentation** - Documentation related
- **style** - Code style related
- **bug** - Bug-related
- **feature** - Feature-related
- **refactor** - Refactoring suggestion
- **accessibility** - Accessibility related
- **breaking** - Breaking change
- **deprecated** - Deprecation related
- **experimental** - Experimental feature
- **wip** - Work in progress
- **draft** - Draft status
- **review** - Review related
- **approved** - Approved status
- **rejected** - Rejected status
- **if-minor** - Should resolve only if changes are minor

## Examples

### Basic Badges
```
![praise](https://img.shields.io/badge/praise-90be6d?style=for-the-badge&labelColor=90be6d)
![suggestion](https://img.shields.io/badge/suggestion-277da1?style=for-the-badge&labelColor=277da1)
![issue](https://img.shields.io/badge/issue-f9c74f?style=for-the-badge&labelColor=f9c74f)
```

### Decorated Badges
```
![suggestion-performance](https://img.shields.io/badge/suggestion-performance-bb3e03?style=for-the-badge&labelColor=277da1)
![issue-security,blocking](https://img.shields.io/badge/issue-security,blocking-9b2226?style=for-the-badge&labelColor=f9c74f)
![question-ux](https://img.shields.io/badge/question-ux-94d2bd?style=for-the-badge&labelColor=005f73)
```

## Settings

Access settings through the extension popup:

- **Auto-insert badge at cursor position**: Automatically place badges at the current cursor position
- **Show badge preview**: Display a live preview of the selected badge

## Troubleshooting

### Extension Not Working

1. **Check if you're on GitHub**
   - The extension only works on `github.com` domains
   - Make sure you're on a Pull Request page

2. **Refresh the Page**
   - Sometimes the extension needs a page refresh to initialize
   - Try refreshing the GitHub page

3. **Check Extension Status**
   - Click the extension icon to see the status
   - Should show "Active on Pull Request" when working

4. **Reinstall Extension**
   - Go to `chrome://extensions/`
   - Remove the extension
   - Load it again using "Load unpacked"

### Badge Not Appearing

1. **Check Comment Form**
   - Make sure you're in a comment form (not a regular text area)
   - Look for the "Conventional Comments Badges" section above the text area

2. **Check Console for Errors**
   - Open Developer Tools (F12)
   - Check the Console tab for any error messages

### Styling Issues

1. **Dark Mode**
   - The extension supports GitHub's dark theme
   - If colors look wrong, try switching GitHub's theme

2. **Mobile View**
   - The interface adapts to smaller screens
   - Some features may be more compact on mobile

## Development

### Project Structure
```
extension/
├── manifest.json          # Extension configuration
├── content.js            # Main content script
├── styles.css            # Styles for badge selector
├── popup.html            # Extension popup interface
├── popup.css             # Popup styles
├── popup.js              # Popup functionality
├── icons/                # Extension icons
└── README.md             # This file
```

### Building for Distribution

1. **Create Icons**
   - Add icon files to the `icons/` directory
   - See `icons/README.md` for requirements

2. **Test the Extension**
   - Load in browser and test all features
   - Test on different GitHub pages

3. **Package for Chrome Web Store**
   - Zip the extension folder
   - Submit to Chrome Web Store

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This extension is licensed under the same license as the main project (CC-BY-SA-4.0).

## Support

- **Issues**: Report bugs on the main repository
- **Feature Requests**: Open an issue with the "enhancement" label
- **Questions**: Check the main project's documentation first

## Related Projects

- [Conventional Comments](https://conventionalcomments.org/) - The specification this extension implements
- [Shields.io](https://shields.io/) - The badge service used
- [Conventional Shields](https://github.com/V-Roger/conventional-shields) - The main library this extension is based on

#!/usr/bin/env node

/**
 * Build script for Conventional Comments Badges Extension
 * Bundles the compiled TypeScript and creates distributable package
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ExtensionBuilder {
  constructor() {
    this.extensionDir = __dirname;
    this.distDir = path.join(this.extensionDir, 'dist');
    this.version = this.getVersion();
  }

  getVersion() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(this.extensionDir, '..', '..', 'package.json'), 'utf8'));
      return packageJson.version;
    } catch (error) {
      console.warn('Could not read version from package.json, using 1.0.0');
      return '1.0.0';
    }
  }

  async build() {
    console.log('🚀 Building Conventional Comments Badges Extension...');
    console.log(`📦 Version: ${this.version}`);

    try {
      // Check if TypeScript compilation was successful
      this.checkTypeScriptCompilation();

      // Bundle extension files
      this.bundleExtension();

      // Update manifest version
      this.updateManifestVersion();

      // Create zip file
      this.createZipFile();

      console.log('✅ Build completed successfully!');
      console.log(`📁 Extension package: ${this.distDir}/conventional-comments-badges-${this.version}.zip`);
      console.log(`📁 Extension files: ${this.distDir}/`);
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }

  checkTypeScriptCompilation() {
    const compiledContentPath = path.join(this.distDir, 'extension', 'content.js');
    if (!fs.existsSync(compiledContentPath)) {
      throw new Error('TypeScript compilation failed. Run "npm run build:tsc" first.');
    }
    console.log('✅ TypeScript compilation verified');
  }

  bundleExtension() {
    console.log('📦 Bundling extension files...');

    // Copy static files
    const staticFiles = [
      'manifest.json',
      'styles.css',
      'popup.html',
      'popup.css',
      'popup.js'
    ];

    staticFiles.forEach(file => {
      const sourcePath = path.join(this.extensionDir, file);
      const destPath = path.join(this.distDir, file);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`📄 Copied ${file}`);
      } else {
        console.warn(`⚠️  Warning: ${file} not found`);
      }
    });

    // Process compiled content script
    this.processContentScript();

    // Copy icons directory if it exists
    const iconsDir = path.join(this.extensionDir, 'icons');
    const destIconsDir = path.join(this.distDir, 'icons');
    
    if (fs.existsSync(iconsDir)) {
      this.copyDirectory(iconsDir, destIconsDir);
      console.log('📁 Copied icons directory');
    } else {
      console.warn('⚠️  Warning: icons directory not found');
    }

    // Copy README
    const readmePath = path.join(this.extensionDir, 'README.md');
    if (fs.existsSync(readmePath)) {
      fs.copyFileSync(readmePath, path.join(this.distDir, 'README.md'));
      console.log('📄 Copied README.md');
    }
  }

  processContentScript() {
    console.log('🔧 Processing content script...');

    const compiledContentPath = path.join(this.distDir, 'extension', 'content.js');
    const finalContentPath = path.join(this.distDir, 'content.js');

    if (fs.existsSync(compiledContentPath)) {
      let content = fs.readFileSync(compiledContentPath, 'utf8');

      // Remove import statements and replace with inline code
      content = this.inlineDependencies(content);

      // The TypeScript compilation already includes the initialization code
      // No need to add it again

      fs.writeFileSync(finalContentPath, content);
      console.log('✅ Content script processed');
    } else {
      console.error('❌ Compiled content script not found');
      throw new Error('Content script compilation failed');
    }
  }

  inlineDependencies(content) {
    // Remove import statements
    content = content.replace(/import\s+.*?from\s+['"][^'"]+['"];?\s*/g, '');

    // Add the generator functions inline
    const generatorCode = this.getGeneratorCode();
    content = generatorCode + '\n\n' + content;

    return content;
  }

  getGeneratorCode() {
    return `// Conventional Comments Badges Extension
// Content script for GitHub PR review comments

// Import the palette and generator functions from the main library
const PALETTE = {
  "colors": [
    {"name": "Burgundy", "hex": "#9b2226"},
    {"name": "Red", "hex": "#f94144"},
    {"name": "BurntOrange", "hex": "#bb3e03"},
    {"name": "DarkOrange", "hex": "#ca6702"},
    {"name": "Orange", "hex": "#f8961e"},
    {"name": "Yellow", "hex": "#f9c74f"},
    {"name": "Cream", "hex": "#e9d8a6"},
    {"name": "MintGreen", "hex": "#94d2bd"},
    {"name": "Cyan", "hex": "#0a9396"},
    {"name": "LightGreen", "hex": "#90be6d"},
    {"name": "BlueGray", "hex": "#577590"},
    {"name": "Blue", "hex": "#277da1"},
    {"name": "DarkBlue", "hex": "#005f73"},
    {"name": "Black", "hex": "#001219"}
  ]
};

// Create color LUT from config palette
const colorLUT = {};
PALETTE.colors.forEach(color => {
  colorLUT[color.name] = color.hex;
});

// Color mapping for conventional comment labels using LUT
const labelColors = {
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
const decorationColors = {
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

// URL encoding helper for badge content
function encodeBadgeContent(content) {
  return content
    .replace(/-/g, '--')  // Double dash for dash
    .replace(/_/g, '__')  // Double underscore for underscore
    .replace(/\\s/g, '_'); // Single underscore for space
}

// Remove '#' from hex colors for Shields.io compatibility
function normalizeColor(color) {
  return color.startsWith('#') ? color.slice(1) : color;
}

// Generate badge URL based on Shields.io static badge API
function generateBadge(options) {
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
function generateConventionalShield(options) {
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
}`;
  }

  copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    const files = fs.readdirSync(source);
    files.forEach(file => {
      const sourcePath = path.join(source, file);
      const destPath = path.join(destination, file);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        this.copyDirectory(sourcePath, destPath);
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    });
  }

  updateManifestVersion() {
    const manifestPath = path.join(this.distDir, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    manifest.version = this.version;
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`🔢 Updated manifest version to ${this.version}`);
  }

  createZipFile() {
    const zipFileName = `conventional-comments-badges-${this.version}.zip`;
    const zipPath = path.join(this.distDir, zipFileName);

    try {
      // Use zip command if available
      execSync(`cd "${this.distDir}" && zip -r "${zipFileName}" . -x "*.zip"`, { stdio: 'inherit' });
      console.log(`📦 Created zip file: ${zipFileName}`);
    } catch (error) {
      console.warn('⚠️  zip command not available, skipping zip creation');
      console.log('📁 Extension files are ready in the dist directory');
    }
  }
}

// Run the build
if (require.main === module) {
  const builder = new ExtensionBuilder();
  builder.build();
}

module.exports = ExtensionBuilder;

#!/usr/bin/env node

/**
 * Build script for the Conventional Comments Badges Extension with bundled dependencies
 * Run from the root directory: node scripts/build-extension-bundled.js
 * 
 * This script:
 * 1. Compiles TypeScript to JavaScript
 * 2. Bundles lib/index.js content into content.js
 * 3. Removes the import statement and replaces it with the actual code
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Conventional Comments Badges Extension (bundled)...');

try {
  // Change to extension directory
  const extensionDir = path.join(__dirname, '..', 'src', 'extension');
  process.chdir(extensionDir);

  // Install dependencies if needed
  console.log('📦 Installing dependencies...');
  execSync('pnpm install', { stdio: 'inherit' });

  // Build the extension with TypeScript
  console.log('🔧 Building extension with TypeScript...');
  execSync('pnpm run build', { stdio: 'inherit' });

  // Bundle the lib content into content.js
  console.log('📦 Bundling lib content into content.js...');
  bundleContent(extensionDir);

  console.log('✅ Extension build completed successfully!');
  console.log(`📁 Extension files: ${extensionDir}/dist/`);
  console.log('📝 To load in Chrome:');
  console.log('   1. Open chrome://extensions/');
  console.log('   2. Enable "Developer mode"');
  console.log('   3. Click "Load unpacked"');
  console.log(`   4. Select: ${extensionDir}/dist/`);

} catch (error) {
  console.error('❌ Extension build failed:', error.message);
  process.exit(1);
}

function bundleContent(extensionDir) {
  const distDir = path.join(extensionDir, 'dist');
  const contentJsPath = path.join(distDir, 'content.js');
  const libIndexPath = path.join(distDir, 'lib', 'index.js');
  const paletteJsonPath = path.join(distDir, 'lib', 'config', 'palette.json');

  // Read the files
  let contentJs = fs.readFileSync(contentJsPath, 'utf8');
  let libIndex = fs.readFileSync(libIndexPath, 'utf8');
  const paletteJson = fs.readFileSync(paletteJsonPath, 'utf8');

  // Remove the import statement
  contentJs = contentJs.replace(/import \* as ConventionalShields from '\.\/lib\/index\.js';?\s*/, '');

  // Replace the require statement for palette.json with inline JSON
  libIndex = libIndex.replace(
    /const palette_json_1 = __importDefault\(require\("\.\/config\/palette\.json"\)\);/,
    `const palette_json_1 = { default: ${paletteJson} };`
  );

  // Extract the lib content and make it available as ConventionalShields
  const bundledContent = `
// Bundled ConventionalShields library
const ConventionalShields = (function() {
  // Create a module-like object
  const exports = {};
  
  ${libIndex}
  
  return exports;
})();

${contentJs}
`;

  // Write the bundled content back to content.js
  fs.writeFileSync(contentJsPath, bundledContent);

  // Remove the lib directory since it's no longer needed
  if (fs.existsSync(path.join(distDir, 'lib'))) {
    fs.rmSync(path.join(distDir, 'lib'), { recursive: true, force: true });
  }

  console.log('✅ Successfully bundled lib content into content.js');
}

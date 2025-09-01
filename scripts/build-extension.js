#!/usr/bin/env node

/**
 * Build script for the Conventional Comments Badges Extension
 * Run from the root directory: node scripts/build-extension.js
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Building Conventional Comments Badges Extension...');

try {
  // Change to extension directory
  const extensionDir = path.join(__dirname, '..', 'src', 'extension');
  process.chdir(extensionDir);

  // Install dependencies if needed
  console.log('📦 Installing dependencies...');
  execSync('pnpm install', { stdio: 'inherit' });

  // Build the extension
  console.log('🔧 Building extension...');
  execSync('pnpm run build', { stdio: 'inherit' });

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

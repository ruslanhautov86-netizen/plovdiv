const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = __dirname;
const buildDir = 'C:\\Users\\Hauto\\.gemini\\antigravity\\brain\\c2f21e42-d2cc-422c-bf0e-077dac66f292\\temp_build';

console.log('Cleaning build dir...');
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir, { recursive: true });

const filesToCopy = ['src', 'public', 'package.json', 'package-lock.json', 'tsconfig.json', 'next.config.ts', 'next-env.d.ts', 'postcss.config.mjs', 'eslint.config.mjs', 'components.json', 'tailwind.config.ts'];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    fs.copyFileSync(src, dest);
  }
}

console.log('Copying files...');
for (const item of filesToCopy) {
  const srcPath = path.join(srcDir, item);
  if (fs.existsSync(srcPath)) {
    copyRecursiveSync(srcPath, path.join(buildDir, item));
  }
}

console.log('Installing dependencies in clean path...');
execSync('npm install', { cwd: buildDir, stdio: 'inherit' });

console.log('Building Next.js app...');
execSync('npm run build', { cwd: buildDir, stdio: 'inherit' });

console.log('Copying out folder back to original directory...');
const outDirSrc = path.join(buildDir, 'out');
const outDirDest = path.join(srcDir, 'out');
if (fs.existsSync(outDirDest)) {
  fs.rmSync(outDirDest, { recursive: true, force: true });
}
copyRecursiveSync(outDirSrc, outDirDest);

console.log('Cleaning up temporary folder...');
fs.rmSync(buildDir, { recursive: true, force: true });

console.log('Done! Static files generated in out/ folder.');

$ErrorActionPreference = 'Stop'

if (-not (Test-Path 'node_modules')) {
  Write-Host 'Installing dependencies...'
  npm install
}

Write-Host 'Deploying to GitHub Pages...'
npm run deploy


$ErrorActionPreference = 'Stop'

if (-not (Test-Path 'node_modules')) {
  Write-Host 'Installing dependencies...'
  npm install
}

Write-Host 'Starting development server...'
npm run dev


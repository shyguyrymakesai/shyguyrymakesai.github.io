$ErrorActionPreference = 'Stop'

if (-not (Test-Path 'node_modules')) {
  Write-Host 'Installing dependencies...'
  npm install
}

Write-Host 'Deploying to GitHub Pages...'
npm run deploy

Write-Host 'Starting comments backend server...'
cd comments-backend
if (-not (Test-Path 'node_modules')) {
  Write-Host 'Installing backend dependencies...'
  npm install
}
npm start
cd ..


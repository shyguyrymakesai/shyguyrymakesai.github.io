#!/bin/bash
set -e

# Install dependencies if node_modules does not exist
if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build and deploy to GitHub Pages
npm run deploy


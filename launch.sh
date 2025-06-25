#!/bin/bash
set -e

# Install dependencies if node_modules does not exist
if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
npm run dev


#!/bin/bash

# DigitalOcean Build Script for AETC 2026 App
echo "🚀 Starting DigitalOcean build process..."

# Verify Node.js version
echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"

# Clean install to ensure package-lock.json is in sync
echo "🧹 Cleaning previous installations..."
rm -rf node_modules package-lock.json

# Install dependencies with clean cache
echo "📦 Installing dependencies..."
npm cache clean --force
npm install --no-optional

# Build the application
echo "🔨 Building application..."
npm run build

# Verify build
if [ -d ".next" ]; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed"
    exit 1
fi

echo "🎉 DigitalOcean build process completed!"

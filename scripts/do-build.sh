#!/bin/bash

# DigitalOcean Build Script for AETC 2026 App
echo "🚀 Starting DigitalOcean build process..."

# Verify Node.js version
echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"

# Check if we need to update npm
NODE_VERSION=$(node --version | cut -d'v' -f2)
NPM_VERSION=$(npm --version)

echo "🔍 Node.js: $NODE_VERSION, NPM: $NPM_VERSION"

# If Node.js is 20.0.0 or lower, we need to handle npm compatibility
if [[ "$NODE_VERSION" == "20.0.0" ]]; then
    echo "⚠️  Node.js 20.0.0 detected, using npm install instead of npm ci"
    BUILD_CMD="npm install"
else
    echo "✅ Using npm ci for faster install"
    BUILD_CMD="npm ci"
fi

# Clean install to ensure package-lock.json is in sync
echo "🧹 Cleaning previous installations..."
rm -rf node_modules

# Install dependencies
echo "📦 Installing dependencies with $BUILD_CMD..."
npm cache clean --force
$BUILD_CMD

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

#!/bin/bash

# DigitalOcean Build Script for AETC 2026 App
echo "🚀 Starting DigitalOcean build process..."

# Set Node.js version
export NODE_VERSION=18.20.4

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js $NODE_VERSION..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Verify Node.js version
echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

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

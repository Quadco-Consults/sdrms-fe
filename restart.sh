#!/bin/bash

echo "🧹 Cleaning Next.js cache..."
rm -rf .next
rm -rf .turbopack
rm -rf node_modules/.cache

echo "✅ Cache cleared!"
echo ""
echo "🚀 Starting development server..."
echo "   Navigate to: http://localhost:3000"
echo ""
npm run dev

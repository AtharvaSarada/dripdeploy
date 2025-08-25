#!/bin/bash

# DripNest E-commerce Deployment Script
# This script helps you prepare your application for deployment

echo "🚀 DripNest Deployment Setup"
echo "=============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server .env file..."
    cp server/env.example server/.env
    echo "✅ Server .env file created. Please update it with your configuration."
fi

if [ ! -f "client/.env" ]; then
    echo "📝 Creating client .env file..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > client/.env
    echo "✅ Client .env file created."
fi

# Check dependencies
echo "📦 Checking dependencies..."

cd server
if [ ! -d "node_modules" ]; then
    echo "Installing server dependencies..."
    npm install
fi
cd ..

cd client
if [ ! -d "node_modules" ]; then
    echo "Installing client dependencies..."
    npm install
fi
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update server/.env with your configuration"
echo "2. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for deployment'"
echo "   git push"
echo ""
echo "3. Follow the deployment guide in DEPLOYMENT.md"
echo ""
echo "🔗 Quick links:"
echo "- Render (Backend): https://render.com"
echo "- Vercel (Frontend): https://vercel.com"
echo "- MongoDB Atlas: https://www.mongodb.com/atlas"
echo "- Cloudinary: https://cloudinary.com"
echo ""
echo "📖 Full deployment guide: DEPLOYMENT.md"

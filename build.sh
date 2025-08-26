#!/bin/bash
echo "Current directory: $(pwd)"
echo "Listing contents:"
ls -la
echo "Changing to client directory..."
cd client
echo "Client directory: $(pwd)"
echo "Installing dependencies..."
npm install --force
echo "Building React app..."
npm run build
echo "Build completed!"

#!/bin/bash
echo "Starting build in client directory..."
npm install --force
npm run build
echo "Build completed!"

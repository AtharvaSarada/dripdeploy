#!/bin/bash
echo "=== DEBUG BUILD SCRIPT ==="
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la
echo ""
echo "Looking for client directory:"
find . -name "client" -type d
echo ""
echo "If client directory exists, checking its contents:"
if [ -d "client" ]; then
    echo "Client directory found!"
    cd client
    echo "Client directory contents:"
    ls -la
    echo ""
    echo "Public directory contents:"
    if [ -d "public" ]; then
        ls -la public/
    else
        echo "Public directory not found!"
    fi
else
    echo "Client directory not found!"
fi

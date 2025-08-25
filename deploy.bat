@echo off
echo 🚀 DripNest Deployment Setup
echo ==============================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Please initialize git first:
    echo    git init
    echo    git add .
    echo    git commit -m "Initial commit"
    echo    git remote add origin ^<your-github-repo-url^>
    echo    git push -u origin main
    pause
    exit /b 1
)

REM Check if .env files exist
if not exist "server\.env" (
    echo 📝 Creating server .env file...
    copy "server\env.example" "server\.env"
    echo ✅ Server .env file created. Please update it with your configuration.
)

if not exist "client\.env" (
    echo 📝 Creating client .env file...
    echo REACT_APP_API_URL=http://localhost:5000/api > "client\.env"
    echo ✅ Client .env file created.
)

REM Check dependencies
echo 📦 Checking dependencies...

cd server
if not exist "node_modules" (
    echo Installing server dependencies...
    npm install
)
cd ..

cd client
if not exist "node_modules" (
    echo Installing client dependencies...
    npm install
)
cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo 1. Update server\.env with your configuration
echo 2. Push your code to GitHub:
echo    git add .
echo    git commit -m "Prepare for deployment"
echo    git push
echo.
echo 3. Follow the deployment guide in DEPLOYMENT.md
echo.
echo 🔗 Quick links:
echo - Render (Backend): https://render.com
echo - Vercel (Frontend): https://vercel.com
echo - MongoDB Atlas: https://www.mongodb.com/atlas
echo - Cloudinary: https://cloudinary.com
echo.
echo 📖 Full deployment guide: DEPLOYMENT.md
echo Quick start guide: QUICK_START.md
pause

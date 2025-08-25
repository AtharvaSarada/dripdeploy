# DripNest E-commerce Deployment Guide

This guide will help you deploy your DripNest e-commerce application for client showcasing.

## 🚀 Quick Deploy Options

### Option 1: Render + Vercel (Recommended - Free)
- **Backend**: Render (free tier)
- **Frontend**: Vercel (free tier)
- **Database**: MongoDB Atlas (free tier)
- **File Storage**: Cloudinary (free tier)

### Option 2: Railway + Vercel (Alternative - Free)
- **Backend**: Railway (free tier)
- **Frontend**: Vercel (free tier)
- **Database**: MongoDB Atlas (free tier)

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **MongoDB Atlas Account** - Free cloud database
3. **Cloudinary Account** - Free image hosting
4. **Stripe Account** - For payment processing (test mode is fine)

## 🔧 Step-by-Step Deployment

### 1. Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Get your connection string
6. Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

### 2. Image Storage Setup (Cloudinary)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Get your Cloud Name, API Key, and API Secret
4. Update your server code to use Cloudinary instead of local uploads

### 3. Backend Deployment (Render)

1. Go to [Render](https://render.com/)
2. Sign up with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `dripnest-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run render-build`
   - **Start Command**: `npm start`
   - **Branch**: `main` (or your default branch)

6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=https://your-backend-url.onrender.com/api/auth/google/callback
   CLIENT_URL=https://your-frontend-url.vercel.app
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

7. Deploy the service

### 4. Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com/)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

6. Add Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

7. Deploy the project

### 5. Update CORS Settings

Make sure your backend allows requests from your frontend domain:

```javascript
// In server/src/index.ts
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
```

## 🛠️ Local Development Setup

### Backend
```bash
cd server
npm install
cp env.example .env
# Edit .env with your local settings
npm run dev
```

### Frontend
```bash
cd client
npm install
npm start
```

## 📝 Environment Variables Reference

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dripnest
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔍 Testing Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test API endpoints at `your-backend-url.onrender.com/api/health`
3. **Database**: Check if data is being saved in MongoDB Atlas
4. **File Uploads**: Test image uploads through Cloudinary

## 🚨 Common Issues & Solutions

### CORS Errors
- Ensure `CLIENT_URL` is set correctly in backend environment variables
- Check that the frontend URL matches exactly

### Database Connection Issues
- Verify MongoDB Atlas connection string
- Check IP whitelist settings
- Ensure database user has correct permissions

### Build Failures
- Check that all dependencies are in package.json
- Verify TypeScript compilation
- Check for missing environment variables

### Image Upload Issues
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper CORS settings

## 📊 Monitoring & Analytics

### Render Dashboard
- Monitor backend performance
- Check logs for errors
- Monitor resource usage

### Vercel Dashboard
- Monitor frontend performance
- Check build status
- View analytics

### MongoDB Atlas
- Monitor database performance
- Check connection status
- View query analytics

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **JWT Secrets**: Use strong, unique secrets
3. **API Keys**: Rotate keys regularly
4. **CORS**: Only allow necessary origins
5. **Rate Limiting**: Implement on production

## 📞 Support

If you encounter issues:
1. Check the logs in your deployment platform
2. Verify all environment variables are set
3. Test locally first
4. Check the documentation for each service

## 🎉 Success!

Once deployed, you'll have:
- ✅ Live e-commerce website
- ✅ Secure payment processing
- ✅ User authentication
- ✅ Admin dashboard
- ✅ Product management
- ✅ Order tracking
- ✅ Image hosting

Your clients can now access your application at the Vercel URL!

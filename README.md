# 🛍️ DripNest E-commerce Platform

A modern, full-stack e-commerce application built with React, Node.js, and MongoDB. Perfect for showcasing to clients with a professional, feature-rich online store.

## ✨ Features

- **🛒 Complete E-commerce**: Product catalog, shopping cart, checkout, order management
- **👤 User Management**: Registration, login, profiles, wishlists
- **💳 Payment Processing**: Stripe integration for secure payments
- **🔐 Authentication**: JWT-based auth with Google OAuth support
- **📱 Responsive Design**: Modern UI with Tailwind CSS and Framer Motion
- **⚡ Admin Dashboard**: Product management, order tracking, analytics
- **🖼️ Image Management**: Cloudinary integration for product images
- **📊 Analytics**: Sales reports, inventory tracking, user insights

## 🚀 Quick Deployment

### Option 1: One-Click Deploy (Recommended)
1. **Push to GitHub**: Your code is already committed and ready
2. **Deploy Backend**: Use Render (free tier)
3. **Deploy Frontend**: Use Vercel (free tier)
4. **Set up Database**: MongoDB Atlas (free tier)

### Option 2: Manual Setup
Follow the detailed guide in `DEPLOYMENT.md`

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account (free)
- Cloudinary account (free)
- Stripe account (free test mode)

## 🔧 Local Development

### Backend
```bash
cd server
npm install
cp env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend
```bash
cd client
npm install
npm start
```

## 🌐 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Render        │    │   MongoDB Atlas │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   React App     │    │   Node.js API   │    │   Cloud DB      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cloudinary    │    │   Stripe        │    │   Google OAuth  │
│   (Images)      │    │   (Payments)    │    │   (Auth)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
dripnest/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # MongoDB models
│   │   └── routes/        # API routes
│   └── scripts/           # Utility scripts
└── docs/                  # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **React Query** - Data fetching
- **React Hook Form** - Form handling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Stripe** - Payments
- **Cloudinary** - Image storage

## 🔑 Environment Variables

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

## 🚀 Deployment Steps

### 1. Database Setup (MongoDB Atlas)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create cluster (free tier)
3. Get connection string
4. Add IP whitelist: `0.0.0.0/0`

### 2. Image Storage (Cloudinary)
1. Create free account at [Cloudinary](https://cloudinary.com/)
2. Get Cloud Name, API Key, API Secret

### 3. Backend Deployment (Render)
1. Go to [Render](https://render.com/)
2. Connect GitHub repository
3. Create Web Service
4. Set build command: `npm install && npm run render-build`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

### 4. Frontend Deployment (Vercel)
1. Go to [Vercel](https://vercel.com/)
2. Import GitHub repository
3. Set root directory: `client`
4. Add environment variable: `REACT_APP_API_URL`
5. Deploy

## 📊 Admin Features

- **Dashboard**: Sales analytics, order overview
- **Products**: Add, edit, delete products
- **Orders**: Track and manage orders
- **Users**: Manage customer accounts
- **Analytics**: Sales reports and insights

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation
- Secure payment processing

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Fast loading times

## 🎨 UI/UX Features

- Modern, clean design
- Smooth animations
- Intuitive navigation
- Search and filtering
- Wishlist functionality
- Size and color selection
- Real-time cart updates

## 📈 Performance

- Optimized images
- Lazy loading
- Code splitting
- Caching strategies
- CDN integration

## 🧪 Testing

- API endpoint testing
- Component testing
- User flow testing
- Payment testing (Stripe test mode)

## 📞 Support

For deployment help:
1. Check `DEPLOYMENT.md` for detailed guide
2. Check `QUICK_START.md` for quick setup
3. Verify environment variables
4. Check deployment platform logs

## 🎉 Success Metrics

Once deployed, you'll have:
- ✅ Professional e-commerce website
- ✅ Secure payment processing
- ✅ User authentication system
- ✅ Admin dashboard
- ✅ Product management
- ✅ Order tracking
- ✅ Mobile-responsive design
- ✅ Fast loading times

## 📄 License

MIT License - feel free to use for client projects!

---

**Ready to showcase to clients?** Follow the deployment guide and get your e-commerce site live in minutes! 🚀

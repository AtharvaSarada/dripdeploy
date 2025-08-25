# DripNest E-commerce Setup Guide

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Google Cloud Console** account (for OAuth)
- **Stripe** account (for payments)

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

### 2. Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```bash
# Copy the example file
cp server/env.example server/.env
```

Fill in the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dripnest

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-stripe-webhook-secret

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

#### Frontend Environment Variables

Create a `.env` file in the `client/` directory:

```bash
# Create .env file
touch client/.env
```

Add the following:

```env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add authorized origins:
   - `http://localhost:3000`
   - `http://localhost:5000`
6. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `http://localhost:5000/api/auth/google/callback`
7. Copy the Client ID and Client Secret to your environment variables

### 4. Stripe Setup

1. Create a [Stripe account](https://stripe.com/)
2. Go to the Dashboard and get your API keys
3. Use test keys for development:
   - Publishable key: `pk_test_...`
   - Secret key: `sk_test_...`
4. Set up webhooks (optional for development)

### 5. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create a database named `dripnest`

#### Option B: MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URI` in your `.env` file

### 6. Start the Application

```bash
# Start both frontend and backend in development mode
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
dripnest-ecommerce/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── config/        # Configuration files
│   └── uploads/           # File uploads
└── docs/                  # Documentation
```

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run install-all` - Install all dependencies
- `npm run build` - Build the frontend for production

### Backend (server/)
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Frontend (client/)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Features Implemented

### ✅ Completed
- **Backend API** with Express and TypeScript
- **Database Models** for Users, Products, and Orders
- **Authentication** with Google OAuth and JWT
- **Product Management** with CRUD operations
- **Order Management** with status tracking
- **Payment Integration** with Stripe
- **Frontend Structure** with React and TypeScript
- **Modern UI** with Tailwind CSS and Framer Motion
- **Responsive Design** for all devices
- **Shopping Cart** functionality
- **User Authentication** context
- **Route Protection** for authenticated users
- **Admin Routes** for admin-only access

### 🚧 In Progress / Coming Soon
- Complete product catalog implementation
- Shopping cart page
- Checkout process
- Order management pages
- User profile management
- Admin dashboard with analytics
- Product image upload
- Email notifications
- Advanced search and filtering
- Product reviews system
- Wishlist functionality

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (admin)

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/confirm` - Confirm payment

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check your connection string
   - Verify network access for Atlas

2. **Google OAuth Error**
   - Verify Client ID and Secret
   - Check authorized origins and redirect URIs
   - Ensure Google+ API is enabled

3. **Stripe Payment Error**
   - Use test keys for development
   - Check webhook configuration
   - Verify payment method setup

4. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes on the port

### Getting Help

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check the API documentation for endpoint details

## Next Steps

1. **Complete the Frontend Pages**: Implement the remaining pages with full functionality
2. **Add Product Images**: Set up image upload and management
3. **Implement Search**: Add advanced search and filtering
4. **Add Analytics**: Implement admin dashboard with charts
5. **Email Notifications**: Set up order confirmation emails
6. **Testing**: Add unit and integration tests
7. **Deployment**: Deploy to production environment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

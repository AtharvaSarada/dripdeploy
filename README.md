# DripNest - Premium Printed T-Shirt E-commerce Platform

A modern, full-stack e-commerce website for selling premium printed t-shirts with advanced features and beautiful design.

## Features

### Customer Features
- 🛍️ **Product Catalog**: Browse and search through premium t-shirt designs
- 🛒 **Shopping Cart**: Add items, manage quantities, and checkout
- 🔐 **Authentication**: Google OAuth login and registration
- 💳 **Secure Payments**: Stripe integration for safe transactions
- 📱 **Responsive Design**: Works perfectly on all devices
- ⭐ **Product Reviews**: Customer ratings and feedback system
- 📧 **Order Tracking**: Real-time order status updates
- 🎨 **Product Customization**: Size selection and design previews

### Admin Features
- 📊 **Dashboard**: Sales analytics and performance metrics
- 🏷️ **Product Management**: Add, edit, and manage products
- 📦 **Order Management**: Process and track customer orders
- 👥 **Customer Management**: View customer profiles and order history
- 📈 **Inventory Management**: Stock tracking and alerts
- 🎨 **Design Upload**: Easy product image and design management

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Query** for state management
- **Stripe Elements** for payments

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Google OAuth** integration
- **Stripe API** for payments
- **Multer** for file uploads

### Development Tools
- **ESLint** and **Prettier** for code quality
- **Concurrently** for running frontend and backend
- **Nodemon** for development server

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Google OAuth credentials
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dripnest-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in both `server/` and `client/` directories
   - Fill in your environment variables:
     - MongoDB connection string
     - Google OAuth credentials
     - Stripe API keys
     - JWT secret

4. **Start the development servers**
   ```bash
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
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript type definitions
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   └── uploads/           # File uploads
└── docs/                  # Documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (admin)
- `GET /api/orders/:id` - Get order details

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/confirm` - Confirm payment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@dripnest.com or create an issue in the repository.

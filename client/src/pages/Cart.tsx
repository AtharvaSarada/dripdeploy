import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft,
  Truck,
  Shield,
  RefreshCw
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/currency';
import { getSafeImageUrl } from '../utils/imageUtils';

const Cart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getSubtotal, 
    getTotal 
  } = useCart();

  const shippingCost = getSubtotal() >= 2000 ? 0 : 200;
  const total = getTotal() + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8">
              <ShoppingBag className="w-24 h-24 text-secondary-300 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-secondary-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-secondary-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/shop"
                className="btn btn-lg btn-primary inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">
                Shopping Cart
              </h1>
              <p className="text-secondary-600 mt-2">
                {items.length} item{items.length !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                  Cart Items
                </h2>
                
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.product._id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-4 p-4 border border-secondary-200 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={getSafeImageUrl(item.product.images[0])}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-image.jpg';
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-secondary-900 truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-secondary-600">
                              Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="text-lg font-bold text-primary-600 mt-1">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-secondary-300 flex items-center justify-center hover:bg-secondary-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-secondary-300 flex items-center justify-center hover:bg-secondary-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-secondary-600">
                            Total: {formatCurrency(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                Order Summary
              </h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(getSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="border-t border-secondary-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-secondary-900">Total</span>
                    <span className="text-lg font-bold text-primary-600">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {getSubtotal() < 2000 && (
                <div className="mb-6 p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium text-primary-900">
                      Free Shipping
                    </span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((getSubtotal() / 2000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-secondary-600">
                    Add {formatCurrency(2000 - getSubtotal())} more for free shipping
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full btn btn-lg btn-primary mb-4"
              >
                Proceed to Checkout
              </Link>

              {/* Continue Shopping */}
              <Link
                to="/shop"
                className="w-full btn btn-lg btn-outline inline-flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>

              {/* Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-secondary-600">
                  <Truck className="w-4 h-4 text-primary-600" />
                  <span>Free shipping on orders over ₹2000</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-secondary-600">
                  <Shield className="w-4 h-4 text-primary-600" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-secondary-600">
                  <RefreshCw className="w-4 h-4 text-primary-600" />
                  <span>Easy returns and exchanges</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye, X } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { usersApi } from '../services/api';
import toast from 'react-hot-toast';
import { formatCurrency } from '../utils/currency';
import { getSafeImageUrl } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
  showQuickActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showQuickActions = true 
}) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleQuickAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    setShowSizeModal(true);
    // Set default selections
    setSelectedSize(product.sizes[0] || '');
    setSelectedColor(product.colors[0] || '');
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }
    
    addToCart(product, selectedSize, selectedColor, quantity);
    setShowSizeModal(false);
    toast.success(`Added ${product.name} to cart`);
  };

  const handleWishlist = async () => {
    if (!user) {
      toast.error('Please sign in to add items to wishlist');
      return;
    }

    setIsLoading(true);
    try {
      if (isWishlisted) {
        await usersApi.removeFromWishlist(product._id);
        setIsWishlisted(false);
        toast.success('Removed from wishlist');
      } else {
        await usersApi.addToWishlist(product._id);
        setIsWishlisted(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="group bg-white rounded-lg shadow-sm border border-secondary-200 overflow-hidden"
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <Link to={`/product/${product._id}`}>
            <img
              src={getSafeImageUrl(product.images[0])}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
          </Link>

          {/* Discount Badge */}
          {product.discountPercentage && product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discountPercentage}%
            </div>
          )}

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlist}
                disabled={isLoading}
                className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary-50 transition-colors"
              >
                <Heart 
                  className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-secondary-600'}`} 
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickAddToCart}
                disabled={product.stock === 0}
                className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary-50 transition-colors"
              >
                <ShoppingCart className="h-4 w-4 text-secondary-600" />
              </motion.button>

              <Link to={`/product/${product._id}`}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary-50 transition-colors"
                >
                  <Eye className="h-4 w-4 text-secondary-600" />
                </motion.div>
              </Link>
            </div>
          )}

          {/* Stock Status */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h3 className="font-semibold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-secondary-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-secondary-500 ml-1">
              ({product.numReviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-secondary-900">
                {formatCurrency(product.price)}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-sm text-secondary-500 line-through">
                  {formatCurrency(product.comparePrice)}
                </span>
              )}
            </div>

            {/* Category Badge */}
            <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
              {product.category.replace('-', ' ')}
            </span>
          </div>

          {/* Design Info */}
          <div className="mt-2 text-xs text-secondary-600">
            <span className="capitalize">{product.design.type}</span>
            {product.design.placement !== 'front' && (
              <span className="ml-1">• {product.design.placement}</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Size/Color Selection Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900">
                Select Options
              </h3>
              <button
                onClick={() => setShowSizeModal(false)}
                className="text-secondary-400 hover:text-secondary-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Product Info */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={getSafeImageUrl(product.images[0])}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
                />
                <div>
                  <h4 className="font-semibold text-secondary-900">{product.name}</h4>
                  <p className="text-lg font-bold text-primary-600">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-3">
                  Size *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-secondary-300 text-secondary-700 hover:border-secondary-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-3">
                  Color *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-secondary-300 text-secondary-700 hover:border-secondary-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-secondary-300 rounded-lg flex items-center justify-center hover:bg-secondary-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-8 h-8 border border-secondary-300 rounded-lg flex items-center justify-center hover:bg-secondary-50"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-secondary-500 mt-1">
                  {product.stock} items available
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSizeModal(false)}
                  className="flex-1 px-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-secondary-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProductCard;

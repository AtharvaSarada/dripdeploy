import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Star, 
  Truck, 
  Shield, 
  RefreshCw, 
  Heart, 
  Share2, 
  ChevronLeft,
  Loader2,
  MessageSquare,
  Send
} from 'lucide-react';
import { productsApi } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/currency';
import { getSafeImageUrl } from '../utils/imageUtils';
import { toast } from 'react-hot-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct(id!),
    enabled: !!id
  });

  // Add review mutation
  const addReviewMutation = useMutation({
    mutationFn: (review: { rating: number; comment: string }) => 
      productsApi.addReview(id!, review),
    onSuccess: (response) => {
      // Update the product data with the new review
      if (response.data) {
        queryClient.setQueryData(['product', id], { data: response.data });
      }
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      toast.success('Review added successfully!');
      setShowReviewForm(false);
      setReviewRating(5);
      setReviewComment('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to add review');
    }
  });

  const handleAddToCart = () => {
    if (!product?.data) return;

    if (!selectedSize && product.data.sizes.length > 0) {
      toast.error('Please select a size');
      return;
    }

    if (!selectedColor && product.data.colors.length > 0) {
      toast.error('Please select a color');
      return;
    }

    addToCart(
      product.data,
      selectedSize || product.data.sizes[0] || 'M',
      selectedColor || product.data.colors[0] || 'Black',
      quantity
    );

    toast.success('Product added to cart!');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }
    if (!reviewComment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }
    addReviewMutation.mutate({ rating: reviewRating, comment: reviewComment });
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type={interactive ? 'button' : undefined}
        onClick={interactive && onStarClick ? () => onStarClick(i + 1) : undefined}
        className={`${interactive ? 'cursor-pointer' : ''}`}
      >
        <Star
          className={`w-5 h-5 ${
            i < rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      </button>
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product?.data) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h1>
            <p className="text-secondary-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link
              to="/shop"
              className="btn btn-primary inline-flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const productData = product.data;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <nav className="flex items-center space-x-2 text-sm text-secondary-600">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary-600">Shop</Link>
            <span>/</span>
            <span className="text-secondary-900">{productData.name}</span>
          </nav>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-secondary-100 rounded-lg overflow-hidden cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
              {productData.images && productData.images.length > 0 ? (
                <img
                  src={getSafeImageUrl(productData.images[selectedImage])}
                  alt={productData.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary-400">
                  <span>No image available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {productData.images && productData.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productData.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-primary-600'
                        : 'border-secondary-200'
                    }`}
                  >
                    <img
                      src={getSafeImageUrl(image)}
                      alt={`${productData.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Product Header */}
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                {productData.name}
              </h1>
                             <div className="flex items-center space-x-4 mb-4">
                 <div className="flex items-center">
                   {renderStars(productData.rating || 0)}
                   <span className="ml-2 text-sm text-secondary-600">
                     ({productData.reviews?.length || 0} reviews)
                   </span>
                 </div>
                <span className="text-sm text-secondary-500">
                  SKU: {productData.sku || 'N/A'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary-600">
                  {formatCurrency(productData.price)}
                </span>
                {productData.comparePrice && productData.comparePrice > productData.price && (
                  <span className="text-xl text-secondary-500 line-through">
                    {formatCurrency(productData.comparePrice)}
                  </span>
                )}
                {productData.discountPercentage && productData.discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    {productData.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Description</h3>
              <p className="text-secondary-600 leading-relaxed">
                {productData.description}
              </p>
            </div>

            {/* Size Selection */}
            {productData.sizes && productData.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-secondary-300 text-secondary-700 hover:border-primary-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {productData.colors && productData.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-secondary-300 text-secondary-700 hover:border-primary-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-secondary-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-secondary-600 hover:text-secondary-900"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-secondary-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-secondary-600 hover:text-secondary-900"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-secondary-600">
                  {productData.stock || 0} in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={!productData.isActive || (productData.stock || 0) === 0}
                className="btn btn-lg btn-primary flex-1"
              >
                {!productData.isActive || (productData.stock || 0) === 0
                  ? 'Out of Stock'
                  : 'Add to Cart'}
              </button>
              <button className="btn btn-lg btn-outline">
                <Heart className="w-5 h-5" />
              </button>
              <button className="btn btn-lg btn-outline">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-secondary-200">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-primary-600" />
                <div>
                  <p className="font-medium text-secondary-900">Free Shipping</p>
                  <p className="text-sm text-secondary-600">On orders over ₹2000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-primary-600" />
                <div>
                  <p className="font-medium text-secondary-900">Quality Guarantee</p>
                  <p className="text-sm text-secondary-600">30-day money-back</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-6 h-6 text-primary-600" />
                <div>
                  <p className="font-medium text-secondary-900">Easy Returns</p>
                  <p className="text-sm text-secondary-600">Hassle-free returns</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <div className="border-t border-secondary-200 pt-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900">Customer Reviews</h2>
                                     <div className="flex items-center mt-2">
                     <div className="flex items-center mr-4">
                       {renderStars(productData.rating || 0)}
                       <span className="ml-2 text-sm text-secondary-600">
                         {(productData.rating || 0).toFixed(1)} out of 5
                       </span>
                     </div>
                     <span className="text-sm text-secondary-600">
                       ({productData.reviews?.length || 0} reviews)
                     </span>
                   </div>
                </div>
                {user && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Write a Review
                  </button>
                )}
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-secondary-50 rounded-lg p-6 mb-6"
                >
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Write Your Review</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Rating
                      </label>
                      <div className="flex items-center gap-1">
                        {renderStars(reviewRating, true, setReviewRating)}
                        <span className="ml-2 text-sm text-secondary-600">
                          {reviewRating} out of 5
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Your Review
                      </label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Share your thoughts about this product..."
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={addReviewMutation.isPending}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        {addReviewMutation.isPending && (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        <Send className="w-4 h-4" />
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {productData.reviews && productData.reviews.length > 0 ? (
                  productData.reviews.map((review: any) => (
                    <div key={review._id} className="border-b border-secondary-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-semibold">
                              {review.user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-secondary-900">{review.user.name}</p>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                              <span className="text-sm text-secondary-600 ml-2">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-secondary-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                    <p className="text-secondary-600">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            aria-label="Close"
            className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(false);
            }}
          >
            Close
          </button>

          {/* Prev */}
          {productData.images?.length > 1 && (
            <button
              aria-label="Previous image"
              className="absolute left-4 text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev === 0 ? productData.images.length - 1 : prev - 1
                );
              }}
            >
              ‹
            </button>
          )}

          <img
            src={getSafeImageUrl(productData.images[selectedImage])}
            alt={productData.name}
            className="max-w-[95vw] max-h-[85vh] object-contain rounded"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.jpg';
            }}
          />

          {/* Next */}
          {productData.images?.length > 1 && (
            <button
              aria-label="Next image"
              className="absolute right-4 text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev === productData.images.length - 1 ? 0 : prev + 1
                );
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

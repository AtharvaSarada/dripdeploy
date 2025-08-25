import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Star, Loader2 } from 'lucide-react';
import { productsApi } from '../services/api';
import ProductCard from '../components/ProductCard';

const Featured: React.FC = () => {
  const { data: featuredProducts, isLoading, error } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productsApi.getFeaturedProducts(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Featured Products</h1>
            <p className="text-secondary-600">Please try again later.</p>
          </div>
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
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-secondary-900">
              Featured Collection
            </h1>
          </div>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover our most popular and trending designs. Each featured product is carefully selected 
            for its unique style, quality, and customer satisfaction.
          </p>
        </motion.div>

        {/* Featured Products Grid */}
        {featuredProducts?.data && featuredProducts.data.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {featuredProducts.data.map((product: any, index: number) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-secondary-400 mb-4">
              <Star className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              No Featured Products Available
            </h3>
            <p className="text-secondary-600">
              Check back soon for our latest featured collection!
            </p>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-white rounded-lg shadow-md p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Curated Selection
              </h3>
              <p className="text-secondary-600">
                Each featured product is handpicked for its exceptional design and quality
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Customer Favorites
              </h3>
              <p className="text-secondary-600">
                Products that our customers love and recommend the most
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-secondary-600">
                Made with the finest materials and attention to detail
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Featured;

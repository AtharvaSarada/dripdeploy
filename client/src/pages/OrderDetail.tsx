import React from 'react';
import { motion } from 'framer-motion';

const OrderDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Order Details Coming Soon
          </h1>
          <p className="text-lg text-secondary-600">
            Detailed order information will be available soon!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetail;

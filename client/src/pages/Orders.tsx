import React from 'react';
import { motion } from 'framer-motion';

const Orders: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Orders Coming Soon
          </h1>
          <p className="text-lg text-secondary-600">
            Order history and tracking will be available soon!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;

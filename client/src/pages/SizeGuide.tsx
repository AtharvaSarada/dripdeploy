import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler, Info, CheckCircle, AlertCircle } from 'lucide-react';

const SizeGuide: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<'men' | 'women' | 'unisex'>('unisex');

  const sizeCharts = {
    men: [
      { size: 'S', chest: '36-38"', waist: '30-32"', length: '26"', fit: 'Regular' },
      { size: 'M', chest: '38-40"', waist: '32-34"', length: '27"', fit: 'Regular' },
      { size: 'L', chest: '40-42"', waist: '34-36"', length: '28"', fit: 'Regular' },
      { size: 'XL', chest: '42-44"', waist: '36-38"', length: '29"', fit: 'Regular' },
      { size: 'XXL', chest: '44-46"', waist: '38-40"', length: '30"', fit: 'Regular' }
    ],
    women: [
      { size: 'XS', chest: '32-34"', waist: '24-26"', length: '24"', fit: 'Regular' },
      { size: 'S', chest: '34-36"', waist: '26-28"', length: '25"', fit: 'Regular' },
      { size: 'M', chest: '36-38"', waist: '28-30"', length: '26"', fit: 'Regular' },
      { size: 'L', chest: '38-40"', waist: '30-32"', length: '27"', fit: 'Regular' },
      { size: 'XL', chest: '40-42"', waist: '32-34"', length: '28"', fit: 'Regular' }
    ],
    unisex: [
      { size: 'XS', chest: '32-34"', waist: '26-28"', length: '25"', fit: 'Relaxed' },
      { size: 'S', chest: '34-36"', waist: '28-30"', length: '26"', fit: 'Relaxed' },
      { size: 'M', chest: '36-38"', waist: '30-32"', length: '27"', fit: 'Relaxed' },
      { size: 'L', chest: '38-40"', waist: '32-34"', length: '28"', fit: 'Relaxed' },
      { size: 'XL', chest: '40-42"', waist: '34-36"', length: '29"', fit: 'Relaxed' },
      { size: 'XXL', chest: '42-44"', waist: '36-38"', length: '30"', fit: 'Relaxed' }
    ]
  };

  const measuringTips = [
    {
      title: 'Chest',
      description: 'Measure around the fullest part of your chest, keeping the tape horizontal',
      icon: Ruler
    },
    {
      title: 'Waist',
      description: 'Measure around your natural waistline, keeping the tape comfortably loose',
      icon: Ruler
    },
    {
      title: 'Length',
      description: 'Measure from the top of your shoulder to where you want the shirt to end',
      icon: Ruler
    }
  ];

  const fitGuides = [
    {
      type: 'Regular Fit',
      description: 'Classic fit with room to move. Perfect for everyday wear.',
      icon: CheckCircle
    },
    {
      type: 'Relaxed Fit',
      description: 'Comfortable, loose fit with extra room. Great for casual styling.',
      icon: CheckCircle
    },
    {
      type: 'Oversized Fit',
      description: 'Trendy oversized look with maximum comfort and style.',
      icon: CheckCircle
    }
  ];

  const sizeTips = [
    'If you\'re between sizes, we recommend sizing up for a more relaxed fit',
    'Our t-shirts are designed to be comfortable and slightly loose-fitting',
    'For a more fitted look, consider sizing down',
    'All measurements are in inches and may vary slightly due to fabric stretch'
  ];

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Size Guide
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Find your perfect fit with our comprehensive size guide. 
            We offer a range of sizes to ensure everyone can find their ideal DripNest t-shirt.
          </p>
        </motion.div>

        {/* Gender Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center space-x-4">
            {[
              { key: 'unisex', label: 'Unisex' },
              { key: 'men', label: 'Men' },
              { key: 'women', label: 'Women' }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedGender(option.key as 'men' | 'women' | 'unisex')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedGender === option.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-secondary-700 hover:bg-secondary-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Size Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-2xl font-semibold text-secondary-900">
                {selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)} Size Chart
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Size</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Chest</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Waist</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Length</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-200">
                  {sizeCharts[selectedGender].map((size, index) => (
                    <motion.tr
                      key={size.size}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="hover:bg-secondary-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-secondary-900">{size.size}</td>
                      <td className="px-6 py-4 text-sm text-secondary-600">{size.chest}</td>
                      <td className="px-6 py-4 text-sm text-secondary-600">{size.waist}</td>
                      <td className="px-6 py-4 text-sm text-secondary-600">{size.length}</td>
                      <td className="px-6 py-4 text-sm text-secondary-600">{size.fit}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Measuring Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-8 text-center">
            How to Measure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {measuringTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <tip.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {tip.title}
                  </h3>
                </div>
                <p className="text-secondary-600">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fit Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-8 text-center">
            Fit Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fitGuides.map((fit, index) => (
              <motion.div
                key={fit.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 border border-secondary-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <fit.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {fit.type}
                  </h3>
                </div>
                <p className="text-secondary-600">
                  {fit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Size Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Size Tips
            </h3>
            <div className="space-y-4">
              {sizeTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-secondary-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Need Help?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-secondary-900">Still Unsure?</h4>
                  <p className="text-sm text-secondary-600">
                    If you're still unsure about your size, our customer service team is here to help!
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-secondary-900">Easy Returns</h4>
                  <p className="text-sm text-secondary-600">
                    Don't worry if the size isn't perfect - we offer free returns and exchanges within 30 days.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Most customers find our unisex sizing to be the most comfortable and versatile option.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SizeGuide;

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Clock, Package, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const Returns: React.FC = () => {
  const returnPolicy = {
    timeframe: '30 days',
    condition: 'Unused and in original packaging',
    exceptions: ['Personalized items', 'Sale items', 'Underwear', 'Accessories']
  };

  const returnProcess = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Log into your account and select the order you want to return',
      icon: Package
    },
    {
      step: 2,
      title: 'Select Items',
      description: 'Choose which items you want to return and provide a reason',
      icon: RefreshCw
    },
    {
      step: 3,
      title: 'Print Label',
      description: 'Download and print your prepaid return shipping label',
      icon: Package
    },
    {
      step: 4,
      title: 'Ship Back',
      description: 'Package your items securely and drop off at any courier location',
      icon: ArrowRight
    },
    {
      step: 5,
      title: 'Refund Processed',
      description: 'Once received, we\'ll process your refund within 3-5 business days',
      icon: CheckCircle
    }
  ];

  const returnReasons = [
    'Wrong size',
    'Not as described',
    'Defective item',
    'Changed my mind',
    'Better alternative found',
    'Gift recipient didn\'t like it'
  ];

  const exchangeOptions = [
    {
      type: 'Size Exchange',
      description: 'Exchange for a different size of the same item',
      timeframe: 'Free exchange within 30 days',
      icon: RefreshCw
    },
    {
      type: 'Color Exchange',
      description: 'Exchange for a different color of the same item',
      timeframe: 'Free exchange within 30 days',
      icon: RefreshCw
    },
    {
      type: 'Style Exchange',
      description: 'Exchange for a completely different item',
      timeframe: 'Price difference applies',
      icon: RefreshCw
    }
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
            Returns & Exchanges
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            We want you to love your DripNest products. If you're not completely satisfied, 
            we offer easy returns and exchanges within 30 days of purchase.
          </p>
        </motion.div>

        {/* Return Policy Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-6 text-center">
              Return Policy Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {returnPolicy.timeframe} Days
                </h3>
                <p className="text-secondary-600">
                  Return window from date of delivery
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Free Returns
                </h3>
                <p className="text-secondary-600">
                  Prepaid shipping labels provided
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Easy Process
                </h3>
                <p className="text-secondary-600">
                  Simple online return initiation
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Return Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-8 text-center">
            How to Return
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {returnProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {step.step}
                  </div>
                  {index < returnProcess.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-secondary-300 transform -translate-y-1/2 z-0"></div>
                  )}
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-secondary-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Return Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Return Requirements
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-secondary-900">Original Packaging</h4>
                    <p className="text-sm text-secondary-600">Items must be in original packaging with all tags attached</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-secondary-900">Unused Condition</h4>
                    <p className="text-sm text-secondary-600">Items must be unworn, unwashed, and in original condition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-secondary-900">Complete Order</h4>
                    <p className="text-sm text-secondary-600">All original items and accessories must be included</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-secondary-900">Return Label</h4>
                    <p className="text-sm text-secondary-600">Use the provided prepaid return shipping label</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Non-Returnable Items
              </h3>
              <div className="space-y-4">
                {returnPolicy.exceptions.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-secondary-900">{item}</h4>
                      <p className="text-sm text-secondary-600">These items cannot be returned for hygiene or customization reasons</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Exchange Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-8 text-center">
            Exchange Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exchangeOptions.map((option, index) => (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 border border-secondary-200"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {option.type}
                  </h3>
                  <p className="text-sm text-secondary-600 mb-3">
                    {option.description}
                  </p>
                  <p className="text-sm text-primary-600 font-medium">
                    {option.timeframe}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Refund Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Refund Information
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Processing Time</h4>
                <p className="text-sm text-secondary-600">
                  Refunds are processed within 3-5 business days after we receive your return.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Refund Method</h4>
                <p className="text-sm text-secondary-600">
                  Refunds are issued to the original payment method used for the purchase.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Bank Processing</h4>
                <p className="text-sm text-secondary-600">
                  It may take 5-10 business days for the refund to appear in your account, depending on your bank.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Common Return Reasons
            </h3>
            <div className="space-y-3">
              {returnReasons.map((reason, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-sm text-secondary-600">{reason}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Need Help?</strong> Our customer service team is here to help with any questions about returns or exchanges.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Returns;

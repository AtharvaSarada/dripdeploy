import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Package, Shield, CheckCircle } from 'lucide-react';

const Shipping: React.FC = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      price: '₹200',
      time: '3-5 business days',
      description: 'Free on orders over ₹2000',
      icon: Truck,
      features: ['Tracking included', 'Signature not required', 'Standard handling']
    },
    {
      name: 'Express Shipping',
      price: '₹500',
      time: '1-2 business days',
      description: 'Fast delivery for urgent orders',
      icon: Package,
      features: ['Priority handling', 'Tracking included', 'Signature required']
    },
    {
      name: 'Same Day Delivery',
      price: '₹800',
      time: 'Same day (if ordered before 2 PM)',
      description: 'Available in select cities',
      icon: Clock,
      features: ['Local delivery', 'Real-time tracking', 'SMS notifications']
    }
  ];

  const shippingInfo = [
    {
      icon: MapPin,
      title: 'Shipping Zones',
      content: 'We currently ship to all major cities in India. Remote areas may take 1-2 additional days.'
    },
    {
      icon: Clock,
      title: 'Processing Time',
      content: 'Orders are typically processed and shipped within 24 hours of placement (excluding weekends and holidays).'
    },
    {
      icon: Truck,
      title: 'Delivery Partners',
      content: 'We partner with reliable courier services including DTDC, Blue Dart, and Delhivery for safe and timely delivery.'
    },
    {
      icon: Shield,
      title: 'Package Protection',
      content: 'All packages are insured and protected during transit. Damaged packages are replaced free of charge.'
    }
  ];

  const trackingSteps = [
    {
      step: 1,
      title: 'Order Confirmed',
      description: 'You\'ll receive an email confirmation with your order details'
    },
    {
      step: 2,
      title: 'Processing',
      description: 'We prepare your order for shipment (usually within 24 hours)'
    },
    {
      step: 3,
      title: 'Shipped',
      description: 'Your order is picked up by our delivery partner'
    },
    {
      step: 4,
      title: 'In Transit',
      description: 'Your package is on its way to you'
    },
    {
      step: 5,
      title: 'Delivered',
      description: 'Your order arrives at your doorstep'
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
            Shipping Information
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Fast, reliable shipping to get your DripNest products to you quickly and safely. 
            Free shipping on orders over ₹2000!
          </p>
        </motion.div>

        {/* Shipping Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-8 text-center">
            Shipping Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 border border-secondary-200"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    {option.name}
                  </h3>
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {option.price}
                  </div>
                  <p className="text-sm text-secondary-600 mb-2">
                    {option.time}
                  </p>
                  <p className="text-sm text-primary-600 font-medium">
                    {option.description}
                  </p>
                </div>
                <ul className="space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-secondary-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shipping Information Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-8 text-center">
            Important Shipping Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shippingInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-secondary-600">
                    {info.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Order Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-8 text-center">
            Order Tracking
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {trackingSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      {step.step}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-secondary-300 transform -translate-y-1/2 z-0"></div>
                    )}
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
          </div>
        </motion.div>

        {/* Shipping Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Shipping Policies
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Free Shipping Threshold</h4>
                <p className="text-sm text-secondary-600">
                  Orders over ₹2000 qualify for free standard shipping. This applies to most locations in India.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Holiday Shipping</h4>
                <p className="text-sm text-secondary-600">
                  During holidays, processing times may be extended by 1-2 business days. We'll notify you of any delays.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Address Accuracy</h4>
                <p className="text-sm text-secondary-600">
                  Please ensure your shipping address is complete and accurate. Incorrect addresses may result in delivery delays.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Delivery Information
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Delivery Attempts</h4>
                <p className="text-sm text-secondary-600">
                  We make up to 3 delivery attempts. If unsuccessful, packages are returned to our facility.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Signature Requirements</h4>
                <p className="text-sm text-secondary-600">
                  Express shipping requires a signature. Standard shipping may be left at your door if safe to do so.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Contact Information</h4>
                <p className="text-sm text-secondary-600">
                  Please provide a valid phone number for delivery notifications and coordination.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;

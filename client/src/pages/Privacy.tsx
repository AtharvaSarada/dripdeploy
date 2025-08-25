import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Users, Database, Globe } from 'lucide-react';

const Privacy: React.FC = () => {
  const privacySections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal information (name, email, address, phone number)',
        'Payment information (processed securely through Stripe)',
        'Order history and preferences',
        'Website usage data and analytics',
        'Communication records with customer service'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        'Process and fulfill your orders',
        'Communicate about your orders and account',
        'Send marketing communications (with your consent)',
        'Improve our products and services',
        'Provide customer support',
        'Comply with legal obligations'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Globe,
      content: [
        'We do not sell your personal information',
        'Share with trusted service providers (shipping, payment processing)',
        'Comply with legal requirements',
        'Protect our rights and safety',
        'Business transfers (with notice)'
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'Encryption of sensitive data',
        'Secure payment processing',
        'Regular security audits',
        'Limited access to personal information',
        'Secure data storage practices'
      ]
    }
  ];

  const cookiesInfo = [
    {
      type: 'Essential Cookies',
      description: 'Required for basic website functionality',
      examples: ['Shopping cart, login sessions, security features']
    },
    {
      type: 'Analytics Cookies',
      description: 'Help us understand how visitors use our site',
      examples: ['Page views, user behavior, performance metrics']
    },
    {
      type: 'Marketing Cookies',
      description: 'Used for personalized advertising',
      examples: ['Retargeting, social media integration, recommendations']
    }
  ];

  const userRights = [
    'Access your personal information',
    'Correct inaccurate data',
    'Request deletion of your data',
    'Opt-out of marketing communications',
    'Data portability',
    'Lodge complaints with authorities'
  ];

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-primary-600 mr-4" />
            <h1 className="text-4xl font-bold text-secondary-900">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-secondary-500 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            Introduction
          </h2>
          <p className="text-secondary-600 mb-4">
            DripNest ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make purchases, or interact with our services.
          </p>
          <p className="text-secondary-600">
            By using our services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-8 mb-12">
          {privacySections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <section.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-semibold text-secondary-900">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-secondary-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Cookies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-secondary-600 mb-6">
            We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.
          </p>
          <div className="space-y-6">
            {cookiesInfo.map((cookie, index) => (
              <div key={index} className="border border-secondary-200 rounded-lg p-4">
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {cookie.type}
                </h3>
                <p className="text-secondary-600 mb-2">
                  {cookie.description}
                </p>
                <p className="text-sm text-secondary-500">
                  <strong>Examples:</strong> {cookie.examples.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            Your Rights
          </h2>
          <p className="text-secondary-600 mb-6">
            You have certain rights regarding your personal information:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userRights.map((right, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span className="text-secondary-600">{right}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            Contact Us
          </h2>
          <p className="text-secondary-600 mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-2 text-secondary-600">
            <p><strong>Email:</strong> privacy@dripnest.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Fashion Street, Style City, SC 12345</p>
          </div>
        </motion.div>

        {/* Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-blue-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Policy Updates
          </h3>
          <p className="text-blue-800">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, Shield, Users, CreditCard } from 'lucide-react';

const Terms: React.FC = () => {
  const termsSections = [
    {
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: [
        'By accessing and using DripNest, you accept and agree to be bound by these Terms of Service',
        'If you do not agree to these terms, please do not use our services',
        'We reserve the right to modify these terms at any time',
        'Continued use after changes constitutes acceptance of new terms'
      ]
    },
    {
      title: 'User Accounts',
      icon: Users,
      content: [
        'You must be at least 18 years old to create an account',
        'You are responsible for maintaining account security',
        'Provide accurate and complete information',
        'Notify us immediately of any unauthorized use',
        'One account per person is allowed'
      ]
    },
    {
      title: 'Product Information',
      icon: FileText,
      content: [
        'We strive to provide accurate product descriptions and images',
        'Colors may vary due to monitor settings and lighting',
        'Product availability is subject to change',
        'Prices are subject to change without notice',
        'We reserve the right to limit quantities'
      ]
    },
    {
      title: 'Payment and Billing',
      icon: CreditCard,
      content: [
        'All prices are in Indian Rupees (INR)',
        'Payment is processed securely through Stripe',
        'Orders are confirmed upon successful payment',
        'We do not store your payment information',
        'Sales tax is applied where applicable'
      ]
    },
    {
      title: 'Shipping and Delivery',
      icon: Shield,
      content: [
        'Shipping times are estimates and may vary',
        'Risk of loss transfers upon delivery',
        'Delivery to the address provided at checkout',
        'Additional charges may apply for remote areas',
        'International shipping not currently available'
      ]
    }
  ];

  const prohibitedActivities = [
    'Using our services for illegal purposes',
    'Attempting to gain unauthorized access',
    'Interfering with website functionality',
    'Creating multiple accounts',
    'Reselling products without permission',
    'Submitting false information'
  ];

  const intellectualProperty = [
    'All content is owned by DripNest',
    'Trademarks and logos are protected',
    'No reproduction without permission',
    'User-generated content remains yours',
    'You grant us license to use your content'
  ];

  const liabilityLimitations = [
    'We are not liable for indirect damages',
    'Maximum liability limited to order value',
    'No warranty beyond what is required by law',
    'Force majeure events excluded',
    'Third-party services not our responsibility'
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
            <FileText className="w-12 h-12 text-primary-600 mr-4" />
            <h1 className="text-4xl font-bold text-secondary-900">
              Terms of Service
            </h1>
          </div>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. 
            These terms govern your use of DripNest and our products.
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
            Agreement to Terms
          </h2>
          <p className="text-secondary-600 mb-4">
            These Terms of Service ("Terms") govern your use of the DripNest website and services operated by DripNest ("we," "us," or "our").
          </p>
          <p className="text-secondary-600">
            By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access our services.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8 mb-12">
          {termsSections.map((section, index) => (
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

        {/* Prohibited Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-secondary-900">
              Prohibited Activities
            </h2>
          </div>
          <p className="text-secondary-600 mb-6">
            You agree not to engage in any of the following activities:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prohibitedActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-600">{activity}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Intellectual Property */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            Intellectual Property
          </h2>
          <div className="space-y-4">
            {intellectualProperty.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-secondary-600">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Liability Limitations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            Limitation of Liability
          </h2>
          <div className="space-y-4">
            {liabilityLimitations.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-secondary-600">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dispute Resolution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            Dispute Resolution
          </h2>
          <div className="space-y-4 text-secondary-600">
            <p>
              Any disputes arising from these Terms or your use of our services will be resolved through:
            </p>
            <ul className="space-y-2 ml-6">
              <li>• First, through direct communication with our customer service team</li>
              <li>• If unresolved, through mediation or arbitration</li>
              <li>• As a last resort, through the courts of [Your Jurisdiction]</li>
            </ul>
          </div>
        </motion.div>

        {/* Governing Law */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            Governing Law
          </h2>
          <p className="text-secondary-600">
            These Terms shall be governed by and construed in accordance with the laws of India, 
            without regard to its conflict of law provisions. Any disputes shall be subject to 
            the exclusive jurisdiction of the courts in Mumbai, India.
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            Contact Information
          </h2>
          <p className="text-secondary-600 mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-secondary-600">
            <p><strong>Email:</strong> legal@dripnest.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Fashion Street, Style City, SC 12345</p>
          </div>
        </motion.div>

        {/* Updates Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-yellow-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            Changes to Terms
          </h3>
          <p className="text-yellow-800">
            We reserve the right to modify these Terms at any time. We will notify users of any 
            material changes by posting the new Terms on this page and updating the "Last updated" date.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;

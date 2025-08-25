import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text"
            >
              DripNest
            </motion.div>
            <p className="text-secondary-300 text-sm">
              Premium printed t-shirts that express your unique style. 
              Quality materials, stunning designs, and exceptional comfort.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-secondary-400 hover:text-primary-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-secondary-400 hover:text-primary-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-secondary-400 hover:text-primary-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/shop" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?category=anime" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Anime Tees
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?category=limited-edition" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Limited Edition
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?category=vintage" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Vintage Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/contact" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/shipping" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link 
                  to="/size-guide" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-secondary-300 text-sm">support@dripnest.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-secondary-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5" />
                <span className="text-secondary-300 text-sm">
                  123 Fashion Street<br />
                  Style City, SC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © 2024 DripNest. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link 
                to="/privacy" 
                className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-secondary-500 text-xs flex items-center justify-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500" />
              <span>for fashion enthusiasts</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

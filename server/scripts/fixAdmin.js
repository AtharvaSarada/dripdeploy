const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import the User model
const User = require('../dist/models/User').default;

async function fixAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the admin user
    const adminUser = await User.findOne({ email: 'admin@dripnest.com' });
    
    if (!adminUser) {
      console.log('❌ Admin user not found, creating new one...');
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      // Create admin user
      const newAdminUser = new User({
        name: 'Admin User',
        email: 'admin@dripnest.com',
        password: hashedPassword,
        role: 'admin',
        isEmailVerified: true,
        addresses: [],
        wishlist: []
      });

      await newAdminUser.save();
      console.log('✅ New admin user created successfully!');
    } else {
      console.log('📧 Found existing admin user:', adminUser.email);
      console.log('🎯 Current role:', adminUser.role);
      console.log('🔑 Has password:', !!adminUser.password);
      
      // Update password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      adminUser.password = hashedPassword;
      adminUser.role = 'admin';
      adminUser.isEmailVerified = true;
      
      await adminUser.save();
      console.log('✅ Admin user updated successfully!');
    }

    console.log('📧 Email: admin@dripnest.com');
    console.log('🔑 Password: admin123');
    console.log('🎯 Role: admin');

    // Test the password
    const testUser = await User.findOne({ email: 'admin@dripnest.com' }).select('+password');
    const isMatch = await bcrypt.compare('admin123', testUser.password);
    console.log('🔍 Password test result:', isMatch ? '✅ PASS' : '❌ FAIL');

  } catch (error) {
    console.error('❌ Error fixing admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

fixAdminUser();

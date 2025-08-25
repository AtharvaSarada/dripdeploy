const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function directFixAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Directly update the user document
    const result = await mongoose.connection.db.collection('users').updateOne(
      { email: 'admin@dripnest.com' },
      {
        $set: {
          password: hashedPassword,
          role: 'admin',
          isEmailVerified: true,
          name: 'Admin User'
        }
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log('✅ New admin user created');
    } else if (result.modifiedCount > 0) {
      console.log('✅ Admin user updated');
    } else {
      console.log('ℹ️ No changes made');
    }

    // Verify the update
    const user = await mongoose.connection.db.collection('users').findOne(
      { email: 'admin@dripnest.com' }
    );

    if (user) {
      console.log('📧 Email:', user.email);
      console.log('🎯 Role:', user.role);
      console.log('🔑 Has password:', !!user.password);
      
      // Test password
      const isMatch = await bcrypt.compare('admin123', user.password);
      console.log('🔍 Password test result:', isMatch ? '✅ PASS' : '❌ FAIL');
    } else {
      console.log('❌ User not found after update');
    }

    console.log('📧 Email: admin@dripnest.com');
    console.log('🔑 Password: admin123');
    console.log('🎯 Role: admin');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

directFixAdmin();

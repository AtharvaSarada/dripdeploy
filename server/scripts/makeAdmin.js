const mongoose = require('mongoose');
require('dotenv').config();

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  googleId: String,
  avatar: String,
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  phone: String,
  addresses: [{
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home'
    },
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isDefault: Boolean
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  isEmailVerified: Boolean,
  lastLogin: Date
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

async function makeAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the admin user
    const adminUser = await User.findOne({ email: 'admin@dripnest.com' });
    
    if (!adminUser) {
      console.log('❌ Admin user not found. Creating one...');
      
      // Create admin user
      const newAdmin = new User({
        name: 'Admin User',
        email: 'admin@dripnest.com',
        password: 'admin123',
        role: 'admin',
        isEmailVerified: true
      });
      
      await newAdmin.save();
      console.log('✅ Admin user created successfully');
    } else {
      // Update existing user to admin
      adminUser.role = 'admin';
      await adminUser.save();
      console.log('✅ User updated to admin role');
    }

    // Verify the admin user
    const updatedAdmin = await User.findOne({ email: 'admin@dripnest.com' });
    console.log(`👤 Admin user: ${updatedAdmin.name} (${updatedAdmin.role})`);

    console.log('🎉 Admin setup completed!');
  } catch (error) {
    console.error('❌ Error setting up admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

makeAdmin();

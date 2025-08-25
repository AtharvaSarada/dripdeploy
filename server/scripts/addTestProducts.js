const mongoose = require('mongoose');
require('dotenv').config();

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  tags: [{ type: String }],
  sizes: [{ type: String }],
  colors: [{ type: String }],
  design: {
    type: { type: String, enum: ['graphic', 'text', 'custom'], default: 'graphic' },
    description: { type: String, default: '' },
    placement: { type: String, enum: ['front', 'back', 'both'], default: 'front' }
  },
  materials: [{ type: String }],
  care: [{ type: String }],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  stock: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

const testProducts = [
  {
    name: "Classic White T-Shirt",
    description: "Premium cotton classic white t-shirt with a comfortable fit. Perfect for everyday wear.",
    price: 29.99,
    category: "comic",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
    ],
    tags: ["cotton", "comfortable", "everyday"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    materials: ["100% Cotton"],
    care: ["Machine wash cold", "Tumble dry low"],
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    numReviews: 12,
    stock: 50
  },
  {
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with stretch denim for maximum comfort and style.",
    price: 79.99,
    category: "vintage",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
    ],
    tags: ["denim", "stretch", "modern"],
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue", "Black", "Gray"],
    materials: ["98% Cotton", "2% Elastane"],
    care: ["Machine wash cold", "Hang dry"],
    isActive: true,
    isFeatured: true,
    rating: 4.3,
    numReviews: 8,
    stock: 30
  },
  {
    name: "Casual Hoodie",
    description: "Warm and comfortable hoodie perfect for casual outings and cold weather.",
    price: 59.99,
    category: "retro",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
    ],
    tags: ["warm", "comfortable", "casual"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gray", "Black", "Navy"],
    materials: ["80% Cotton", "20% Polyester"],
    care: ["Machine wash cold", "Tumble dry low"],
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    numReviews: 15,
    stock: 25
  }
];

async function addTestProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Add test products
    const products = await Product.insertMany(testProducts);
    console.log(`✅ Added ${products.length} test products`);

    // Display added products
    products.forEach(product => {
      console.log(`- ${product.name}: $${product.price}`);
    });

    console.log('🎉 Test products added successfully!');
  } catch (error) {
    console.error('❌ Error adding test products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

addTestProducts();

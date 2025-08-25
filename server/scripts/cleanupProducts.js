const mongoose = require('mongoose');
require('dotenv').config();

async function cleanupProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get the native MongoDB collection
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');

    // Find products with invalid prices using native MongoDB
    const invalidProducts = await productsCollection.find({
      $or: [
        { price: { $exists: false } },
        { price: null },
        { price: { $type: "string" } },
        { price: NaN }
      ]
    }).toArray();

    console.log(`Found ${invalidProducts.length} products with invalid prices`);

    if (invalidProducts.length > 0) {
      // Delete products with invalid prices
      const result = await productsCollection.deleteMany({
        $or: [
          { price: { $exists: false } },
          { price: null },
          { price: { $type: "string" } },
          { price: NaN }
        ]
      });

      console.log(`✅ Deleted ${result.deletedCount} products with invalid prices`);
    }

    // Find products with missing required fields
    const incompleteProducts = await productsCollection.find({
      $or: [
        { name: { $exists: false } },
        { name: null },
        { name: "" },
        { description: { $exists: false } },
        { description: null },
        { description: "" },
        { category: { $exists: false } },
        { category: null },
        { category: "" }
      ]
    }).toArray();

    console.log(`Found ${incompleteProducts.length} products with missing required fields`);

    if (incompleteProducts.length > 0) {
      // Delete products with missing required fields
      const result = await productsCollection.deleteMany({
        $or: [
          { name: { $exists: false } },
          { name: null },
          { name: "" },
          { description: { $exists: false } },
          { description: null },
          { description: "" },
          { category: { $exists: false } },
          { category: null },
          { category: "" }
        ]
      });

      console.log(`✅ Deleted ${result.deletedCount} products with missing required fields`);
    }

    // Count remaining products
    const totalProducts = await productsCollection.countDocuments();
    console.log(`📊 Total products remaining: ${totalProducts}`);

    console.log('✅ Database cleanup completed successfully');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

cleanupProducts();

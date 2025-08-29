import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const maxRetries = 5;
  let retryCount = 0;
  
  const attemptConnection = async (): Promise<void> => {
    try {
      const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dripnest';
      
      // Connection options for better stability (using modern MongoDB options)
      const options: mongoose.ConnectOptions = {
        maxPoolSize: 10, // Maximum number of connections in the pool
        serverSelectionTimeoutMS: 5000, // Timeout for server selection
        socketTimeoutMS: 45000, // Timeout for socket operations
        bufferMaxEntries: 0, // Disable mongoose buffering
        bufferCommands: false, // Disable mongoose buffering
        // Modern MongoDB options (replaces deprecated autoReconnect, etc.)
        retryWrites: true,
        // Connection pool settings
        minPoolSize: 1,
        maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
        // Heartbeat settings
        heartbeatFrequencyMS: 10000, // Send heartbeat every 10 seconds
        // Timeout settings
        connectTimeoutMS: 10000, // 10 seconds to establish initial connection
      };
      
      await mongoose.connect(mongoURI, options);
      
      console.log('✅ MongoDB connected successfully');
      
      // Handle connection events
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected - attempting to reconnect...');
        // Attempt to reconnect after a delay
        setTimeout(() => {
          if (mongoose.connection.readyState === 0) {
            console.log('🔄 Attempting to reconnect to MongoDB...');
            mongoose.connect(mongoURI, options).catch(console.error);
          }
        }, 5000);
      });
      
      mongoose.connection.on('reconnected', () => {
        console.log('✅ MongoDB reconnected successfully');
      });
      
      mongoose.connection.on('close', () => {
        console.log('🔌 MongoDB connection closed');
      });
      
      // Graceful shutdown
      process.on('SIGINT', async () => {
        try {
          await mongoose.connection.close();
          console.log('🔌 MongoDB connection closed through app termination');
          process.exit(0);
        } catch (error) {
          console.error('Error closing MongoDB connection:', error);
          process.exit(1);
        }
      });
      
      // Handle unhandled promise rejections
      process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        // Don't exit the process, let it continue
      });
      
    } catch (error) {
      retryCount++;
      console.error(`❌ MongoDB connection attempt ${retryCount} failed:`, error);
      
      if (retryCount < maxRetries) {
        console.log(`🔄 Retrying connection in 5 seconds... (${retryCount}/${maxRetries})`);
        setTimeout(attemptConnection, 5000);
      } else {
        console.log('⚠️ Max retries reached. Server will continue without database connection. Some features may not work.');
      }
    }
  };
  
  await attemptConnection();
};

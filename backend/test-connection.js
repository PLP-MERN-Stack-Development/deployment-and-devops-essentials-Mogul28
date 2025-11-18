/**
 * Test MongoDB Connection Script
 * Run this to verify your MongoDB connection string is correct
 * Usage: node test-connection.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  console.log('🔍 Testing MongoDB Connection...\n');
  
  // Check if MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not set in .env');
    process.exit(1);
  }

  // Check if it's still a placeholder
  if (process.env.MONGODB_URI.includes('username:password') || 
      process.env.MONGODB_URI.includes('cluster.mongodb.net/dbname')) {
    console.error('❌ Error: MONGODB_URI still contains placeholder values');
    console.error('   Please update .env with your actual MongoDB connection string');
    console.error('   See ../MONGODB_SETUP.md for instructions');
    process.exit(1);
  }

  console.log('📝 Connection String (password hidden):');
  const hiddenUri = process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@');
  console.log(`   ${hiddenUri}\n`);

  try {
    console.log('⏳ Attempting to connect...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}\n`);
    
    // Test a simple operation
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📊 Collections in database: ${collections.length}`);
    if (collections.length > 0) {
      console.log('   Collections:', collections.map(c => c.name).join(', '));
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Connection test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error(`   Error: ${error.message}\n`);
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('💡 This usually means:');
      console.error('   - The connection string is incorrect');
      console.error('   - The cluster doesn\'t exist');
      console.error('   - Network/DNS issues\n');
    } else if (error.message.includes('authentication')) {
      console.error('💡 This usually means:');
      console.error('   - Wrong username or password');
      console.error('   - Password needs URL encoding (special characters)');
      console.error('   - User doesn\'t have proper permissions\n');
    } else if (error.message.includes('timeout')) {
      console.error('💡 This usually means:');
      console.error('   - Your IP is not whitelisted in MongoDB Atlas');
      console.error('   - Network connectivity issues');
      console.error('   - Go to Network Access in MongoDB Atlas and add your IP\n');
    }
    
    console.error('📚 See ../MONGODB_SETUP.md for detailed setup instructions');
    process.exit(1);
  }
};

testConnection();


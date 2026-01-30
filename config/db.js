const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://SANJU386:S%40nju12345@sanju.kdjrh0n.mongodb.net/sports', {
      autoIndex: true, 
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // This checks if the index built correctly or if data blocked it
    mongoose.connection.on('index', (err) => {
      if (err) console.error('❌ Index Error:', err.message);
      else console.log('🚀 Database Unique Indexes Built Successfully');
    });

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
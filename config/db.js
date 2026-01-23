const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use your specific MongoDB Atlas connection string here
        const conn = await mongoose.connect('mongodb+srv://SANJU386:S%40nju12345@sanju.kdjrh0n.mongodb.net/sports');
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectDB;
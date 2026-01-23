const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import your db.js function
const registrationRoutes = require('./routes/registration');

const app = express();

// 1. Connect to Database
connectDB(); 

// 2. Middlewares
app.use(cors()); // Critical for your React frontend to talk to this
app.use(express.json()); // Essential to read the form data

// 3. Routes
app.use('/api', registrationRoutes);

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
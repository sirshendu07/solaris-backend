const express = require('express');
const router = express.Router();
const Participants = require('../models/Participants');

// POST endpoint: http://localhost:5000/api/register
router.post('/register', async (req, res) => {
    try {
        const newParticipant = new Participants(req.body);
        await newParticipant.save();
        res.status(201).json({ success: true, message: "Registration Successful!" });
    } catch (error) {
        // If phone number exists, Mongoose throws an error
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
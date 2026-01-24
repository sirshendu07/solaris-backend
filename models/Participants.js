const mongoose = require('mongoose');

// This schema defines exactly what information we save for each participant
const ParticipantSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  tower: {
    type: String,
    required: true,
    enum: ['I', 'II'] // Restricts data to only these two options
  },
  flatNo: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true // Prevents double registration with the same number
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'] // Standard categories for your society
  },
  residentialStatus: {
    type: String,
    required: true,
    enum: ['Owner', 'Tenant'] // Specific requirement for Solaris Bonhooghly
  },
  ageGroup: {
    type: String,
    required: true // Captures 'A', 'B', 'C', etc. from your selection page
  },
  
 // Change this section in your Participant.js file
selectedSports: {
  type: [String], // The [ ] brackets tell MongoDB to expect a list/array
  required: true,
  validate: [v => v.length > 0 && v.length <= 2, 'Select 1 or 2 sports'] 
},


  registrationDate: {
    type: Date,
    default: Date.now // Automatically tracks when they signed up
  }
});

// Create the model using the schema
const Participant = mongoose.model('Participant', ParticipantSchema);

module.exports = Participant;
const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  tower: {
    type: String,
    required: true,
    enum: ['I', 'II'] 
  },
  flatNo: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true,
    unique: false // Correctly set to false to allow family registrations
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'] 
  },
  residentialStatus: {
    type: String,
    required: true,
    enum: ['Owner', 'Tenant']
  },
  ageGroup: {
    type: String,
    required: true 
  },
  selectedSports: {
    type: [String], 
    required: true,
    validate: [v => v.length > 0, 'At least one event must be assigned'] 
  },
  registrationDate: {
    type: Date,
    default: Date.now 
  }
});

// Changed to plural 'Participants' to match your naming convention
const Participants = mongoose.model('Participants', ParticipantSchema);
module.exports = Participants;
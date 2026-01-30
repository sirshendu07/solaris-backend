const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true, 
    lowercase: true, // "Sanju" becomes "sanju"
    trim: true       // " Sanju " becomes "Sanju"
  },
  gender: { type: String, required: true },
  tower: { type: String, required: true },
  flatNo: { type: String, required: true },
  phoneNo: { 
    type: String, 
    required: true,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'] 
  },
  residentialStatus: { type: String, required: true },
  ageGroup: { type: String, required: true },
  selectedSports: { type: [String], required: true },
  registrationDate: { type: Date, default: Date.now }
});

// THE MASTER INDEX (Name + Gender + Tower + Flat + Phone)
ParticipantSchema.index(
  { fullName: 1, gender: 1, tower: 1, flatNo: 1, phoneNo: 1 }, 
  { 
    unique: true,
    collation: { locale: 'en', strength: 2 },
    partialFilterExpression: { ageGroup: { $ne: "Group I" } } 
  }
);

const Participants = mongoose.model('Participants', ParticipantSchema);
module.exports = Participants;
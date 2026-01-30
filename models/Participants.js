const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true, 
    trim: true // Removes spaces from front and back
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

// MIDDLEWARE: Fixes multiple internal spaces (e.g. "Sanju    Bera" -> "Sanju Bera")
ParticipantSchema.pre('save', function(next) {
  if (this.fullName) {
    this.fullName = this.fullName.replace(/\s+/g, ' '); 
  }
  next();
});

// THE INDEX: Still blocks duplicates, but allows normal spaces
ParticipantSchema.index(
  { fullName: 1, gender: 1, tower: 1, flatNo: 1, phoneNo: 1 }, 
  { 
    unique: true,
    collation: { locale: 'en', strength: 2 }, // Treats "Sanju" and "sanju" as SAME
    partialFilterExpression: { ageGroup: { $ne: "Group I" } } 
  }
);

module.exports = mongoose.model('Participants', ParticipantSchema);
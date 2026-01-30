const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  tower: { type: String, required: true, enum: ['I', 'II'] },
  flatNo: { type: String, required: true },
  phoneNo: { type: String, required: true },
  gender: { type: String, required: true },
  residentialStatus: { type: String, required: true },
  ageGroup: { type: String, required: true },
  selectedSports: { type: [String], required: true },
  registrationDate: { type: Date, default: Date.now }
});

// THE ULTIMATE UNIQUE INDEX
// Includes: fullName, tower, flatNo, and residentialStatus
ParticipantSchema.index(
  { 
    fullName: 1, 
    tower: 1, 
    flatNo: 1, 
    residentialStatus: 1 
  }, 
  { 
    unique: true,
    collation: { locale: 'en', strength: 2 }, // Ignore Case (Sanju = sanju)
    // IMPORTANT: Rule does NOT apply to Group I
    partialFilterExpression: { ageGroup: { $ne: "Group I" } } 
  }
);

const Participants = mongoose.model('Participants', ParticipantSchema);
module.exports = Participants;
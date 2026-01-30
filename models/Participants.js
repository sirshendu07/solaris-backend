const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  tower: { type: String, required: true, enum: ['I', 'II'] },
  flatNo: { type: String, required: true },
  phoneNo: { type: String, required: true }, // No unique tag here
  gender: { type: String, required: true },
  residentialStatus: { type: String, required: true },
  ageGroup: { type: String, required: true },
  selectedSports: { type: [String], required: true },
  registrationDate: { type: Date, default: Date.now }
});

// THE KEY CHANGE: Define the combined index
// THE FIX: Combined Unique Key with Case-Insensitive logic
ParticipantSchema.index(
  { fullName: 1, tower: 1, flatNo: 1 }, 
  { 
    unique: true,
    collation: { locale: 'en', strength: 2 } // Strength 2 ignores case
  }
);

const Participants = mongoose.model('Participants', ParticipantSchema);
module.exports = Participants;
const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userIdentifier: {
    type: String,
    default: 'anonymous'
  }
});
SearchHistorySchema.index({ timestamp: -1 });

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);
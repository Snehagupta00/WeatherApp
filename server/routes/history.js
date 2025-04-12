const express = require('express');
const router = express.Router();
const SearchHistory = require('../models/SearchHistory');

router.get('/', async (req, res) => {
  try {
    const history = await SearchHistory.find()
      .sort({ timestamp: -1 })
      .limit(10);
    
    res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { city } = req.body;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    
    const newSearchEntry = new SearchHistory({ city });
    await newSearchEntry.save();
    
    res.status(201).json(newSearchEntry);
  } catch (error) {
    console.error('Error saving search history:', error);
    res.status(500).json({ error: 'Failed to save search history' });
  }
});

router.delete('/', async (req, res) => {
  try {
    await SearchHistory.deleteMany({});
    res.status(200).json({ message: 'Search history cleared successfully' });
  } catch (error) {
    console.error('Error clearing search history:', error);
    res.status(500).json({ error: 'Failed to clear search history' });
  }
});

module.exports = router;
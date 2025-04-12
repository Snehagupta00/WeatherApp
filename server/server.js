const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const weatherRoutes = require('./routes/weather');
const historyRoutes = require('./routes/history');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Continuing without MongoDB...');
  });

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => {
  res.send('Weather API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
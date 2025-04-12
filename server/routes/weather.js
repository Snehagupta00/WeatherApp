const express = require('express');
const axios = require('axios');
const router = express.Router();
const SearchHistory = require('../models/SearchHistory');

router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    const response = await axios.get(url);
    const weatherData = response.data;
    
    const formattedData = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      condition: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      humidity: weatherData.main.humidity,
      wind_speed: weatherData.wind.speed,
      pressure: weatherData.main.pressure,
      timestamp: new Date(weatherData.dt * 1000)
    };

    try {
      const newSearchEntry = new SearchHistory({ city: weatherData.name });
      await newSearchEntry.save();
    } catch (historyError) {
      console.error('Error saving to search history:', historyError);
    }
    
    res.json(formattedData);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    console.error('Weather API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

router.get('/forecast', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    
    const response = await axios.get(url);
    const forecastData = response.data;
    const dailyForecasts = [];
    const forecastMap = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
            if (!forecastMap[date]) {
        forecastMap[date] = {
          date: new Date(item.dt * 1000),
          temperature: item.main.temp,
          feels_like: item.main.feels_like,
          condition: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          wind_speed: item.wind.speed,
          pressure: item.main.pressure
        };
        dailyForecasts.push(forecastMap[date]);
      }
            if (dailyForecasts.length >= 5) {
        return;
      }
    });
        const formattedForecast = {
      city: forecastData.city.name,
      country: forecastData.city.country,
      forecasts: dailyForecasts
    };
    
    res.json(formattedForecast);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    console.error('Weather Forecast API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

module.exports = router;
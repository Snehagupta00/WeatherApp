import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchHistory from './components/SearchHistory';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    if (!API_URL) {
      setError('API URL is not configured. Please set REACT_APP_API_URL in your .env file.');
    }
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('darkMode')) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const fetchWeatherData = async (city) => {
    if (!API_URL) {
      setError('Cannot fetch weather: API URL is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const weatherResponse = await fetch(`${API_URL}/api/weather?city=${encodeURIComponent(city)}`);
      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch weather data (HTTP ${weatherResponse.status})`);
      }
      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);

      const forecastResponse = await fetch(`${API_URL}/api/weather/forecast?city=${encodeURIComponent(city)}`);
      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json().catch(() => ({}));
        setError('Failed to fetch forecast: ' + (errorData.error || `HTTP ${forecastResponse.status}`));
        setForecastData(null);
      } else {
        const forecastResult = await forecastResponse.json();
        setForecastData(forecastResult);
      }
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          <button
            className={`p-2 rounded-lg flex items-center transition-colors ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100 shadow'
            }`}
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
                Light Mode
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Dark Mode
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <SearchBar onSearch={fetchWeatherData} isLoading={loading} />

            {error && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900 dark:text-red-200 rounded shadow">
                <p className="font-medium">Error: {error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <svg
                  className="animate-spin h-12 w-12 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            ) : (
              <>
                {weatherData && <WeatherCard weather={weatherData} />}
                {forecastData && <ForecastCard forecast={forecastData} />}
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <SearchHistory onSelectCity={fetchWeatherData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
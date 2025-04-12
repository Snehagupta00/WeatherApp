import React from 'react';

const WeatherCard = ({ weather }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mb-6 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-lg">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-800">
              {weather.city}, {weather.country}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {formatDate(weather.timestamp)}
            </p>
            <div className="flex items-center mt-6">
              <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-2">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                  alt={weather.description}
                  className="w-20 h-20 sm:w-24 sm:h-24"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-800">
                  {Math.round(weather.temperature)}°C
                </h3>
                <p className="text-base sm:text-lg capitalize mt-2 text-gray-600 dark:text-gray-400">
                  {weather.description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 sm:p-6 rounded-xl bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-sm self-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-full p-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-500 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7l4-4m0 0l4 4m-4-4v18"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Feels Like
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-800">
                  {Math.round(weather.feels_like)}°C
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-full p-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-500 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Humidity
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-800">
                  {weather.humidity}%
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-full p-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-500 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Wind Speed
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-800">
                  {weather.wind_speed} m/s
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-full p-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-500 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Pressure
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-800">
                  {weather.pressure} hPa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
import React from 'react';

const ForecastCard = ({ forecast }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-800 mb-6">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecast.forecasts.map((day, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
          >
            <h5 className="text-sm font-semibold text-center text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              {formatDate(day.date)}
            </h5>
            <div className="flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-2">
                <img
                  src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="w-14 h-14" 
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-gray-800 my-2">
                {Math.round(day.temperature)}°C
              </p>
              <p className="text-sm capitalize text-gray-600 dark:text-gray-400">
                {day.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
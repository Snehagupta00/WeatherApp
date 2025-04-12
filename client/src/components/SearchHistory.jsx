import React, { useEffect, useState } from 'react';

const SearchHistory = ({ onSelectCity }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    if (!API_URL) {
      setError('API URL is not configured. Please set REACT_APP_API_URL.');
    }
  }, []);

  const fetchHistory = async () => {
    if (!API_URL) {
      setError('Cannot fetch history: API URL is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/history`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch search history (HTTP ${response.status})`);
      }
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      setError('Error loading search history');
      console.error('Fetch history error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const clearHistory = async () => {
    if (!API_URL) {
      setError('Cannot clear history: API URL is not configured.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/history`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to clear search history (HTTP ${response.status})`);
      }
      setHistory([]);
      setError('');
    } catch (err) {
      setError('Error clearing search history');
      console.error('Clear history error:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-800">Recent Searches</h3>
        {history.length > 0 && (
          <button
            className="px-3 py-1 text-sm bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200"
            onClick={clearHistory}
            aria-label="Clear search history"
          >
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-4">
          <svg
            className="animate-spin h-6 w-6 text-indigo-500"
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
      ) : error ? (
        <div className="text-red-700 dark:text-red-200 text-sm p-2 bg-red-100 dark:bg-red-900 rounded">
          {error}
        </div>
      ) : history.length === 0 ? (
        <div className="text-gray-600 dark:text-white text-sm p-2">No search history yet</div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item._id}
              className="p-3 bg-gray-100 dark:bg-gray-200 rounded-lg  transition-colors cursor-pointer flex flex-col"
              onClick={() => onSelectCity(item.city)}
            >
              <span className="font-medium text-gray-900 dark:text-gray-800">{item.city}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {formatDate(item.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
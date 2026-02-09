import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, loading }) {
  const [searchType, setSearchType] = useState('locations'); // 'locations' or 'natural'
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [query, setQuery] = useState('');
  const [preference, setPreference] = useState('balanced');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (searchType === 'locations') {
      if (!from.trim() || !to.trim()) {
        alert('Please enter both starting point and destination');
        return;
      }
      onSearch({ from: from.trim(), to: to.trim(), preference });
    } else {
      if (!query.trim()) {
        alert('Please enter your search query');
        return;
      }
      onSearch({ query: query.trim(), preference });
    }
  };

  return (
    <div className="search-bar">
      <div className="search-tabs">
        <button
          className={searchType === 'locations' ? 'tab active' : 'tab'}
          onClick={() => setSearchType('locations')}
        >
          Location Search
        </button>
        <button
          className={searchType === 'natural' ? 'tab active' : 'tab'}
          onClick={() => setSearchType('natural')}
        >
          AI Search
        </button>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        {searchType === 'locations' ? (
          <>
            <div className="form-group">
              <label htmlFor="from">From (Starting Point)</label>
              <input
                type="text"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g., Gulshan, New Market, Dhanmondi"
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="to">To (Destination)</label>
              <input
                type="text"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g., Motijheel, Shyamoli, Uttara"
                className="input"
              />
            </div>
          </>
        ) : (
          <div className="form-group">
            <label htmlFor="query">Ask in natural language</label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., I want to go from Gulshan to Motijheel"
              className="input"
            />
            <small className="hint">Powered by Google Gemini AI</small>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="preference">Preference</label>
          <select
            id="preference"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            className="select"
          >
            <option value="balanced">Balanced (Time + Cost)</option>
            <option value="fastest">Fastest Route</option>
            <option value="cheapest">Cheapest Route</option>
            <option value="least_transfer">Least Transfers</option>
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Searching...' : '🔍 Find Route'}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

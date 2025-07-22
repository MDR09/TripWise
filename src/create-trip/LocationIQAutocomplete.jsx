import React, { useState, useRef } from 'react';

function LocationIQAutocomplete({ onSelect }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);


  // Debounce logic
  const debounceTimeout = useRef();

  const fetchSuggestions = async (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    const endpoint = `https://api.locationiq.com/v1/autocomplete?key=${import.meta.env.VITE_LOCATIONIQ_API_KEY}&q=${encodeURIComponent(value)}&limit=5&dedupe=1`;
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      // Deduplicate by display_place or display_name
      const seen = new Set();
      const deduped = (Array.isArray(data) ? data : []).filter(item => {
        const name = item.display_place || item.display_name;
        if (seen.has(name)) return false;
        seen.add(name);
        return true;
      });
      setSuggestions(deduped);
    } catch (e) {
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (value.length > 0) {
      debounceTimeout.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 500); // 500ms debounce
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setInput(place.display_place || place.display_name);
    setSuggestions([]);
    if (onSelect) onSelect(place);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter a destination"
        className="border border-gray-300 rounded-lg p-2 w-[100%] focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto animate-fade-in">
          {suggestions.map((s, idx) => (
            <li
              key={s.place_id}
              onClick={() => handleSelect(s)}
              className={
                `flex flex-col px-4 py-2 cursor-pointer transition hover:bg-blue-50 ${idx === 0 ? 'rounded-t-lg' : ''} ${idx === suggestions.length - 1 ? 'rounded-b-lg' : ''}`
              }
            >
              <span className="font-medium text-gray-800">{s.display_place || s.display_name}</span>
              {s.state && <span className="text-gray-500 text-xs">{s.state}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationIQAutocomplete;

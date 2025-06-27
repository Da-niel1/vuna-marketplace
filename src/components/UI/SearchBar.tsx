import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterToggle?: () => void;
  placeholder?: string;
  showFilterButton?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterToggle,
  placeholder = "Search for items, books, electronics...",
  showFilterButton = false
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <div className={`relative flex-1 transition-all duration-200 ${
        isFocused ? 'transform scale-105' : ''
      }`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-3 border rounded-lg transition-all duration-200 ${
            isFocused 
              ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' 
              : 'border-gray-300 hover:border-gray-400'
          } focus:outline-none`}
        />
        
        {/* Search Icon */}
        <Search className={`absolute left-4 top-3.5 h-5 w-5 transition-colors ${
          isFocused ? 'text-blue-500' : 'text-gray-400'
        }`} />
        
        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-3.5 p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Button */}
      {showFilterButton && (
        <button
          type="button"
          onClick={onFilterToggle}
          className="ml-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      )}
    </form>
  );
};

export default SearchBar;
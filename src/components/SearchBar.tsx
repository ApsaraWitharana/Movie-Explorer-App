import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  
  // Update local state when initialValue prop changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative transition-all duration-200 ${
        isFocused ? 'scale-[1.01]' : 'scale-100'
      }`}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-slate-500" />
        </div>
        
        <input
          type="search"
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="input pl-10 py-3 w-full bg-white dark:bg-slate-800 shadow-sm focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 focus:outline-none transition-all duration-200"
          placeholder="Search for movies..."
          aria-label="Search for movies"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-12 flex items-center pr-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <button
        type="submit"
        className="absolute right-0 top-0 bottom-0 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
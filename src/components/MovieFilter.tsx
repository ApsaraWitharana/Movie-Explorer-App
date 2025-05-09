import React, { useState } from 'react';
import { Filter } from 'lucide-react';

const MovieFilter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleFilter = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <button
        onClick={toggleFilter}
        className="w-full flex items-center justify-between p-3 text-left focus:outline-none"
      >
        <div className="flex items-center">
          <Filter className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
          <span className="font-medium">Filters</span>
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {isVisible ? 'Hide' : 'Show'}
        </span>
      </button>
      
      {isVisible && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Year Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Year
              </label>
              <select className="input">
                <option value="">Any Year</option>
                {Array.from({ length: 30 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
            
            {/* Genre Filter - In a real app, these would be fetched from the API */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Genre
              </label>
              <select className="input">
                <option value="">All Genres</option>
                <option value="28">Action</option>
                <option value="12">Adventure</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="80">Crime</option>
                <option value="99">Documentary</option>
                <option value="18">Drama</option>
                <option value="10751">Family</option>
                <option value="14">Fantasy</option>
                <option value="36">History</option>
                <option value="27">Horror</option>
                <option value="10402">Music</option>
                <option value="9648">Mystery</option>
                <option value="10749">Romance</option>
                <option value="878">Science Fiction</option>
                <option value="10770">TV Movie</option>
                <option value="53">Thriller</option>
                <option value="10752">War</option>
                <option value="37">Western</option>
              </select>
            </div>
            
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Minimum Rating
              </label>
              <select className="input">
                <option value="">Any Rating</option>
                <option value="9">9+</option>
                <option value="8">8+</option>
                <option value="7">7+</option>
                <option value="6">6+</option>
                <option value="5">5+</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="btn-secondary mr-2">
              Reset
            </button>
            <button className="btn-primary">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieFilter;
import React, { useEffect, useState } from 'react';
import { useMovie } from '../contexts/MovieContext';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import TrendingMovies from '../components/TrendingMovies';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: React.FC = () => {
  const { 
    searchMovies, 
    searchResults, 
    isLoading, 
    error, 
    getTrendingMovies,
    trendingMovies,
    searchTerm,
    setSearchTerm
  } = useMovie();
  const [page, setPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (!trendingMovies.length) {
      getTrendingMovies();
    }
    
    // Check if there's a search term in localStorage
    const savedSearch = localStorage.getItem('lastSearch');
    if (savedSearch) {
      setSearchTerm(savedSearch);
      searchMovies(savedSearch, 1);
      setShowSearch(true);
    }
  }, [getTrendingMovies, trendingMovies.length, searchMovies, setSearchTerm]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setPage(1);
    
    if (query.trim()) {
      searchMovies(query, 1);
      localStorage.setItem('lastSearch', query);
      setShowSearch(true);
    } else {
      setShowSearch(false);
      localStorage.removeItem('lastSearch');
    }
  };

  const loadMore = () => {
    if (searchTerm && !isLoading) {
      const nextPage = page + 1;
      searchMovies(searchTerm, nextPage, true);
      setPage(nextPage);
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        
        {showSearch && (
          <div className="mt-4">

          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {showSearch ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Search Results {searchTerm && `for "${searchTerm}"`}</h2>
          {isLoading && page === 1 ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <MovieGrid movies={searchResults} />

              {searchResults.length > 0 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="btn-primary px-6 py-3"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <LoadingSpinner size="small" />
                        <span className="ml-2">Loading...</span>
                      </span>
                    ) : (
                      'Load More'
                    )}
                  </button>
                </div>
              )}

              {searchResults.length === 0 && !isLoading && (
                <div className="text-center py-20">
                  <p className="text-xl text-slate-600 dark:text-slate-400">No results found. Try another search term.</p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <TrendingMovies />
      )}
    </div>
  );
};

export default Home;
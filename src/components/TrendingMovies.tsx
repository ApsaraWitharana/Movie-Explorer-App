import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useMovie } from '../contexts/MovieContext';
import MovieGrid from './MovieGrid';
import LoadingSpinner from './LoadingSpinner';

const TrendingMovies: React.FC = () => {
  const { trendingMovies, isLoading, error } = useMovie();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
        <h2 className="text-2xl font-bold">Trending Movies</h2>
      </div>
      
      {trendingMovies.length > 0 ? (
        <MovieGrid movies={trendingMovies} />
      ) : (
        <div className="text-center py-10">
          <p className="text-slate-600 dark:text-slate-400">No trending movies available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default TrendingMovies;
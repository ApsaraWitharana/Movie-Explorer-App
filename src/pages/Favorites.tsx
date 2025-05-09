import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useMovie } from '../contexts/MovieContext';
import MovieGrid from '../components/MovieGrid';

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites } = useMovie();

  const handleRemoveFavorite = (id: number) => {
    removeFromFavorites(id);
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Favorite Movies
        </h1>
        
        <div className="flex items-center text-primary-600 dark:text-primary-400">
          <Heart className="w-5 h-5 mr-2" fill="currentColor" />
          <span className="font-medium">{favorites.length} saved</span>
        </div>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow">
          <Heart className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h2 className="text-2xl font-medium text-slate-700 dark:text-slate-300 mb-2">
            Your favorites list is empty
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Start exploring movies and add some to your favorites
          </p>
          <Link to="/" className="btn-primary px-6 py-3">
            Discover Movies
          </Link>
        </div>
      ) : (
        <>
          <MovieGrid 
            movies={favorites} 
            onRemoveFavorite={handleRemoveFavorite} 
            showFavoriteControls
          />
        </>
      )}
    </div>
  );
};

export default Favorites;
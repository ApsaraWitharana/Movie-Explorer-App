import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import type {Movie} from '../types/movie';
import Rating from './Rating';

interface MovieGridProps {
  movies: Movie[];
  onRemoveFavorite?: (id: number) => void;
  showFavoriteControls?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  onRemoveFavorite,
  showFavoriteControls = false
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie) => (
        <div 
          key={movie.id} 
          className="movie-card animate-slide-up"
          style={{ animationDelay: `${(movies.indexOf(movie) % 10) * 0.05}s` }}
        >
          <Link to={`/movie/${movie.id}`} className="relative block">
            <div className="relative aspect-[2/3] overflow-hidden bg-slate-200 dark:bg-slate-700">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-slate-400 text-sm">{movie.title}</span>
                </div>
              )}
              
              {/* Rating overlay */}
              {movie.vote_average > 0 && (
                <div className="absolute top-2 right-2">
                  <Rating value={movie.vote_average} />
                </div>
              )}
              
              {/* Favorite remove button */}
              {showFavoriteControls && onRemoveFavorite && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemoveFavorite(movie.id);
                  }}
                  className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-accent-600 text-white rounded-full transition-colors"
                  aria-label={`Remove ${movie.title} from favorites`}
                >
                  <X size={16} />
                </button>
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            
            {/* Movie info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <h3 className="font-medium text-sm truncate">
                {movie.title}
              </h3>
              <div className="text-xs text-white/80">
                {movie.release_date && (
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
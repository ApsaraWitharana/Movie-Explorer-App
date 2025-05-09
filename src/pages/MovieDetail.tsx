import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, Heart, Film, ArrowLeft } from 'lucide-react';
import { useMovie } from '../contexts/MovieContext';
import LoadingSpinner from '../components/LoadingSpinner';
import type {MovieDetails} from '../types/movie';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovieDetails, addToFavorites, removeFromFavorites, favorites } = useMovie();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isFavorite = favorites.some(m => m.id === Number(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const movieData = await getMovieDetails(Number(id));
        setMovie(movieData);
        // Set page title to movie name
        document.title = `${movieData.title} - Movie Explorer`;
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
    
    // Reset title when component unmounts
    return () => {
      document.title = 'Movie Explorer';
    };
  }, [id, getMovieDetails]);

  const handleFavoriteToggle = () => {
    if (!movie) return;
    
    if (isFavorite) {
      removeFromFavorites(Number(id));
    } else {
      addToFavorites(movie);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container py-20 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container py-10">
        <div className="bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error || 'Movie not found'}</p>
          <button onClick={goBack} className="btn-primary mt-4">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Backdrop */}
      <div 
        className="w-full h-[50vh] bg-cover bg-center relative"
        style={{
          backgroundImage: movie.backdrop_path 
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
            : 'none',
          backgroundColor: !movie.backdrop_path ? '#0c4a6e' : undefined
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 dark:to-slate-950"></div>
        
        <button 
          onClick={goBack}
          className="absolute top-4 left-4 z-10 flex items-center justify-center w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <div className="container relative -mt-36 z-10 pb-16">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex p-6">
            {/* Poster */}
            <div className="md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
              <div className="w-64 h-96 rounded-lg overflow-hidden shadow-lg">
                {movie.poster_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={`${movie.title} poster`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
                    <Film size={48} className="text-slate-400" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Movie Info */}
            <div className="md:w-2/3 md:pl-8">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  {movie.title}
                </h1>
                <button 
                  onClick={handleFavoriteToggle}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite 
                      ? 'bg-accent-100 text-accent-600 dark:bg-accent-900 dark:text-accent-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-accent-100 hover:text-accent-600 dark:hover:bg-accent-900 dark:hover:text-accent-400'
                  }`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              {movie.tagline && (
                <p className="text-lg italic text-slate-600 dark:text-slate-400 mt-2">
                  "{movie.tagline}"
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                {movie.vote_average > 0 && (
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                  </div>
                )}
                
                {movie.runtime > 0 && (
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-slate-500 mr-1" />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
                
                {movie.release_date && (
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-slate-500 mr-1" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {movie.genres?.map(genre => (
                  <span 
                    key={genre.id} 
                    className="badge-primary"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>
              
              {/* Additional Details */}
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Production</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      {movie.production_companies.map(company => company.name).join(', ')}
                    </p>
                  </div>
                )}
                
                {movie.production_countries && movie.production_countries.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Country</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      {movie.production_countries.map(country => country.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
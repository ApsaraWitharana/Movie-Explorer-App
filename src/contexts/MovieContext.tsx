import React, { createContext, useContext, useState, useCallback } from 'react';
import { tmdbApi } from '../services/tmdbApi';
import type {Movie, MovieDetails} from '../types/movie';

interface MovieContextType {
  searchResults: Movie[];
  trendingMovies: Movie[];
  favorites: Movie[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchMovies: (query: string, page?: number, append?: boolean) => Promise<void>;
  getTrendingMovies: () => Promise<void>;
  getMovieDetails: (id: number) => Promise<MovieDetails>;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: number) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};

interface MovieProviderProps {
  children: React.ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Load favorites from localStorage
  const loadFavorites = (): Movie[] => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (err) {
      console.error('Error loading favorites:', err);
      return [];
    }
  };
  
  const [favorites, setFavorites] = useState<Movie[]>(loadFavorites);
  
  // Save favorites to localStorage
  const saveFavorites = (movies: Movie[]) => {
    localStorage.setItem('favorites', JSON.stringify(movies));
  };

  const searchMovies = useCallback(async (query: string, page = 1, append = false) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await tmdbApi.searchMovies(query, page);
      
      if (append) {
        setSearchResults(prev => [...prev, ...data.results]);
      } else {
        setSearchResults(data.results);
      }
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to search movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTrendingMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await tmdbApi.getTrending();
      setTrendingMovies(data.results);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
      setError('Failed to load trending movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMovieDetails = async (id: number): Promise<MovieDetails> => {
    try {
      return await tmdbApi.getMovieDetails(id);
    } catch (err) {
      console.error('Error fetching movie details:', err);
      throw new Error('Failed to load movie details');
    }
  };

  const addToFavorites = (movie: Movie) => {
    setFavorites(prev => {
      // Check if movie is already in favorites
      if (prev.some(m => m.id === movie.id)) {
        return prev;
      }
      
      const updatedFavorites = [...prev, movie];
      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(prev => {
      const updatedFavorites = prev.filter(movie => movie.id !== id);
      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  return (
    <MovieContext.Provider
      value={{
        searchResults,
        trendingMovies,
        favorites,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        searchMovies,
        getTrendingMovies,
        getMovieDetails,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
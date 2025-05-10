import axios from 'axios';
import type {Movie, MovieDetails, TMDBResponse} from '../types/movie';

// NOTE: In a real application, this would be stored in environment variables
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'; // This is a public demo key for TMDb
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const tmdbApi = {
  searchMovies: async (query: string, page = 1): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbInstance.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return response.data;
  },
  
  getTrending: async (): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbInstance.get('/trending/movie/day');
    return response.data;
  },
  
  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const response = await tmdbInstance.get(`/movie/${id}`);
    return response.data;
  },
  
  // Additional endpoints can be added as needed
  getUpcoming: async (): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbInstance.get('/movie/upcoming');
    return response.data;
  },
  
  getTopRated: async (): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbInstance.get('/movie/top_rated');
    return response.data;
  },
};

/**
 #* @author : sachini apsara
 #* @date : 2024-05-09
 #* @project : Movie Explorer (Loons Lab)
 #**/
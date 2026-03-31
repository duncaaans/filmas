import axios from "axios";
import type { Movie, MoviesResponse } from "./types";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await tmdbApi.get<MoviesResponse>("/movie/popular", {
    params: {
      api_key: apiKey,
    },
  });

  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await tmdbApi.get<MoviesResponse>("/search/movie", {
    params: {
      api_key: apiKey,
      query,
    },
  });

  return response.data.results;
};

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const pagesToLoad = [1, 2, 3, 4, 5];

  const responses = await Promise.all(
    pagesToLoad.map((page) =>
      tmdbApi.get<MoviesResponse>("/movie/upcoming", {
        params: {
          api_key: apiKey,
          page,
        },
      })
    )
  );

  const allMovies = responses.flatMap((response) => response.data.results);

  const uniqueMovies = allMovies.filter(
    (movie, index, self) =>
      index === self.findIndex((item) => item.id === movie.id)
  );

  return uniqueMovies;
};

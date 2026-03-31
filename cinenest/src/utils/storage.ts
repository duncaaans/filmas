import type { Movie } from "../features/movies/types";

const FAVORITES_KEY = "favorite_movies";

export const getFavorites = (): Movie[] => {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = (movies: Movie[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies));
};

export const toggleFavoriteMovie = (movie: Movie): Movie[] => {
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === movie.id);

  const updated = exists
    ? favorites.filter((item) => item.id !== movie.id)
    : [...favorites, movie];

  saveFavorites(updated);
  return updated;
};

import type { Movie } from "./types";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  onToggleFavorite: (movie: Movie) => void;
  favoriteIds: number[];
  emptyMessage?: string;
  theme: "dark" | "light";
}

function MovieGrid({
  movies,
  onSelect,
  onToggleFavorite,
  favoriteIds,
  emptyMessage = "🔍 Nav atrasta neviena filma. Pamēģini citu nosaukumu.",
  theme,
}: MovieGridProps) {
  const isDark = theme === "dark";

  if (movies.length === 0) {
    return (
      <div
        className={`rounded-2xl p-6 text-center ${
          isDark
            ? "bg-zinc-800 text-zinc-400"
            : "border border-white/40 bg-white/90 text-zinc-600 backdrop-blur"
        }`}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          favoriteIds={favoriteIds}
          theme={theme}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
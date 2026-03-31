import type { Movie } from "./types";
import { getImageUrl } from "../../utils/image";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onToggleFavorite: (movie: Movie) => void;
  favoriteIds: number[];
  theme: "dark" | "light";
}

function MovieCard({
  movie,
  onSelect,
  onToggleFavorite,
  favoriteIds,
  theme,
}: MovieCardProps) {
  const isFavorite = favoriteIds.includes(movie.id);
  const isDark = theme === "dark";

  const today = new Date();
  const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
  const isComingSoon = releaseDate ? releaseDate > today : false;

  return (
    <div
      className={`overflow-hidden rounded-3xl shadow-lg transition duration-300 hover:-translate-y-2 hover:scale-[1.03] ${
        isDark
          ? "bg-zinc-800 hover:bg-zinc-700"
          : "border border-white/40 bg-white/90 backdrop-blur hover:bg-white"
      }`}
    >
      <div className="relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="h-80 w-full object-cover"
        />

        {isComingSoon && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-300 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-md">
            Drīzumā
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3
            className={
              isDark
                ? "line-clamp-1 text-lg font-semibold text-zinc-100"
                : "line-clamp-1 text-lg font-semibold text-zinc-900"
            }
          >
            {movie.title}
          </h3>
          <p className={isDark ? "text-sm text-zinc-400" : "text-sm text-zinc-600"}>
            {movie.release_date || "Datums nav zināms"}
          </p>
        </div>

        <p className={isDark ? "text-sm text-zinc-300" : "text-sm text-zinc-700"}>
          ⭐ {movie.vote_average.toFixed(1)}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onSelect(movie)}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
              isDark
                ? "bg-zinc-900 text-zinc-100 hover:bg-zinc-950"
                : "bg-rose-50 text-zinc-900 hover:bg-rose-100"
            }`}
          >
            Detaļas
          </button>

          <button
            onClick={() => onToggleFavorite(movie)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              isFavorite
                ? "bg-rose-300 text-zinc-900"
                : isDark
                ? "bg-zinc-900 text-zinc-100 hover:bg-zinc-950"
                : "bg-rose-50 text-zinc-900 hover:bg-rose-100"
            }`}
          >
            {isFavorite ? "Saglabāts" : "Favorīts"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;

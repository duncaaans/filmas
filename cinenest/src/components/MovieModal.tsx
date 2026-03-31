import type { Movie } from "../features/movies/types";
import { getImageUrl } from "../utils/image";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  theme: "dark" | "light";
}

function MovieModal({ movie, onClose, theme }: MovieModalProps) {
  if (!movie) return null;

  const isDark = theme === "dark";

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          className={`relative w-full max-w-4xl rounded-3xl p-6 shadow-2xl ${
            isDark ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-900"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Aizvērt"
            className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-xl shadow-md transition ${
              isDark
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black"
            }`}
          >
            ✕
          </button>

          <div className="grid gap-6 pt-8 md:grid-cols-2">
            <div>
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full rounded-2xl object-cover shadow-lg"
              />
            </div>

            <div>
              <h2 className="pr-12 text-3xl font-bold text-rose-300">
                {movie.title}
              </h2>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span
                  className={`rounded-full px-3 py-1 ${
                    isDark
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-rose-50 text-zinc-700"
                  }`}
                >
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>

                <span
                  className={`rounded-full px-3 py-1 ${
                    isDark
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-rose-50 text-zinc-700"
                  }`}
                >
                  📅 {movie.release_date || "Nav zināms"}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-lg font-semibold text-rose-300">
                  Apraksts
                </h3>
                <p
                  className={
                    isDark
                      ? "leading-7 text-zinc-300"
                      : "leading-7 text-zinc-700"
                  }
                >
                  {movie.overview || "Apraksts nav pieejams."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
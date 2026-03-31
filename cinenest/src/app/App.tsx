import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieModal from "../components/MovieModal";
import FilterBar from "../components/FilterBar";
import MovieGrid from "../features/movies/MovieGrid";
import {
  getPopularMovies,
  getUpcomingMovies,
  searchMovies,
} from "../features/movies/api";
import type { Movie } from "../features/movies/types";
import { getFavorites, toggleFavoriteMovie } from "../utils/storage";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"home" | "favorites">("home");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "dark" ? "#18181b" : "#fff1f2";
  }, [theme]);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPopularMovies();
      setMovies(data);
    } catch {
      setError("Neizdevās ielādēt filmas.");
    } finally {
      setLoading(false);
    }
  };

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError("");

      const [popularData, upcomingData] = await Promise.all([
        getPopularMovies(),
        getUpcomingMovies(),
      ]);

      setMovies(popularData);
      setUpcomingMovies(upcomingData);
      setFavorites(getFavorites());
    } catch {
      setError("Neizdevās ielādēt filmas.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleToggleFavorite = (movie: Movie) => {
    const updated = toggleFavoriteMovie(movie);
    setFavorites(updated);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchMovies = async () => {
        if (!searchTerm.trim()) {
          await loadPopularMovies();
          return;
        }

        try {
          setLoading(true);
          setError("");
          const data = await searchMovies(searchTerm);
          setMovies(data);
        } catch {
          setError("Neizdevās atrast filmas.");
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const favoriteIds = favorites.map((movie) => movie.id);

  const processMovies = (movieList: Movie[]) => {
    const processedMovies = [...movieList];

    switch (sortOption) {
      case "rating-desc":
        return processedMovies.sort((a, b) => b.vote_average - a.vote_average);

      case "title-asc":
        return processedMovies.sort((a, b) => a.title.localeCompare(b.title));

      case "date-desc":
        return processedMovies.sort((a, b) =>
          (b.release_date || "").localeCompare(a.release_date || "")
        );

      default:
        return processedMovies;
    }
  };

  const filteredUpcomingMovies = useMemo(() => {
    const todayString = new Date().toISOString().split("T")[0];

    let result = upcomingMovies.filter((movie) => {
      if (!movie.release_date) return false;
      return movie.release_date > todayString;
    });

    if (searchTerm.trim()) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result.sort((a, b) =>
      (a.release_date || "").localeCompare(b.release_date || "")
    );
  }, [upcomingMovies, searchTerm]);

  const sortedMovies = useMemo(
    () => processMovies(movies),
    [movies, sortOption]
  );

  const sortedFavorites = useMemo(
    () => processMovies(favorites),
    [favorites, sortOption]
  );

  const isDark = theme === "dark";

  const getHomeMovies = () => {
    if (sortOption === "coming-soon") {
      return filteredUpcomingMovies;
    }
    return sortedMovies;
  };

  return (
    <div
      className={
        isDark
          ? "min-h-[100dvh] bg-zinc-900 text-zinc-100"
          : "min-h-[100dvh] bg-gradient-to-br from-rose-50 via-white to-pink-100 text-zinc-900"
      }
    >
      <Navbar
        currentView={currentView}
        onChangeView={setCurrentView}
        onLogoClick={() => {
          setCurrentView("home");
          setSearchTerm("");
          setSortOption("default");
          loadInitialData();
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <section
          className={`mb-8 rounded-3xl p-6 shadow-lg ${
            isDark
              ? "bg-zinc-800"
              : "border border-white/40 bg-white/80 shadow-xl backdrop-blur"
          }`}
        >
          <h2 className="text-3xl font-bold text-rose-300">CineNest 🎬</h2>
          <p className={isDark ? "mt-2 text-zinc-400" : "mt-2 text-zinc-600"}>
            Atrodi filmas, saglabā favorītus un izpēti detaļas.
          </p>

          {currentView === "home" && (
            <div className="mt-6">
              <SearchBar
                value={searchTerm}
                onChange={handleSearchTermChange}
                theme={theme}
              />
            </div>
          )}
        </section>

        <FilterBar
          sortOption={sortOption}
          onChangeSort={setSortOption}
          onReset={() => {
            setSortOption("default");
            setSearchTerm("");
            loadInitialData();
          }}
          theme={theme}
        />

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <Loading theme={theme} />
        ) : currentView === "home" ? (
          <MovieGrid
            movies={getHomeMovies()}
            onSelect={setSelectedMovie}
            onToggleFavorite={handleToggleFavorite}
            favoriteIds={favoriteIds}
            emptyMessage={
              sortOption === "coming-soon"
                ? "🎬 Šobrīd nav atrasta neviena filma ar statusu “Drīzumā”."
                : "🔍 Nav atrasta neviena filma. Pamēģini citu nosaukumu."
            }
            theme={theme}
          />
        ) : (
          <MovieGrid
            movies={sortedFavorites}
            onSelect={setSelectedMovie}
            onToggleFavorite={handleToggleFavorite}
            favoriteIds={favoriteIds}
            emptyMessage="⭐ Tev vēl nav pievienota neviena filma favorītiem."
            theme={theme}
          />
        )}
      </main>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        theme={theme}
      />
    </div>
  );
}

export default App;

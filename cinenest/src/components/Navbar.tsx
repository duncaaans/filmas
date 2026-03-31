interface NavbarProps {
  currentView: "home" | "favorites";
  onChangeView: (view: "home" | "favorites") => void;
  onLogoClick: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

function Navbar({
  currentView,
  onChangeView,
  onLogoClick,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-20 border-b backdrop-blur ${
        isDark
          ? "border-zinc-800 bg-zinc-900/90"
          : "border-white/40 bg-white/70 shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* 🔥 LOGO */}
        <div
          onClick={onLogoClick}
          className="cursor-pointer select-none"
        >
          <h1 className="text-2xl font-bold tracking-tight text-rose-300 hover:opacity-80 transition">
            CineNest
          </h1>
          <p className={isDark ? "text-sm text-zinc-400" : "text-sm text-zinc-600"}>
            Movie explorer app
          </p>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex gap-2">
            <button
              onClick={() => onChangeView("home")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                currentView === "home"
                  ? "bg-rose-300 text-zinc-900"
                  : isDark
                  ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                  : "border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50"
              }`}
            >
              Sākumlapa
            </button>

            <button
              onClick={() => onChangeView("favorites")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                currentView === "favorites"
                  ? "bg-rose-300 text-zinc-900"
                  : isDark
                  ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                  : "border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50"
              }`}
            >
              Favorīti
            </button>
          </nav>

          <button
            onClick={onToggleTheme}
            className={`rounded-xl border px-3 py-2 text-sm shadow-sm transition ${
              isDark
                ? "border-zinc-700 bg-zinc-800 text-yellow-300 hover:bg-zinc-700"
                : "border-rose-200 bg-white text-zinc-800 hover:bg-rose-50"
            }`}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

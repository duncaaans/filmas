interface FilterBarProps {
  sortOption: string;
  onChangeSort: (value: string) => void;
  onReset: () => void;
  theme: "dark" | "light";
}

function FilterBar({
  sortOption,
  onChangeSort,
  onReset,
  theme,
}: FilterBarProps) {
  const isDark = theme === "dark";

  return (
    <div className="mb-6 flex justify-end">
      <div className="flex items-center gap-2">
        
        <select
          value={sortOption}
          onChange={(e) => onChangeSort(e.target.value)}
          className={`rounded-2xl px-4 py-2 outline-none transition ${
            isDark
              ? "border border-zinc-700 bg-zinc-800 text-zinc-100"
              : "border-2 border-rose-200 bg-white text-zinc-900 shadow-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
          }`}
        >
          <option value="default">Noklusējums</option>
          <option value="rating-desc">Pēc reitinga</option>
          <option value="title-asc">Pēc nosaukuma</option>
          <option value="date-desc">Jaunākās</option>
          <option value="coming-soon">Tikai drīzumā</option>
        </select>

        <button
          onClick={onReset}
          className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
            isDark
              ? "border border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
              : "border-2 border-rose-200 bg-white text-zinc-900 shadow-sm hover:bg-rose-50 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
          }`}
        >
          Notīrīt
        </button>
      </div>
    </div>
  );
}

export default FilterBar;

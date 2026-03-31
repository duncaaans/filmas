interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  theme: "dark" | "light";
}

function SearchBar({ value, onChange, theme }: SearchBarProps) {
  const isDark = theme === "dark";

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Meklē filmu..."
        className={`w-full rounded-2xl px-4 py-3 outline-none transition ${
          isDark
            ? "border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-rose-300"
            : "border-2 border-rose-200 bg-white text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
        }`}
      />
    </div>
  );
}

export default SearchBar;

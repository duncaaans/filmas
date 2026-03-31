interface LoadingProps {
  theme: "dark" | "light";
}

function Loading({ theme }: LoadingProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 animate-pulse ${
        isDark ? "text-zinc-400" : "text-zinc-600"
      }`}
    >
      <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-rose-300 border-t-transparent"></div>
      <p>Ielādē filmas...</p>
    </div>
  );
}

export default Loading;

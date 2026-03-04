export function ResourceToolbar({
  searchTerm,
  onSearchChange
}) {
  return (
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-bold">
        Meus Materiais
      </h2>

      <div className="relative w-80 md:w-96">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Buscar por título ou tag..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#1f1c2b] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b85f9]"
        />
      </div>
    </div>
  );
}
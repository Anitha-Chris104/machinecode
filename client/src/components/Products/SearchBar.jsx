import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search industrial machines..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-white
          py-4
          pl-14
          pr-5
          text-gray-700
          shadow-sm
          outline-none
          transition
          duration-300
          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-100
        "
      />
    </div>
  );
};

export default SearchBar;

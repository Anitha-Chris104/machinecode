const categories = [
  "All",
  "Food Processing",
  "Material Handling",
  "Heating Equipment",
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`
            rounded-full
            px-6
            py-3
            text-sm
            font-medium
            transition-all
            duration-300

            ${
              selectedCategory === category
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:border-orange-500 hover:text-orange-500"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

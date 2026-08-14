import { ArrowUpDown, Factory } from "lucide-react";

const industries = [
  "All Industries",
  "Food Processing",
  "Material Handling",
  "Industrial Heating",
];

const ProductFilter = ({
  selectedIndustry,
  setSelectedIndustry,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Heading */}
        <div>
          <h3 className="text-xl font-bold text-[#0D244D]">Filter Products</h3>
          <p className="mt-1 text-sm text-gray-500">
            Quickly find the machine you need.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Industry */}
          <div className="relative">
            <Factory
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="h-12 rounded-xl border border-gray-300 pl-10 pr-8 text-sm outline-none focus:border-[#C2441C]"
            >
              {industries.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 rounded-xl border border-gray-300 pl-10 pr-8 text-sm outline-none focus:border-[#C2441C]"
            >
              <option value="default">Default</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

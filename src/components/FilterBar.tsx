"use client";

import { CATEGORY_LABELS, ToolCategory } from "@/types";
import { Search, LayoutGrid, Coins, ArrowUpDown } from "lucide-react";

export interface Filters {
  search: string;
  category: ToolCategory | "all";
  minPrice: string;
  maxPrice: string;
  sort: "newest" | "price-asc" | "price-desc" | "rating";
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function FilterBar({ filters, onChange }: Props) {
  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-ink/8 bg-white p-5 shadow-sm md:flex-row md:items-end md:gap-4">
      
      <div className="flex-1">
        <label htmlFor="search" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-soft/80">
          Search Tools
        </label>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/45" />
          <input
            id="search"
            type="text"
            placeholder="Drill, tent, speaker..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="focus-ring w-full rounded-xl border border-ink/12 bg-bone/20 py-2.5 pl-10 pr-4 text-sm text-ink outline-none placeholder:text-ink-soft/45 transition-colors focus:border-amber focus:bg-white"
          />
        </div>
      </div>

      
      <div className="md:w-52">
        <label htmlFor="category" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-soft/80">
          Category
        </label>
        <div className="relative">
          <LayoutGrid size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/45 pointer-events-none" />
          <select
            id="category"
            value={filters.category}
            onChange={(e) => update({ category: e.target.value as Filters["category"] })}
            className="focus-ring w-full appearance-none rounded-xl border border-ink/12 bg-bone/20 py-2.5 pl-10 pr-10 text-sm text-ink outline-none transition-colors focus:border-amber focus:bg-white"
          >
            <option value="all">All categories</option>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 border-l border-ink/10 pl-2 text-ink-soft/45">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>
      </div>

      
      <div className="flex gap-3.5 md:w-48">
        <div className="flex-1">
          <label htmlFor="minPrice" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-soft/80">
            Min Price
          </label>
          <div className="relative">
            <Coins size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/45 pointer-events-none" />
            <input
              id="minPrice"
              type="number"
              min={0}
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => update({ minPrice: e.target.value })}
              className="focus-ring w-full rounded-xl border border-ink/12 bg-bone/20 py-2.5 pl-8 pr-3 text-sm text-ink outline-none transition-colors focus:border-amber focus:bg-white"
            />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="maxPrice" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-soft/80">
            Max Price
          </label>
          <div className="relative">
            <Coins size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/45 pointer-events-none" />
            <input
              id="maxPrice"
              type="number"
              min={0}
              placeholder="Any"
              value={filters.maxPrice}
              onChange={(e) => update({ maxPrice: e.target.value })}
              className="focus-ring w-full rounded-xl border border-ink/12 bg-bone/20 py-2.5 pl-8 pr-3 text-sm text-ink outline-none transition-colors focus:border-amber focus:bg-white"
            />
          </div>
        </div>
      </div>

      
      <div className="md:w-52">
        <label htmlFor="sort" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-soft/80">
          Sort by
        </label>
        <div className="relative">
          <ArrowUpDown size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/45 pointer-events-none" />
          <select
            id="sort"
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value as Filters["sort"] })}
            className="focus-ring w-full appearance-none rounded-xl border border-ink/12 bg-bone/20 py-2.5 pl-10 pr-10 text-sm text-ink outline-none transition-colors focus:border-amber focus:bg-white"
          >
            <option value="newest">Newest Listed</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 border-l border-ink/10 pl-2 text-ink-soft/45">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import SkeletonCard from "@/components/SkeletonCard";
import FilterBar, { Filters } from "@/components/FilterBar";
import { api } from "@/lib/api";
import { Tool, ToolListResponse, ToolCategory } from "@/types";

import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

function ExploreContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [filters, setFilters] = useState<Filters>({
        search: searchParams.get("search") || "",
        category: (searchParams.get("category") as ToolCategory | "all") || "all",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        sort: (searchParams.get("sort") as Filters["sort"]) || "newest",
    });
    const [page, setPage] = useState(1);
    const [tools, setTools] = useState<Tool[]>([]);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchTools = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters.search) params.set("search", filters.search);
        if (filters.category !== "all") params.set("category", filters.category);
        if (filters.minPrice) params.set("minPrice", filters.minPrice);
        if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
        params.set("sort", filters.sort);
        params.set("page", String(page));
        params.set("limit", "8");

        try {
            const data = await api.get<ToolListResponse>(`/api/tools?${params.toString()}`);
            setTools(data.tools);
            setPages(data.pagination.pages);
            setTotal(data.pagination.total);
        } catch {
            setTools([]);
        } finally {
            setLoading(false);
        }
    }, [filters, page]);

    useEffect(() => {
        fetchTools();
    }, [fetchTools]);

    useEffect(() => {
        setPage(1);
    }, [filters]);

    const handleFilterChange = (next: Filters) => {
        setFilters(next);
        const params = new URLSearchParams();
        if (next.search) params.set("search", next.search);
        if (next.category !== "all") params.set("category", next.category);
        router.replace(`/tools?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="mb-8">
                <span className="section-badge border-moss/20 bg-moss/5 text-moss mb-3">
                    <Sparkles size={11} className="text-amber-500 mr-1.5 animate-pulse" />
                    Collective Inventory
                </span>
                <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Explore tools</h1>
                <p className="mt-2 text-sm text-ink-soft/90">
                    {loading ? "Searching for tools..." : `${total} high-quality ${total === 1 ? "tool" : "tools"} available nearby`}
                </p>
            </div>

            <div className="mt-6">
                <FilterBar filters={filters} onChange={handleFilterChange} />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                ) : tools.length > 0 ? (
                    tools.map((tool) => <ToolCard key={tool._id} tool={tool} />)
                ) : (
                    <div className="col-span-full rounded-2xl border border-dashed border-ink/15 bg-white py-20 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bone-soft text-ink-soft/65 mb-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
                        </div>
                        <p className="font-display text-2xl font-bold text-ink">No tools match your search</p>
                        <p className="mt-2 text-sm text-ink-soft max-w-md mx-auto">Try refining your search keyword, choosing a different category, or broadening your price range.</p>
                    </div>
                )}
            </div>

            {!loading && pages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-ink/12 bg-white text-ink transition-colors hover:bg-bone-soft disabled:opacity-40"
                        aria-label="Previous page"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: pages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`focus-ring h-10 w-10 rounded-xl text-sm font-semibold transition-all ${page === i + 1 ? "bg-moss text-bone shadow-md shadow-moss/10" : "border border-ink/12 bg-white text-ink hover:bg-bone-soft"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((p) => Math.min(pages, p + 1))}
                        disabled={page === pages}
                        className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-ink/12 bg-white text-ink transition-colors hover:bg-bone-soft disabled:opacity-40"
                        aria-label="Next page"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default function ExplorePage() {
    return (
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">Loading...</div>}>
            <ExploreContent />
        </Suspense>
    );
}

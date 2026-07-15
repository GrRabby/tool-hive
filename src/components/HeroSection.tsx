"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";


const sliderItems = [
    {
        url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1200",
        title: "DeWalt Heavy Duty Power Drills",
        category: "Power Tools",
    },
    {
        url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
        title: "Canon DSLR camera kit including the standard 18-55mm lens.",
        category: "Electronics",
    },
    {
        url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=1200",
        title: "Pro Audio Studio Speakers",
        category: "Events & Sound",
    },
];

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % sliderItems.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % sliderItems.length);
    };

    return (
        <section className="relative flex min-h-[62vh] flex-col justify-center overflow-hidden bg-moss text-bone">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #F1EFE8 1.5px, transparent 1.5px)",
                    backgroundSize: "28px 28px",
                }}
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-500" />

            <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">

                
                <div className="relative z-10 space-y-6 lg:col-span-7">

                    
                    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 shadow-sm animate-pulse">
                        <Sparkles size={12} className="text-amber-400" />
                        Community-Run Tool Ecosystem
                    </span>

                    <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-[1.05]">
                        Borrow before <br />
                        <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                            you commit to buy.
                        </span>
                    </h1>

                    <p className="max-w-xl text-base leading-relaxed text-zinc-300">
                        ToolHive connects vetted neighbors who own high-quality tools and equipment with
                        creators who need them — safely secured for an afternoon, a weekend, or a custom project duration.
                    </p>

                    
                    <form action="/tools" className="mt-8 flex max-w-xl flex-col gap-2.5 sm:flex-row p-1.5 bg-zinc-950/60 rounded-xl border border-zinc-800 shadow-xl backdrop-blur-sm">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="text"
                                name="search"
                                placeholder="Search for a high-drive drill, tent, sound system..."
                                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm font-medium text-white outline-none placeholder:text-zinc-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="rounded-lg bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-amber-400 active:scale-[0.98] shadow-md shadow-amber-500/10 flex items-center justify-center gap-2"
                        >
                            Execute Search
                        </button>
                    </form>

                    
                    <div className="flex flex-wrap gap-5 pt-2 text-xs font-bold uppercase tracking-wider">
                        <Link href="/tools" className="group flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950/30 px-3.5 py-2 text-zinc-300 transition-colors hover:text-amber-400 hover:border-zinc-700">
                            Browse Collective Inventory <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link href="/items/add" className="group flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950/30 px-3.5 py-2 text-zinc-300 transition-colors hover:text-amber-400 hover:border-zinc-700">
                            List Personal Gear <PlusCircle size={14} className="text-zinc-500 group-hover:text-amber-400" />
                        </Link>
                    </div>
                </div>

                
                <div className="relative hidden lg:col-span-5 lg:block h-[420px] w-full">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 p-2 shadow-2xl">

                        
                        {sliderItems.map((item, idx) => (
                            <div
                                key={item.url}
                                className={`absolute inset-2 overflow-hidden rounded-xl transition-all duration-700 ease-in-out ${idx === currentIndex
                                    ? "opacity-100 scale-100 translate-x-0 z-10"
                                    : "opacity-0 scale-95 translate-x-4 pointer-events-none z-0"
                                    }`}
                            >
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="h-full w-full object-cover transform scale-105 motion-safe:animate-transform duration-[10000ms]"
                                />

                                
                                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                                    <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-400 border border-amber-500/20">
                                        {item.category}
                                    </span>
                                    <h3 className="mt-1.5 text-base font-bold text-white tracking-tight">
                                        {item.title}
                                    </h3>
                                    <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-zinc-400">
                                        <ShieldCheck size={13} className="text-amber-400" /> Verified Neighborhood Insurance Protection
                                    </div>
                                </div>
                            </div>
                        ))}

                        
                        <div className="absolute bottom-5 right-5 z-30 flex gap-1.5">
                            <button
                                onClick={handlePrev}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/80 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                                aria-label="Previous listing item"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/80 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                                aria-label="Next listing item"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        
                        <div className="absolute top-5 right-5 z-30 flex gap-1">
                            {sliderItems.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-6 bg-amber-500" : "w-1.5 bg-zinc-700"
                                        }`}
                                />
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}


function PlusCircle(props: React.ComponentProps<typeof ArrowRight>) {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={props.className} width={props.size} height={props.size}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
}
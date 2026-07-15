import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { Tool, PublicStats, CATEGORY_LABELS, ToolCategory } from "@/types";
import HeroSection from "@/components/HeroSection";
import AnimatedSteps from "@/components/AnimatedSteps";
import StatsCounter from "@/components/StatsCounter";
import TestimonialSection from "@/components/TestimonialSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Search, MessageCircle, RotateCcw, ArrowRight, Drill, Sprout, Tent, PartyPopper, Monitor, Package } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getFeatured(): Promise<Tool[]> {
    try {
        const res = await fetch(`${API_BASE}/api/tools/featured`, { cache: "no-store" });
        if (!res.ok) return [];
        const data = await res.json();
        return data.tools ?? [];
    } catch {
        return [];
    }
}

async function getStats(): Promise<PublicStats | null> {
    try {
        const res = await fetch(`${API_BASE}/api/tools/stats`, { cache: "no-store" });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

const categoryMeta: Record<ToolCategory, { icon: React.ReactNode; gradient: string }> = {
    "power-tools": {
        icon: <Drill size={30} strokeWidth={1.6} />,
        gradient: "from-amber/15 to-amber/5",
    },
    garden: {
        icon: <Sprout size={30} strokeWidth={1.6} />,
        gradient: "from-emerald-500/15 to-emerald-500/5",
    },
    camping: {
        icon: <Tent size={30} strokeWidth={1.6} />,
        gradient: "from-sky-500/15 to-sky-500/5",
    },
    "party-events": {
        icon: <PartyPopper size={30} strokeWidth={1.6} />,
        gradient: "from-rose-500/15 to-rose-500/5",
    },
    electronics: {
        icon: <Monitor size={30} strokeWidth={1.6} />,
        gradient: "from-violet-500/15 to-violet-500/5",
    },
    other: {
        icon: <Package size={30} strokeWidth={1.6} />,
        gradient: "from-zinc-400/15 to-zinc-400/5",
    },
};

const steps = [
    {
        n: "01",
        title: "Find what you need",
        body: "Search nearby listings by category, price, or keyword — from drills to tents to party speakers.",
        icon: <Search size={28} strokeWidth={1.8} />,
    },
    {
        n: "02",
        title: "Message the owner",
        body: "Check the details, confirm availability for your dates, and arrange a convenient pickup.",
        icon: <MessageCircle size={28} strokeWidth={1.8} />,
    },
    {
        n: "03",
        title: "Borrow, then return",
        body: "Use it for your project or trip, then return it in the same condition. Simple as that.",
        icon: <RotateCcw size={28} strokeWidth={1.8} />,
    },
];

const testimonials = [
    {
        quote: "I needed a pressure washer for one Saturday. Buying one made no sense. Found one three streets away for less than a car wash costs.",
        name: "Rafiq H.",
        role: "Borrowed a pressure washer",
        initials: "RH",
        accentColor: "#e8a33d",
    },
    {
        quote: "My drill sits in a drawer 350 days a year. Now it pays for itself and I've met three neighbors I'd never spoken to.",
        name: "Nadia S.",
        role: "Lists 4 tools",
        initials: "NS",
        accentColor: "#1f3d2b",
    },
    {
        quote: "Needed a tent for a weekend trip we booked last-minute. Had one reserved in ten minutes, picked it up that evening.",
        name: "Tanvir A.",
        role: "Borrowed a camping tent",
        initials: "TA",
        accentColor: "#35506b",
    },
];

export default async function Home() {
    const [featured, stats] = await Promise.all([getFeatured(), getStats()]);

    return (
        <div className="overflow-hidden">
            <HeroSection />

            
            <section className="relative py-20 sm:py-24">
                
                <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="text-center">
                            <span className="section-badge border-moss/20 bg-moss/5 text-moss">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                                Quick start
                            </span>
                            <h2 className="mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
                                How it works
                            </h2>
                            <p className="mx-auto mt-3 max-w-lg text-ink-soft">
                                Three steps, no middleman, no subscription. Borrow from your neighbors in minutes.
                            </p>
                        </div>
                    </ScrollReveal>

                    <AnimatedSteps steps={steps} />
                </div>
            </section>

            
            <section className="relative bg-white py-20 sm:py-24 section-divider-wave section-divider-wave-reverse">
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="text-center">
                            <span className="section-badge border-amber/30 bg-amber/10 text-amber-dark">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                                Browse
                            </span>
                            <h2 className="mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
                                Popular categories
                            </h2>
                            <p className="mx-auto mt-3 max-w-lg text-ink-soft">
                                Jump straight to what you&apos;re after — everything from power drills to party speakers.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                        {(Object.keys(CATEGORY_LABELS) as ToolCategory[]).map((cat, i) => (
                            <ScrollReveal key={cat} delay={i * 0.08}>
                                <Link
                                    href={`/tools?category=${cat}`}
                                    className={`category-card focus-ring group flex flex-col items-center justify-center gap-3 rounded-2xl border border-ink/8 bg-gradient-to-br ${categoryMeta[cat].gradient} p-6 text-center aspect-square`}
                                >
                                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-moss shadow-sm transition-all duration-300 group-hover:text-amber group-hover:shadow-md group-hover:scale-110 shrink-0">
                                        {categoryMeta[cat].icon}
                                    </span>
                                    <span className="text-sm font-semibold text-ink line-clamp-2 leading-tight">{CATEGORY_LABELS[cat]}</span>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="relative py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <span className="section-badge border-denim/20 bg-denim/8 text-denim">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.9L12 17.3 5.9 20.7l1.4-6.9L2.2 9.1l6.9-.8z" /></svg>
                                    Curated
                                </span>
                                <h2 className="mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
                                    Featured tools
                                </h2>
                                <p className="mt-3 max-w-lg text-ink-soft">
                                    Highly rated, recently listed — handpicked from your community.
                                </p>
                            </div>
                            <Link
                                href="/tools"
                                className="focus-ring group hidden items-center gap-2 rounded-full border border-moss/20 bg-moss/5 px-5 py-2.5 text-sm font-semibold text-moss transition-all hover:bg-moss hover:text-bone sm:flex"
                            >
                                View all tools
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </ScrollReveal>

                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {featured.length > 0 ? (
                            featured.map((tool, i) => (
                                <ScrollReveal key={tool._id} delay={i * 0.1}>
                                    <ToolCard tool={tool} />
                                </ScrollReveal>
                            ))
                        ) : (
                            <ScrollReveal className="col-span-full">
                                <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-ink/10 py-16 text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bone-soft text-ink-soft">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.3 7L12 12l8.7-5M12 22V12" /></svg>
                                    </div>
                                    <p className="text-sm text-ink-soft">
                                        No tools listed yet — be the first to{" "}
                                        <Link href="/items/add" className="font-semibold text-moss underline underline-offset-4 hover:text-amber">list one</Link>.
                                    </p>
                                </div>
                            </ScrollReveal>
                        )}
                    </div>

                    
                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            href="/tools"
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-moss/20 bg-moss/5 px-5 py-2.5 text-sm font-semibold text-moss"
                        >
                            View all tools <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            
            <section className="stats-mesh relative overflow-hidden py-24 text-bone sm:py-28">
                
                <div className="pointer-events-none absolute left-[10%] top-[20%] h-48 w-48 rounded-full bg-amber/8 blur-3xl animate-glow-pulse" />
                <div className="pointer-events-none absolute right-[15%] bottom-[15%] h-64 w-64 rounded-full bg-amber/5 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

                
                <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: "radial-gradient(circle, #F1EFE8 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }} />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="text-center">
                            <span className="section-badge border-amber/30 bg-amber/10 text-amber">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
                                Growing
                            </span>
                            <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
                                A growing community
                            </h2>
                            <p className="mx-auto mt-3 max-w-lg text-bone/60">
                                Real numbers from real neighbors sharing what they own.
                            </p>
                        </div>
                    </ScrollReveal>

                    <StatsCounter
                        stats={[
                            { value: stats?.totalTools ?? 0, label: "Tools listed by neighbors", suffix: "+" },
                            { value: stats?.totalCategories ?? 0, label: "Categories to browse" },
                            { value: stats?.totalLocations ?? 0, label: "Neighborhoods represented" },
                        ]}
                    />
                </div>
            </section>

            
            <section className="relative bg-white py-20 sm:py-24 section-divider-wave-reverse">
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="text-center">
                            <span className="section-badge border-denim/20 bg-denim/8 text-denim">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                Trusted
                            </span>
                            <h2 className="mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
                                Why ToolHive?
                            </h2>
                            <p className="mx-auto mt-3 max-w-lg text-ink-soft">
                                Built for communities that believe in sharing over hoarding.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
                                title: "Zero cost to join",
                                body: "No membership fees, no subscriptions. Create an account, browse, and borrow — completely free to start.",
                                accent: "bg-amber/10 text-amber-dark border-amber/20",
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
                                title: "Verified neighbors",
                                body: "Every lender goes through identity verification. You always know who you're borrowing from.",
                                accent: "bg-moss/8 text-moss border-moss/15",
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                                title: "Hyperlocal listings",
                                body: "Find tools within your neighborhood. No shipping, no waiting — just walk over and pick it up.",
                                accent: "bg-denim/8 text-denim border-denim/15",
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
                                title: "Flexible pricing",
                                body: "Lenders set their own daily rates. Many tools are listed for free — because community matters.",
                                accent: "bg-amber/10 text-amber-dark border-amber/20",
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
                                title: "Built on trust",
                                body: "Community ratings, borrower feedback, and transparent profiles keep everyone accountable.",
                                accent: "bg-moss/8 text-moss border-moss/15",
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>,
                                title: "Reduce waste",
                                body: "The average drill is used 13 minutes in its lifetime. Share instead of buy — your wallet and the planet win.",
                                accent: "bg-denim/8 text-denim border-denim/15",
                            },
                        ].map((benefit, i) => (
                            <ScrollReveal key={benefit.title} delay={i * 0.08}>
                                <div className="group flex h-full gap-4 rounded-2xl border border-ink/8 bg-bone/30 p-6 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5">
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${benefit.accent} transition-transform duration-300 group-hover:scale-110`}>
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-ink">{benefit.title}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{benefit.body}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="relative py-20 sm:py-24">
                <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="text-center">
                            <span className="section-badge border-moss/20 bg-moss/5 text-moss">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                                Voices
                            </span>
                            <h2 className="mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
                                What borrowers say
                            </h2>
                            <p className="mx-auto mt-3 max-w-lg text-ink-soft">
                                Don&apos;t take our word for it — hear from people in your community.
                            </p>
                        </div>
                    </ScrollReveal>

                    <TestimonialSection testimonials={testimonials} />
                </div>
            </section>

            
            <section className="relative px-4 pb-20 sm:px-6 sm:pb-24">
                <ScrollReveal>
                    <div className="cta-gradient mx-auto max-w-5xl rounded-3xl p-10 sm:p-14">
                        <div className="relative z-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
                            <div className="max-w-md">
                                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                                    Have tools gathering dust?
                                </h2>
                                <p className="mt-3 text-base leading-relaxed text-bone/70">
                                    List them today and start earning from what you already own. Your neighbors will thank you.
                                </p>
                            </div>
                            <Link
                                href="/items/add"
                                className="focus-ring group shrink-0 flex items-center gap-2 rounded-xl bg-amber px-8 py-4 text-sm font-bold uppercase tracking-wider text-ink shadow-lg shadow-amber/20 transition-all hover:bg-white hover:text-moss hover:shadow-xl active:scale-[0.98]"
                            >
                                List a Tool
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        
                        <div className="pointer-events-none absolute right-8 top-8 h-20 w-20 rounded-full border border-dashed border-bone/10" />
                        <div className="pointer-events-none absolute right-12 top-12 h-12 w-12 rounded-full border border-dashed border-bone/10" />
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}

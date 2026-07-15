"use client";

import { useEffect, useRef, useState } from "react";

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    initials: string;
    accentColor: string;
}

export default function TestimonialSection({ testimonials }: { testimonials: Testimonial[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="mt-12 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
                <figure
                    key={t.name}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white p-7 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(40px)",
                        transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s, box-shadow 0.3s ease`,
                    }}
                >
                    
                    <span className="absolute -top-2 right-4 font-display text-[80px] font-bold leading-none text-amber/10 select-none pointer-events-none">
                        &ldquo;
                    </span>

                    
                    <div
                        className="absolute left-0 top-0 h-1 w-full transition-all duration-300 group-hover:h-1.5"
                        style={{ background: t.accentColor }}
                    />

                    
                    <div className="mb-3 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, si) => (
                            <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-amber)" className="opacity-80">
                                <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.9L12 17.3 5.9 20.7l1.4-6.9L2.2 9.1l6.9-.8z" />
                            </svg>
                        ))}
                    </div>

                    <blockquote className="relative z-10 flex-1 text-sm leading-relaxed text-ink-soft">
                        &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    <figcaption className="mt-5 flex items-center gap-3 border-t border-bone-soft pt-4">
                        <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white shadow-sm"
                            style={{ background: t.accentColor }}
                        >
                            {t.initials}
                        </div>
                        <div>
                            <span className="block text-sm font-semibold text-ink">{t.name}</span>
                            <span className="block text-xs text-ink-soft">{t.role}</span>
                        </div>
                    </figcaption>
                </figure>
            ))}
        </div>
    );
}

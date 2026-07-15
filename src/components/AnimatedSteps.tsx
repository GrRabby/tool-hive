"use client";

import { useEffect, useRef, useState } from "react";

interface Step {
    n: string;
    title: string;
    body: string;
    icon: React.ReactNode;
}

export default function AnimatedSteps({ steps }: { steps: Step[] }) {
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
            { threshold: 0.2 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="mt-14 grid gap-0 sm:grid-cols-3">
            {steps.map((step, i) => (
                <div
                    key={step.n}
                    className="group relative flex flex-col items-center text-center"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(32px)",
                        transition: `opacity 0.6s ease ${i * 0.2}s, transform 0.6s ease ${i * 0.2}s`,
                    }}
                >
                    
                    {i < steps.length - 1 && (
                        <div className="pointer-events-none absolute right-0 top-[52px] hidden h-[2px] w-1/2 sm:block"
                            style={{
                                background: "linear-gradient(to right, var(--color-amber), transparent)",
                                opacity: visible ? 0.5 : 0,
                                transition: `opacity 0.8s ease ${(i + 1) * 0.3}s`,
                            }}
                        />
                    )}
                    {i > 0 && (
                        <div className="pointer-events-none absolute left-0 top-[52px] hidden h-[2px] w-1/2 sm:block"
                            style={{
                                background: "linear-gradient(to left, var(--color-amber), transparent)",
                                opacity: visible ? 0.5 : 0,
                                transition: `opacity 0.8s ease ${i * 0.3}s`,
                            }}
                        />
                    )}

                    
                    <div className="relative z-10 flex h-[104px] w-[104px] items-center justify-center rounded-full border-2 border-dashed border-amber/40 bg-white shadow-lg shadow-amber/5 transition-all duration-500 group-hover:border-amber group-hover:shadow-amber/15 group-hover:scale-105">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-moss to-moss-dark text-bone">
                            {step.icon}
                        </div>
                        <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber font-display text-xs font-bold text-ink shadow-md">
                            {step.n}
                        </span>
                    </div>

                    
                    <h3 className="mt-5 font-display text-xl font-bold text-ink transition-colors group-hover:text-moss">
                        {step.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-[260px] text-sm leading-relaxed text-ink-soft">
                        {step.body}
                    </p>
                </div>
            ))}
        </div>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
    value: number;
    label: string;
    suffix?: string;
}

export default function StatsCounter({ stats }: { stats: StatItem[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTriggered(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, i) => (
                <div
                    key={stat.label}
                    className="relative flex flex-col items-center text-center"
                    style={{
                        opacity: triggered ? 1 : 0,
                        transform: triggered ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
                        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
                    }}
                >
                    
                    <div className="absolute -inset-4 rounded-3xl bg-amber/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <CountUp value={stat.value} triggered={triggered} delay={i * 150} suffix={stat.suffix} />
                    <p className="mt-2 text-sm font-medium text-bone/60">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}

function CountUp({
    value,
    triggered,
    delay,
    suffix = "",
}: {
    value: number;
    triggered: boolean;
    delay: number;
    suffix?: string;
}) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!triggered) return;
        const timeout = setTimeout(() => {
            const duration = 1200;
            const start = performance.now();
            const step = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplay(Math.round(eased * value));
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }, delay);
        return () => clearTimeout(timeout);
    }, [triggered, value, delay]);

    return (
        <span className="font-display text-6xl font-bold tracking-tight text-amber drop-shadow-[0_0_24px_rgba(232,163,61,0.25)]">
            {display}{suffix}
        </span>
    );
}

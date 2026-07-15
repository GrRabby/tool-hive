"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right";
}

export default function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const transforms: Record<string, string> = {
        up: "translateY(40px)",
        left: "translateX(-40px)",
        right: "translateX(40px)",
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translate(0)" : transforms[direction],
                transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

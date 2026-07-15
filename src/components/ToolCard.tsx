"use client";

import Link from "next/link";
import Image from "next/image";
import { Tool, CATEGORY_LABELS } from "@/types";
import { Star, MapPin, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const conditionColor: Record<string, string> = {
    new: "bg-denim text-bone border-denim/25",
    good: "bg-moss text-bone border-moss/25",
    fair: "bg-amber text-ink border-amber/25",
};

function formatDate(dateString: string) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return dateString;
    }
}

export default function ToolCard({ tool }: { tool: Tool }) {
    return (
        <Link href={`/tools/${tool._id}`} className="flex h-full flex-col">
            <motion.div
                initial="initial"
                whileHover="hover"
                variants={{
                    initial: { y: 0, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)" },
                    hover: { y: -6, boxShadow: "0 10px 25px -5px rgba(31, 61, 43, 0.15)" },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="focus-ring group relative flex flex-col flex-1 overflow-hidden rounded-2xl border border-ink/8 bg-white w-full"
            >
                
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone-soft shrink-0">
                    {tool.imageUrl ? (
                        <motion.div
                            variants={{
                                initial: { scale: 1 },
                                hover: { scale: 1.05 },
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative h-full w-full"
                        >
                            <Image
                                src={tool.imageUrl}
                                alt={tool.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </motion.div>
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-bone-soft to-bone text-ink-soft/40 font-display text-xl">
                            ToolHive
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <span
                        className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm z-10 ${conditionColor[tool.condition]}`}
                    >
                        {tool.condition}
                    </span>
                </div>

                
                <div className="tag-perforation flex flex-1 flex-col justify-between p-4.5 bg-white">
                    
                    <div className="flex items-start justify-between gap-2.5">
                        <h3 className="font-display text-lg font-bold leading-tight text-ink line-clamp-1 group-hover:text-moss transition-colors">
                            {tool.title}
                        </h3>
                        <span className="shrink-0 rounded-full bg-denim/8 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-denim border border-denim/10">
                            {CATEGORY_LABELS[tool.category]}
                        </span>
                    </div>

                    
                    <p className="text-xs text-ink-soft/90 leading-relaxed line-clamp-2 mt-1 mb-1.5">
                        {tool.shortDescription}
                    </p>

                    
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-dashed border-bone-soft pt-2 pb-1.5 text-[10px] text-ink-soft font-medium">
                        <div className="flex items-center gap-1">
                            <MapPin size={11} className="text-moss/70 shrink-0" />
                            <span className="line-clamp-1">{tool.location}</span>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                            <Calendar size={11} className="text-moss/70 shrink-0" />
                            <span>{formatDate(tool.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2 text-ink font-bold">
                            <Star size={11} fill="var(--color-amber)" className="text-amber shrink-0" />
                            <span>{tool.rating.toFixed(1)} / 5.0 Rating</span>
                        </div>
                    </div>

                    
                    <div className="flex items-center justify-between border-t border-dashed border-bone-soft pt-2">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-ink-soft uppercase tracking-wider font-semibold">Rate</span>
                            <span className="font-mono text-base font-extrabold text-moss leading-none mt-0.5">
                                {tool.dailyRate === 0 ? "FREE" : `$${tool.dailyRate}/day`}
                            </span>
                        </div>
                        <motion.span
                            variants={{
                                initial: { x: 0 },
                                hover: { x: 2 }
                            }}
                            className="flex items-center gap-1.5 rounded-xl bg-moss px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-bone shadow-md shadow-moss/10 group-hover:bg-moss-dark transition-colors cursor-pointer"
                        >
                            View Details
                            <ArrowRight size={11} />
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

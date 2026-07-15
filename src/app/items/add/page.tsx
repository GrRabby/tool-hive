"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Tag,
    MapPin,
    Coins,
    ImageIcon,
    AlignLeft,
    FileText,
    ArrowRight,
    Star,
    Calendar,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/api";
import { CATEGORY_LABELS, ToolCategory, Tool } from "@/types";

const addToolSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Keep it under 100 characters"),
    shortDescription: z
        .string()
        .trim()
        .min(10, "Short description must be at least 10 characters")
        .max(160, "Keep it under 160 characters"),
    fullDescription: z.string().trim().min(20, "Full description must be at least 20 characters"),
    category: z.enum(["power-tools", "garden", "camping", "party-events", "electronics", "other"]),
    dailyRate: z
        .string()
        .refine((v) => v === "" || Number(v) >= 0, "Daily rate can't be negative"),
    condition: z.enum(["new", "good", "fair"]),
    location: z.string().trim().min(2, "Location is required"),
    imageUrl: z.union([z.string().trim().url("Enter a valid URL"), z.literal("")]),
});

type AddToolForm = z.infer<typeof addToolSchema>;

const conditionColor: Record<string, string> = {
    new: "bg-denim text-bone border-denim/25",
    good: "bg-moss text-bone border-moss/25",
    fair: "bg-amber text-ink border-amber/25",
};

function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function AddItemForm() {
    const router = useRouter();
    const [formError, setFormError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AddToolForm>({
        resolver: zodResolver(addToolSchema),
        defaultValues: {
            title: "",
            shortDescription: "",
            fullDescription: "",
            category: "power-tools",
            dailyRate: "",
            condition: "good",
            location: "",
            imageUrl: "",
        },
    });

    const values = watch();
    const shortDescLength = values.shortDescription?.length || 0;

    const onSubmit = async (data: AddToolForm) => {
        setFormError("");
        setSubmitting(true);
        try {
            const { tool } = await api.post<{ tool: Tool }>("/api/tools", {
                ...data,
                dailyRate: data.dailyRate ? Number(data.dailyRate) : 0,
            });
            router.push(`/tools/${tool._id}`);
        } catch (err) {
            setFormError(err instanceof Error ? err.message : "Failed to list your tool");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-bone-soft/40">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-moss/40 px-3 py-1 font-mono text-xs text-moss">
                        New listing
                    </span>
                    <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
                        List a tool
                    </h1>
                    <p className="mt-2 text-ink-soft">
                        Share something from your shed with the neighborhood. It takes about a minute.
                    </p>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-5">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3"
                        noValidate
                    >
                        {formError && (
                            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                                {formError}
                            </p>
                        )}

                        <div>
                            <h2 className="font-display text-lg font-bold text-ink">Basics</h2>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label htmlFor="title" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                        Title
                                    </label>
                                    <div className="relative">
                                        <Tag size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/40" />
                                        <input
                                            id="title"
                                            {...register("title")}
                                            placeholder="Bosch Cordless Drill"
                                            className={`focus-ring w-full rounded-lg border bg-bone-soft/40 py-3 pl-10 pr-3 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-amber/40 ${errors.title ? "border-red-300" : "border-ink/10"
                                                }`}
                                        />
                                    </div>
                                    {errors.title && <p className="mt-1.5 text-xs text-red-600">{errors.title.message}</p>}
                                </div>

                                <div>
                                    <div className="mb-1.5 flex items-center justify-between">
                                        <label htmlFor="shortDescription" className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                            Short description
                                        </label>
                                        <span className={`text-xs ${shortDescLength > 160 ? "text-red-500" : "text-ink-soft/60"}`}>
                                            {shortDescLength}/160
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <AlignLeft size={17} className="pointer-events-none absolute left-3.5 top-3.5 text-ink-soft/40" />
                                        <input
                                            id="shortDescription"
                                            {...register("shortDescription")}
                                            placeholder="18V cordless drill with 2 batteries and case"
                                            maxLength={160}
                                            className={`focus-ring w-full rounded-lg border bg-bone-soft/40 py-3 pl-10 pr-3 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-amber/40 ${errors.shortDescription ? "border-red-300" : "border-ink/10"
                                                }`}
                                        />
                                    </div>
                                    {errors.shortDescription && (
                                        <p className="mt-1.5 text-xs text-red-600">{errors.shortDescription.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="fullDescription" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                        Full description
                                    </label>
                                    <div className="relative">
                                        <FileText size={17} className="pointer-events-none absolute left-3.5 top-3.5 text-ink-soft/40" />
                                        <textarea
                                            id="fullDescription"
                                            {...register("fullDescription")}
                                            rows={5}
                                            placeholder="Describe condition, what's included, and anything a borrower should know."
                                            className={`focus-ring w-full rounded-lg border bg-bone-soft/40 py-3 pl-10 pr-3 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-amber/40 ${errors.fullDescription ? "border-red-300" : "border-ink/10"
                                                }`}
                                        />
                                    </div>
                                    {errors.fullDescription && (
                                        <p className="mt-1.5 text-xs text-red-600">{errors.fullDescription.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-bone-soft pt-6">
                            <h2 className="font-display text-lg font-bold text-ink">Details</h2>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="category" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        {...register("category")}
                                        className="focus-ring w-full rounded-lg border border-ink/10 bg-bone-soft/40 px-3 py-3 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-amber/40"
                                    >
                                        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="condition" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                        Condition
                                    </label>
                                    <select
                                        id="condition"
                                        {...register("condition")}
                                        className="focus-ring w-full rounded-lg border border-ink/10 bg-bone-soft/40 px-3 py-3 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-amber/40"
                                    >
                                        <option value="new">New</option>
                                        <option value="good">Good</option>
                                        <option value="fair">Fair</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="dailyRate" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                        Daily rate
                                    </label>
                                    <div className="relative">
                                        <Coins size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/40" />
                                        <input
                                            id="dailyRate"
                                            type="number"
                                            min={0}
                                            {...register("dailyRate")}
                                            placeholder="8"
                                            className={`focus-ring w-full rounded-lg border bg-bone-soft/40 py-3 pl-10 pr-3 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-amber/40 ${errors.dailyRate ? "border-red-300" : "border-ink/10"
                                                }`}
                                        />
                                    </div>
                                    {errors.dailyRate && <p className="mt-1.5 text-xs text-red-600">{errors.dailyRate.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="location" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MapPin size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/40" />
                                        <input
                                            id="location"
                                            {...register("location")}
                                            placeholder="Gulshan, Dhaka"
                                            className={`focus-ring w-full rounded-lg border bg-bone-soft/40 py-3 pl-10 pr-3 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-amber/40 ${errors.location ? "border-red-300" : "border-ink/10"
                                                }`}
                                        />
                                    </div>
                                    {errors.location && <p className="mt-1.5 text-xs text-red-600">{errors.location.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-bone-soft pt-6">
                            <h2 className="font-display text-lg font-bold text-ink">Photo</h2>
                            <div className="mt-4">
                                <label htmlFor="imageUrl" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                                    Image URL <span className="normal-case text-ink-soft/60">(optional)</span>
                                </label>
                                <div className="relative">
                                    <ImageIcon size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/40" />
                                    <input
                                        id="imageUrl"
                                        {...register("imageUrl")}
                                        placeholder="https://..."
                                        className={`focus-ring w-full rounded-lg border bg-bone-soft/40 py-3 pl-10 pr-3 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-amber/40 ${errors.imageUrl ? "border-red-300" : "border-ink/10"
                                            }`}
                                    />
                                </div>
                                {errors.imageUrl && <p className="mt-1.5 text-xs text-red-600">{errors.imageUrl.message}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="focus-ring group flex w-full items-center justify-center gap-2 rounded-lg bg-amber py-3.5 text-sm font-bold uppercase tracking-wide text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:bg-amber-dark hover:shadow-lg disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
                        >
                            {submitting ? "Listing..." : "Submit Listing"}
                            {!submitting && <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />}
                        </button>
                    </form>


                    <div className="lg:col-span-2">
                        <div className="sticky top-24">
                            <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Live preview</span>
                            <div className="mt-3 flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white">
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone-soft">
                                    {values.imageUrl && !errors.imageUrl ? (
                                        <Image src={values.imageUrl} alt="" fill sizes="400px" className="object-cover" unoptimized />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-bone-soft to-bone font-display text-xl text-ink-soft/40">
                                            ToolHive
                                        </div>
                                    )}
                                    <span
                                        className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm ${conditionColor[values.condition] || conditionColor.good
                                            }`}
                                    >
                                        {values.condition || "good"}
                                    </span>
                                </div>

                                <div className="tag-perforation flex flex-1 flex-col justify-between p-4.5">
                                    <div className="flex items-start justify-between gap-2.5">
                                        <h3 className="font-display text-lg font-bold leading-tight text-ink line-clamp-1">
                                            {values.title || "Your tool's title"}
                                        </h3>
                                        <span className="shrink-0 rounded-full border border-denim/10 bg-denim/8 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-denim">
                                            {CATEGORY_LABELS[values.category as ToolCategory] || "Category"}
                                        </span>
                                    </div>

                                    <p className="mb-1.5 mt-1 line-clamp-2 text-xs leading-relaxed text-ink-soft/90">
                                        {values.shortDescription || "A short, one-line description will appear here."}
                                    </p>

                                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-dashed border-bone-soft pb-1.5 pt-2 text-[10px] font-medium text-ink-soft">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={11} className="shrink-0 text-moss/70" />
                                            <span className="line-clamp-1">{values.location || "Location"}</span>
                                        </div>
                                        <div className="flex items-center justify-end gap-1">
                                            <Calendar size={11} className="shrink-0 text-moss/70" />
                                            <span>{formatDate(new Date())}</span>
                                        </div>
                                        <div className="col-span-2 flex items-center gap-1 font-bold text-ink">
                                            <Star size={11} fill="var(--color-amber)" className="shrink-0 text-amber" />
                                            <span>4.5 / 5.0 Rating <span className="font-normal text-ink-soft">(new listing)</span></span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-dashed border-bone-soft pt-2">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-semibold uppercase tracking-wider text-ink-soft">Rate</span>
                                            <span className="mt-0.5 font-mono text-base font-extrabold leading-none text-moss">
                                                {!values.dailyRate || values.dailyRate === "0" ? "FREE" : `৳${values.dailyRate}/day`}
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1.5 rounded-xl bg-moss px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-bone shadow-md shadow-moss/10">
                                            View Details
                                            <ArrowRight size={11} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 text-xs text-ink-soft">
                                This is exactly how your listing will look to other members.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AddItemPage() {
    return (
        <ProtectedRoute>
            <AddItemForm />
        </ProtectedRoute>
    );
}
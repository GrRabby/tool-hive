"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, Star, ShieldCheck, Sparkles, Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

const highlights = [
    { stat: "500+", label: "Shared tools locally" },
    { stat: "0$", label: "Platform fees, ever" },
    { stat: "6+", label: "Product categories" },
];

export default function LoginPage() {
    const router = useRouter();
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "", remember: true },
    });

    const onSubmit = async (values: LoginForm) => {
        setFormError("");
        setLoading(true);
        const { error: authError } = await signIn.email({
            email: values.email,
            password: values.password,
        });
        setLoading(false);
        if (authError) {
            setFormError(authError.message || "Invalid email or password");
            return;
        }
        router.push("/");
    };

    const fillDemo = (role: "user" | "admin") => {
        setFormError("");
        if (role === "admin") {
            setValue("email", "admin@toollibrary.com", { shouldValidate: true });
            setValue("password", "Password@123456", { shouldValidate: true });
        } else {
            setValue("email", "demo@toollibrary.com", { shouldValidate: true });
            setValue("password", "Password@123456", { shouldValidate: true });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50/60 px-4 py-16 sm:px-6 lg:px-8 dark:bg-zinc-950">

            <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/50 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">


                <div className="relative hidden flex-col justify-between bg-zinc-950 p-10 text-zinc-100 md:flex">

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_10%,#000_70%,transparent_100%)] opacity-60" />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <img
                                    src="/Logo.png"
                                    alt="ToolHive Logo"
                                    height={50}
                                    width={50}
                                />
                                <span className="text-lg font-bold tracking-tight text-[rgb(254,154,0)] transition-colors group-hover:text-[rgb(255,180,60)]">
                                    ToolHive
                                </span>
                            </div>

                            <div className="mt-12 inline-flex items-center gap-1.5 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-300 border border-zinc-800">
                                <ShieldCheck size={14} className="text-amber-500" /> Verified Peer Networks
                            </div>

                            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white leading-tight">
                                Your community <br />hardware hub.
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-zinc-400 max-w-xs">
                                Access a collective shed of high-quality tools down your street. No maintenance costs, no clutter.
                            </p>
                        </div>


                        <div className="mt-12 border-t border-zinc-900 pt-8 space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                {highlights.map((h) => (
                                    <div key={h.label} className="flex items-baseline gap-2.5">
                                        <span className="font-mono text-xl font-bold text-amber-500 tracking-tight">{h.stat}</span>
                                        <span className="text-xs text-zinc-400 font-medium">{h.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-3 rounded-xl bg-zinc-900/40 p-3.5 border border-zinc-900">
                                <div className="flex -space-x-1.5">
                                    {["A", "M", "K"].map((initial, i) => (
                                        <span
                                            key={i}
                                            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-800 text-[10px] font-bold text-zinc-300"
                                        >
                                            {initial}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1 text-xs font-semibold text-zinc-200">
                                        <Star size={11} className="fill-amber-500 text-amber-500" /> 4.8 Direct Score
                                    </div>
                                    <span className="text-[10px] text-zinc-500">Based on local handovers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <div>
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">Secure Access</h1>
                                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">Identify yourself to enter the workshop.</p>
                            </div>


                            <div className="flex gap-1.5 self-start rounded-lg bg-slate-100 p-1 dark:bg-zinc-800/60">
                                <button
                                    type="button"
                                    onClick={() => fillDemo("user")}
                                    className="rounded-md px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                                >
                                    User
                                </button>
                                <div className="w-px bg-slate-200 dark:bg-zinc-700 my-1" />
                                <button
                                    type="button"
                                    onClick={() => fillDemo("admin")}
                                    className="rounded-md px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
                            {formError && (
                                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50/50 p-3.5 text-xs font-medium text-red-700 dark:border-red-950/40 dark:bg-red-950/10 dark:text-red-400">
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0" />
                                    {formError}
                                </div>
                            )}


                            <div className="group space-y-1.5">
                                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-amber-600 dark:text-zinc-400 dark:group-focus-within:text-amber-500">
                                    Credential Email
                                </label>
                                <div className="relative rounded-lg shadow-sm transition-all duration-200">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                        <Mail size={16} className="text-slate-400 transition-colors group-focus-within:text-amber-500 dark:text-zinc-500" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        className={`block w-full rounded-lg border bg-slate-50/40 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-4 ${errors.email
                                            ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
                                            : "border-slate-200 focus:border-amber-500 focus:ring-amber-500/10 dark:border-zinc-800 dark:focus:border-amber-500 dark:focus:bg-zinc-900/50"
                                            } text-slate-900 placeholder-slate-400/80 dark:text-zinc-100`}
                                        placeholder="Enter your registered email"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs font-medium text-red-600 dark:text-red-400">{errors.email.message}</p>
                                )}
                            </div>


                            <div className="group space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-amber-600 dark:text-zinc-400 dark:group-focus-within:text-amber-500">
                                        Passphrase
                                    </label>
                                    <Link href="#" className="text-xs font-bold text-slate-500 transition hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-400">
                                        Reset item?
                                    </Link>
                                </div>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                        <Lock size={16} className="text-slate-400 transition-colors group-focus-within:text-amber-500 dark:text-zinc-500" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        className={`block w-full rounded-lg border bg-slate-50/40 py-2.5 pl-10 pr-10 text-sm outline-none transition-all focus:bg-white focus:ring-4 ${errors.password
                                            ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
                                            : "border-slate-200 focus:border-amber-500 focus:ring-amber-500/10 dark:border-zinc-800 dark:focus:border-amber-500 dark:focus:bg-zinc-900/50"
                                            } text-slate-900 placeholder-slate-400/80 dark:text-zinc-100`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-xs font-medium text-red-600 dark:text-red-400">{errors.password.message}</p>
                                )}
                            </div>


                            <div className="flex items-center justify-between pt-1">
                                <label className="flex cursor-pointer items-center group">
                                    <div className="relative flex items-center">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            {...register("remember")}
                                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-200 bg-slate-50 checked:border-amber-500 checked:bg-amber-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950"
                                        />
                                        <svg className="absolute h-3 w-3 pointer-events-none stroke-zinc-950 font-bold ml-0.5 opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" strokeWidth="4">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <span className="ml-2.5 text-xs font-semibold text-slate-600 transition group-hover:text-slate-900 dark:text-zinc-400 dark:group-hover:text-zinc-200 select-none">
                                        Remember this workspace
                                    </span>
                                </label>
                            </div>


                            <button
                                type="submit"
                                disabled={loading}
                                className="relative flex w-full items-center justify-center rounded-lg bg-zinc-950 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-zinc-950/10 transition-all hover:bg-zinc-900 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 dark:bg-amber-500 dark:text-zinc-950 dark:shadow-none dark:hover:bg-amber-400"
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-current" />
                                ) : (
                                    <span className="flex items-center gap-1.5">Sign In <Sparkles size={14} className="opacity-70" /></span>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-xs text-slate-500 dark:text-zinc-400">
                            New to the ecosystem?{" "}
                            <Link href="/register" className="font-bold text-slate-900 underline underline-offset-4 hover:text-amber-600 dark:text-zinc-100 dark:hover:text-amber-400">
                                Claim free account
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
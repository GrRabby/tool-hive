"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Lock, Eye, EyeOff, Check, Loader2, Sparkles } from "lucide-react";
import { signUp } from "@/lib/auth-client";

const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    terms: z.boolean().refine((v) => v === true, {
      message: "You must accept the Terms and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const perks = [
  { title: "List in minutes", body: "Add a title, a photo, a price — done." },
  { title: "You set the terms", body: "Your price, your availability, your rules." },
  { title: "Meet your neighbors", body: "Every listing is a real person nearby." },
];

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-red-500" };
  if (score <= 3) return { score, label: "Moderate", color: "bg-amber-500" };
  return { score, label: "Strong", color: "bg-emerald-500" };
}

export default function RegisterPage() {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", terms: false },
  });

  const password = watch("password");
  const strength = useMemo(() => getPasswordStrength(password || ""), [password]);

  const onSubmit = async (values: RegisterForm) => {
    setFormError("");
    setLoading(true);
    const { error: authError } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setLoading(false);
    if (authError) {
      setFormError(authError.message || "Could not create your account");
      return;
    }
    router.push("/");
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
                  src="/logo.png"
                  alt="ToolHive Logo"
                  height={50}
                  width={50}
                />
                <span className="text-lg font-bold tracking-tight text-[rgb(254,154,0)] transition-colors group-hover:text-[rgb(255,180,60)]">
                  ToolHive
                </span>
              </div>

              <h2 className="mt-16 text-3xl font-extrabold tracking-tight text-white leading-tight">
                Join the neighborhood <br />collective.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 max-w-xs">
                Create a free ecosystem profile to access hundreds of high-quality tools down your street safely.
              </p>
            </div>

            
            <div className="mt-12 border-t border-zinc-900 pt-8 space-y-5">
              {perks.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500 text-zinc-950">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-amber-500 tracking-wide uppercase">{p.title}</span>
                    <p className="mt-0.5 text-xs text-zinc-400 leading-normal">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          <div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">Establish Account</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">Complete the identity record below to sign up.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
              {formError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50/50 p-3.5 text-xs font-medium text-red-700 dark:border-red-950/40 dark:bg-red-950/10 dark:text-red-400">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0" />
                  {formError}
                </div>
              )}

              
              <div className="group space-y-1.5">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-amber-600 dark:text-zinc-400 dark:group-focus-within:text-amber-500">
                  Full Name
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <User size={16} className="text-slate-400 transition-colors group-focus-within:text-amber-500 dark:text-zinc-500" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={`block w-full rounded-lg border bg-slate-50/40 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-4 ${errors.name
                        ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-amber-500 focus:ring-amber-500/10 dark:border-zinc-800 dark:focus:border-amber-500 dark:focus:bg-zinc-900/50"
                      } text-slate-900 placeholder-slate-400/80 dark:text-zinc-100`}
                    placeholder="Jane Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">{errors.name.message}</p>
                )}
              </div>

              
              <div className="group space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-amber-600 dark:text-zinc-400 dark:group-focus-within:text-amber-500">
                  Email Address
                </label>
                <div className="relative rounded-lg shadow-sm">
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
                    placeholder="name@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              
              <div className="group space-y-1.5">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-amber-600 dark:text-zinc-400 dark:group-focus-within:text-amber-500">
                  Choose Password
                </label>
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
                    placeholder="Minimum 6 characters"
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

                
                {password && (
                  <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/30">
                    <div className="flex gap-1.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < strength.score ? strength.color : "bg-slate-200 dark:bg-zinc-800"
                            }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                      Strength Analysis: <span className="text-slate-800 dark:text-zinc-200">{strength.label}</span>
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>

              
              <div className="group space-y-1.5">
                <label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-amber-600 dark:text-zinc-400 dark:group-focus-within:text-amber-500">
                  Verify Password
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <Lock size={16} className="text-slate-400 transition-colors group-focus-within:text-amber-500 dark:text-zinc-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword")}
                    className={`block w-full rounded-lg border bg-slate-50/40 py-2.5 pl-10 pr-10 text-sm outline-none transition-all focus:bg-white focus:ring-4 ${errors.confirmPassword
                        ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-amber-500 focus:ring-amber-500/10 dark:border-zinc-800 dark:focus:border-amber-500 dark:focus:bg-zinc-900/50"
                      } text-slate-900 placeholder-slate-400/80 dark:text-zinc-100`}
                    placeholder="Repeat chosen passphrase"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              
              <div className="space-y-1.5 pt-1">
                <label className="flex cursor-pointer items-start group">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      id="terms"
                      type="checkbox"
                      {...register("terms")}
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-200 bg-slate-50 checked:border-amber-500 checked:bg-amber-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950"
                    />
                    <svg className="absolute h-3 w-3 pointer-events-none stroke-zinc-950 font-bold ml-0.5 opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="ml-2.5 text-xs font-medium leading-normal text-slate-600 transition group-hover:text-slate-900 dark:text-zinc-400 dark:group-hover:text-zinc-200 select-none">
                    I consent to the workspace{" "}
                    <Link href="/terms" className="font-bold text-slate-900 underline underline-offset-2 dark:text-zinc-300 hover:text-amber-500">Terms</Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-bold text-slate-900 underline underline-offset-2 dark:text-zinc-300 hover:text-amber-500">Privacy Policy</Link>.
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">{errors.terms.message}</p>
                )}
              </div>

              
              <button
                type="submit"
                disabled={loading}
                className="relative flex w-full items-center justify-center rounded-lg bg-zinc-950 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-zinc-950/10 transition-all hover:bg-zinc-900 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 dark:bg-amber-500 dark:text-zinc-950 dark:shadow-none dark:hover:bg-amber-400"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-current" />
                ) : (
                  <span className="flex items-center gap-1.5">Register Profile <Sparkles size={14} className="opacity-70" /></span>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500 dark:text-zinc-400">
              Already registered in the hub?{" "}
              <Link href="/login" className="font-bold text-slate-900 underline underline-offset-4 hover:text-amber-600 dark:text-zinc-100 dark:hover:text-amber-400">
                Log in instead
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
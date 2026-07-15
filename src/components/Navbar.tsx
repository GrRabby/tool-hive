"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Menu, X, LogOut, PlusCircle, Wrench, Shield, Compass, Info, Home } from "lucide-react";

const baseLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tools", label: "Explore", icon: Compass },
  { href: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const { data } = useSession();
  const user = data?.user;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = user
    ? [
      ...baseLinks,
      { href: "/items/add", label: "List a Tool", icon: PlusCircle },
      { href: "/items/manage", label: "My Listings", icon: Wrench },
      ...(user.role === "admin" ? [{ href: "/admin", label: "Admin", icon: Shield }] : []),
    ]
    : baseLinks;

  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#20241f] text-zinc-100 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">


        <Link href="/" className="group flex items-center gap-2.5 outline-none">
          <img
            src="/logo.png"
            alt="ToolHive Logo"
            height={50}
            width={50}
          />
          <span className="text-lg font-bold tracking-tight text-[rgb(254,154,0)] transition-colors group-hover:text-[rgb(255,180,60)]">
            ToolHive
          </span>
        </Link>


        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-lg outline-none ${isActive
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/10"
                  : "text-zinc-200 hover:text-white hover:bg-zinc-900/90 border border-transparent hover:border-zinc-800"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>


        <div className="hidden items-center gap-4 border-l border-zinc-800 pl-6 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-zinc-200">{user.name}</span>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">{user.role || "User"}</span>
              </div>


              <div className="relative group cursor-pointer select-none">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-9 w-9 rounded-xl border border-zinc-700 object-cover ring-2 ring-transparent transition group-hover:ring-amber-500/40"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-sm font-bold text-amber-400 ring-2 ring-transparent transition group-hover:ring-amber-400/40">
                    {userInitial}
                  </div>
                )}
              </div>

              <button
                onClick={() => signOut()}
                title="Log out session"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 text-zinc-300 transition hover:bg-zinc-900 hover:text-red-400 hover:border-red-950/40"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="rounded-lg px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 transition hover:text-white hover:bg-zinc-900/50"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-950 shadow-md transition hover:bg-zinc-200 active:scale-[0.98]"
              >
                Claim Space
              </Link>
            </div>
          )}
        </div>


        <button
          className="rounded-xl border border-zinc-800 p-2 text-zinc-300 hover:bg-zinc-900 hover:text-white md:hidden"
          aria-label="Toggle navigation interface"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>


      {open && (
        <nav className="border-t border-zinc-900 bg-zinc-950 px-4 py-4 space-y-1.5 md:hidden shadow-xl">

          {user && (
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-zinc-900/60 p-3 border border-zinc-800">
              {user.image ? (
                <img src={user.image} alt={user.name} className="h-10 w-10 rounded-lg object-cover" />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 font-mono text-base font-bold text-amber-400">
                  {userInitial}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{user.name}</span>
                <span className="text-xs text-zinc-400">{user.email}</span>
              </div>
            </div>
          )}

          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-bold transition-all ${isActive
                  ? "bg-amber-500 text-zinc-950"
                  : "text-zinc-200 bg-zinc-900/30 hover:bg-zinc-900 hover:text-white border border-zinc-900"
                  }`}
              >
                <Icon size={16} className={isActive ? "text-zinc-950" : "text-zinc-400"} />
                {link.label}
              </Link>
            );
          })}

          {user ? (
            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-left text-sm font-bold text-zinc-300 bg-zinc-900/10 hover:bg-red-950/30 hover:text-red-400 pt-3 border border-transparent hover:border-red-950/50"
            >
              <LogOut size={16} className="text-zinc-400" />
              Terminate Session
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-900 mt-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-zinc-800 px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-200 transition hover:bg-zinc-900"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-amber-500 px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-950 transition hover:bg-amber-400"
              >
                Claim Space
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
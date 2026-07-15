"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListChecks } from "lucide-react";

const tabs = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tools", label: "Listings", icon: ListChecks },
];

export default function AdminTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 rounded-xl border border-ink/8 bg-white p-1">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`focus-ring flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              active ? "bg-moss text-bone" : "text-ink-soft hover:bg-bone-soft"
            }`}
          >
            <Icon size={15} />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
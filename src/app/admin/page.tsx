"use client";

import { useEffect, useMemo, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminTabs from "@/components/AdminTabs";
import { api } from "@/lib/api";
import { Tool, AdminStats, CATEGORY_LABELS } from "@/types";
import {
  Package,
  Layers,
  MapPin,
  Coins,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const CONDITION_COLORS: Record<string, string> = {
  new: "#35506B",
  good: "#1F3D2B",
  fair: "#E8A33D",
};

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-5">
      <div className="flex items-center gap-2 text-ink-soft">
        <Icon size={15} />
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}

function DashboardContent() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, toolsRes] = await Promise.all([
          api.get<AdminStats>("/api/admin/stats"),
          api.get<{ tools: Tool[] }>("/api/admin/tools"),
        ]);
        setStats(statsRes);
        setTools(toolsRes.tools);
      } catch {
        setStats(null);
        setTools([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categoryData = useMemo(
    () => stats?.categoryCounts.map((c) => ({ category: CATEGORY_LABELS[c.category], count: c.count })) || [],
    [stats]
  );

  const conditionData = useMemo(() => {
    const counts: Record<string, number> = { new: 0, good: 0, fair: 0 };
    tools.forEach((t) => {
      counts[t.condition] = (counts[t.condition] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .map(([condition, count]) => ({ name: condition, value: count }));
  }, [tools]);

  const locationData = useMemo(() => {
    const counts: Record<string, number> = {};
    tools.forEach((t) => {
      counts[t.location] = (counts[t.location] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([location, count]) => ({ location, count }));
  }, [tools]);

  const avgRate = useMemo(() => {
    if (tools.length === 0) return 0;
    const total = tools.reduce((sum, t) => sum + t.dailyRate, 0);
    return Math.round(total / tools.length);
  }, [tools]);

  const uniqueLocations = useMemo(() => new Set(tools.map((t) => t.location)).size, [tools]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-ink">Admin dashboard</h1>
      <p className="mt-2 text-ink-soft">Moderate listings and see how the community is using ToolHive.</p>

      <div className="mt-6">
        <AdminTabs />
      </div>

      {loading ? (
        <p className="mt-10 text-sm text-ink-soft">Loading dashboard...</p>
      ) : (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Package} label="Total listings" value={stats?.totalTools ?? 0} />
            <StatCard icon={Layers} label="Categories used" value={stats?.categoryCounts.length ?? 0} />
            <StatCard icon={MapPin} label="Locations covered" value={uniqueLocations} />
            <StatCard icon={Coins} label="Avg. daily rate" value={avgRate === 0 ? "Free" : `$${avgRate}`} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <div className="rounded-2xl border border-ink/8 bg-white p-6 lg:col-span-3">
              <h2 className="font-display text-lg font-bold text-ink">Listings per category</h2>
              <div className="mt-4 h-64">
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D8" />
                      <XAxis dataKey="category" tick={{ fontSize: 11, fill: "#4A4F47" }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#4A4F47" }} />
                      <Tooltip cursor={{ fill: "#F1EFE8" }} />
                      <Bar dataKey="count" fill="#1F3D2B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="flex h-full items-center justify-center text-sm text-ink-soft">No data yet</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-ink/8 bg-white p-6 lg:col-span-2">
              <h2 className="font-display text-lg font-bold text-ink">Condition mix</h2>
              <div className="mt-4 h-64">
                {conditionData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={conditionData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={3}
                      >
                        {conditionData.map((entry) => (
                          <Cell key={entry.name} fill={CONDITION_COLORS[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        iconType="circle"
                        formatter={(value) => <span className="text-xs capitalize text-ink-soft">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="flex h-full items-center justify-center text-sm text-ink-soft">No data yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-ink/8 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink">Top locations</h2>
            <div className="mt-4 h-56">
              {locationData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationData} layout="vertical" margin={{ left: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D8" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#4A4F47" }} />
                    <YAxis dataKey="location" type="category" width={120} tick={{ fontSize: 11, fill: "#4A4F47" }} />
                    <Tooltip cursor={{ fill: "#F1EFE8" }} />
                    <Bar dataKey="count" fill="#E8A33D" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="flex h-full items-center justify-center text-sm text-ink-soft">No data yet</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireAdmin>
      <DashboardContent />
    </ProtectedRoute>
  );
}
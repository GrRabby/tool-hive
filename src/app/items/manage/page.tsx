"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Trash2, MapPin, PackageOpen, Plus } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ConfirmDialog from "@/components/ConfirmDialog";
import { api } from "@/lib/api";
import { Tool, CATEGORY_LABELS } from "@/types";

const conditionColor: Record<string, string> = {
  new: "bg-denim text-bone border-denim/25",
  good: "bg-moss text-bone border-moss/25",
  fair: "bg-amber text-ink border-amber/25",
};

function ManageItemsContent() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Tool | null>(null);

  const fetchMine = async () => {
    setLoading(true);
    try {
      const data = await api.get<{ tools: Tool[] }>("/api/tools/mine");
      setTools(data.tools);
    } catch {
      setTools([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMine();
  }, []);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const id = pendingDelete._id;
    setDeletingId(id);
    try {
      await api.delete(`/api/tools/${id}`);
      setTools((prev) => prev.filter((t) => t._id !== id));
      setPendingDelete(null);
    } catch {
      alert("Could not delete this listing. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-ink">My listings</h1>
          <p className="mt-2 text-ink-soft">Tools you&apos;ve shared with the community.</p>
        </div>
        <Link
          href="/items/add"
          className="focus-ring hidden items-center gap-1.5 rounded-lg bg-moss px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-bone shadow-sm transition-all hover:-translate-y-0.5 hover:bg-moss-dark hover:shadow-lg sm:flex"
        >
          <Plus size={16} /> List a Tool
        </Link>
      </div>

      {loading ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-ink/8 bg-white">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-ink/5 px-5 py-4 last:border-0">
              <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-bone-soft" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-1/3 animate-pulse rounded bg-bone-soft" />
                <div className="h-3 w-1/5 animate-pulse rounded bg-bone-soft" />
              </div>
              <div className="hidden h-8 w-20 animate-pulse rounded-lg bg-bone-soft sm:block" />
            </div>
          ))}
        </div>
      ) : tools.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-ink/15 bg-white py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bone-soft text-ink-soft/50">
            <PackageOpen size={26} />
          </div>
          <p className="mt-4 font-display text-xl font-bold text-ink">You haven&apos;t listed anything yet</p>
          <p className="mt-2 text-sm text-ink-soft">List your first tool and start helping neighbors.</p>
          <Link
            href="/items/add"
            className="focus-ring mt-5 inline-flex items-center gap-1.5 rounded-lg bg-amber px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:bg-amber-dark hover:shadow-lg"
          >
            <Plus size={16} /> List a Tool
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-ink/8 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 bg-ink/[0.035] text-[11px] font-semibold uppercase tracking-wider text-ink/70">
              <tr>
                <th className="px-5 py-3.5">Tool</th>
                <th className="hidden px-5 py-3.5 sm:table-cell">Condition</th>
                <th className="hidden px-5 py-3.5 md:table-cell">Rate</th>
                <th className="hidden px-5 py-3.5 md:table-cell">Location</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {tools.map((tool) => (
                <tr key={tool._id} className="transition-colors hover:bg-bone-soft/30">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-bone-soft">
                        {tool.imageUrl ? (
                          <Image src={tool.imageUrl} alt={tool.title} fill className="object-cover" sizes="48px" />
                        ) : (
                          <div className="flex h-full items-center justify-center font-display text-xs text-ink-soft/40">
                            TH
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-ink line-clamp-1">{tool.title}</p>
                        <span className="mt-0.5 inline-block rounded-full border border-denim/10 bg-denim/8 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-denim">
                          {CATEGORY_LABELS[tool.category]}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${conditionColor[tool.condition]}`}
                    >
                      {tool.condition}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3.5 font-mono font-semibold text-moss md:table-cell">
                    {tool.dailyRate === 0 ? "Free" : `৳${tool.dailyRate}/day`}
                  </td>
                  <td className="hidden px-5 py-3.5 text-ink-soft md:table-cell">
                    <div className="flex items-center gap-1">
                      <MapPin size={13} className="text-moss/70" />
                      {tool.location}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/tools/${tool._id}`}
                        aria-label={`View ${tool.title}`}
                        className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-ink/10 text-ink-soft transition-colors hover:border-moss/30 hover:bg-moss/5 hover:text-moss"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        onClick={() => setPendingDelete(tool)}
                        aria-label={`Delete ${tool.title}`}
                        className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 text-red-500 transition-colors hover:border-red-200 hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this listing?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" will be removed permanently. This can't be undone.`
            : ""
        }
        confirmLabel="Delete listing"
        loading={!!deletingId}
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <ManageItemsContent />
    </ProtectedRoute>
  );
}
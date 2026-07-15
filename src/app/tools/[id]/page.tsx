import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import { CATEGORY_LABELS, Tool, Owner } from "@/types";
import { toast } from "sonner";
import RequestButton from "@/components/Requestbutton";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface DetailsResponse {
  tool: Tool;
  owner: Owner | null;
  related: Tool[];
}

async function getTool(id: string): Promise<DetailsResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/api/tools/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ToolDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getTool(id);

  if (!data) notFound();

  const { tool, owner, related } = data;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-ink-soft">
        <Link href="/tools" className="focus-ring rounded hover:text-moss">Explore</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{tool.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-5">
        
        <div className="lg:col-span-3">
          <div className="relative h-72 w-full overflow-hidden rounded-[10px] border border-ink/10 bg-bone-soft sm:h-96">
            {tool.imageUrl ? (
              <Image src={tool.imageUrl} alt={tool.title} fill sizes="60vw" className="object-cover" priority />
            ) : (
              <div className="flex h-full items-center justify-center font-display text-3xl text-ink-soft/40">
                ToolHive
              </div>
            )}
          </div>
        </div>

        
        <div className="lg:col-span-2">
          <div className="rounded-[10px] border border-ink/10 bg-white p-6 shadow-sm">
            <span className="rounded bg-denim/10 px-2 py-0.5 font-mono text-xs font-medium text-denim">
              {CATEGORY_LABELS[tool.category]}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-ink">{tool.title}</h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-ink-soft">
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.9L12 17.3 5.9 20.7l1.4-6.9L2.2 9.1l6.9-.8z" /></svg>
                {tool.rating.toFixed(1)} rating
              </span>
              <span>•</span>
              <span>{tool.location}</span>
            </div>

            <div className="tag-perforation mt-5 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-3xl font-bold text-moss">
                  {tool.dailyRate === 0 ? "FREE" : `$${tool.dailyRate}`}
                </span>
                {tool.dailyRate > 0 && <span className="text-sm text-ink-soft">/ day</span>}
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-dashed border-bone-soft pt-5 text-sm">
              <div>
                <dt className="text-ink-soft">Condition</dt>
                <dd className="font-semibold capitalize text-ink">{tool.condition}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Listed by</dt>
                <dd className="font-semibold text-ink">{owner?.name ?? "ToolHive member"}</dd>
              </div>
            </dl>

            <RequestButton/>
            {owner?.email && (
              <p className="mt-3 text-center text-xs text-ink-soft">
                Or reach out directly at{" "}
                <a href={`mailto:${owner.email}`} className="underline">{owner.email}</a>
              </p>
            )}
          </div>
        </div>
      </div>

      
      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="font-display text-2xl font-bold text-ink">Overview</h2>
          <p className="mt-3 whitespace-pre-line text-ink-soft">{tool.fullDescription}</p>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold text-ink">Key information</h2>
          <ul className="mt-3 space-y-2 rounded-[10px] border border-ink/10 bg-white p-5 text-sm shadow-sm">
            <li className="flex justify-between border-b border-dashed border-bone-soft pb-2">
              <span className="text-ink-soft">Category</span>
              <span className="font-medium text-ink">{CATEGORY_LABELS[tool.category]}</span>
            </li>
            <li className="flex justify-between border-b border-dashed border-bone-soft pb-2">
              <span className="text-ink-soft">Condition</span>
              <span className="font-medium capitalize text-ink">{tool.condition}</span>
            </li>
            <li className="flex justify-between border-b border-dashed border-bone-soft pb-2">
              <span className="text-ink-soft">Daily rate</span>
              <span className="font-medium text-ink">
                {tool.dailyRate === 0 ? "Free" : `$${tool.dailyRate}/day`}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-ink-soft">Location</span>
              <span className="font-medium text-ink">{tool.location}</span>
            </li>
          </ul>
        </div>
      </div>

      
      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">Rating</h2>
        <div className="mt-3 flex items-center gap-3 rounded-[10px] border border-ink/10 bg-white p-5 shadow-sm">
          <span className="font-display text-4xl font-bold text-amber">{tool.rating.toFixed(1)}</span>
          <div className="text-sm text-ink-soft">
            <p className="font-semibold text-ink">Community rating</p>
            <p>Based on past borrower feedback for this listing.</p>
          </div>
        </div>
      </div>

      
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold text-ink">Related tools</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((t) => (
              <ToolCard key={t._id} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-sm aspect-square">
      <div className="h-[42%] w-full animate-pulse bg-bone-soft shrink-0" />
      <div className="tag-perforation flex flex-1 flex-col justify-between p-4.5 bg-white">
        
        <div className="flex items-start justify-between gap-2.5">
          <div className="h-5 w-3/4 animate-pulse rounded bg-bone-soft" />
          <div className="h-4.5 w-14 animate-pulse rounded-full bg-bone-soft" />
        </div>

        
        <div className="space-y-1.5 mt-1 mb-1.5">
          <div className="h-3.5 w-full animate-pulse rounded bg-bone-soft" />
          <div className="h-3.5 w-5/6 animate-pulse rounded bg-bone-soft" />
        </div>

        
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-dashed border-bone-soft pt-2 pb-1.5">
          <div className="h-3.5 w-16 animate-pulse rounded bg-bone-soft" />
          <div className="h-3.5 w-12 animate-pulse rounded bg-bone-soft" />
          <div className="h-3.5 w-24 animate-pulse rounded bg-bone-soft col-span-2" />
        </div>

        
        <div className="flex items-center justify-between border-t border-dashed border-bone-soft pt-2">
          <div className="flex flex-col gap-1">
            <div className="h-2.5 w-8 animate-pulse rounded bg-bone-soft" />
            <div className="h-5 w-16 animate-pulse rounded bg-bone-soft" />
          </div>
          <div className="h-8 w-24 animate-pulse rounded-xl bg-bone-soft" />
        </div>
      </div>
    </div>
  );
}

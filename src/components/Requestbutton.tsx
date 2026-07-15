// components/RequestButton.tsx
"use client";

import { toast } from "sonner";

export default function RequestButton() {
  return (
    <button
      onClick={() => {
        toast.success("Borrow successfull");
      }}
      className="focus-ring mt-6 w-full rounded bg-amber py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-amber-dark"
    >
      Request to Borrow
    </button>
  );
}
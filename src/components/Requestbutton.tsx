"use client";

import { toast } from "sonner";
import { useSession } from "@/lib/auth-client"; // adjust the import to your project

export default function RequestButton() {
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session) {
      toast.error("Please sign in to request this tool.");
      return;
    }

    toast.success("Request sent successfully!");
    // Your request logic here
  };

  return (
    <button
      onClick={handleClick}
      className="focus-ring mt-6 w-full rounded bg-amber py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-amber-dark"
    >
      Request to Borrow
    </button>
  );
}
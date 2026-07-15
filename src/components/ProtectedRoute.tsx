"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { data, isPending } = useSession();
  const router = useRouter();
  const user = data?.user;

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (requireAdmin && user.role !== "admin") {
      router.replace("/");
    }
  }, [isPending, user, requireAdmin, router]);

  if (isPending || !user || (requireAdmin && user.role !== "admin")) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex items-center gap-3 text-ink-soft">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-moss border-t-transparent" />
          Checking access...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

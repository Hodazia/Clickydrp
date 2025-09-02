// lib/hooks/useProtectedRoute.ts
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useProtectedRoute() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please sign in to continue");
      router.push("/signin");
    }
  }, [status, router]);

  return { session, status };
}

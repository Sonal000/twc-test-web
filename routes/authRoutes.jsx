"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuthContext";

function authRoutesProtect({ children }) {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  React.useEffect(() => {
    if (!loading) {
      if (user) {
          router.push("/");
        }
    }
  }, [user]);
  return <>{children}</>;
}

export default authRoutesProtect;

"use client";
import React from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";

function userRoutesProtect({ children }) {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [user, loading]);
  return <>{children}</>;
}

export default userRoutesProtect;

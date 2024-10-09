"use client";
import React from "react";
import Image from "next/image";
import { useAuthentication } from "@/api/useAuthentication";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuthContext";

const Footer = () => {
  const router = useRouter();
  const { dispatch } = useAuthContext();
  const { logout } = useAuthentication();
  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log("res", res);
      if (res && res.status === "success") {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
        router.push("/login");
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="w-full flex justify-end items-center p-10">
      <button
        onClick={handleLogout}
        className="flex justify-center items-center gap-2"
      >
        <Image src="/images/logout.png" width={30} height={30} alt="logout" />
        <p className="text-white text-2xl ">logout</p>
      </button>
    </div>
  );
};

export default Footer;

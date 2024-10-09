"use client";
import React from "react";
import Button from "@/components/outlineButton";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="w-[90%] h-full flex justify-center items-start px-10 py-16 flex-col">
      <h1 className="text-white text-4xl md:text-6xl font-bold">Welcome,</h1>
      <h2 className="mt-6 text-white text-2xl md:text-4xl font-medium">
        This is where your contacts will live. Click the button below to add new
        contact.
      </h2>

      <div className="flex justify-center items-center gap-4 mt-16 text-lg text-bold text-white">
        <Button
          onClick={() => {
            router.push("/contacts/new");
          }}
          title="add your first contact"
        />
      </div>
    </div>
  );
};

export default Page;

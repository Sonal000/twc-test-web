"use client";
import React from "react";
import Button from "@/components/outlineButton";
import { useRouter } from "next/navigation";
import ContactTable from "@/components/contactTable";
import { useAuthContext } from "@/hooks/useAuthContext";

const Page = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  return (
    <div className="w-full h-full flex justify-center items-start px-10 py-16 flex-col">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-white text-3xl md:text-5xl font-bold">Contacts</h1>
        <h2 className=" text-white text-md font-medium">
          {user && user?.email}
        </h2>
        <Button
          onClick={() => {
            router.push("/contacts/new");
          }}
          title="add new contact"
        />
      </div>
      <ContactTable></ContactTable>
    </div>
  );
};

export default Page;

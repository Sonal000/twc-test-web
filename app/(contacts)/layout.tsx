import React from "react";
import Page from "@/components/pageTemplate";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Page>{children}</Page>;
};

export default layout;

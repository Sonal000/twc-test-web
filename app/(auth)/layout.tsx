import React from "react";
import AuthPage from "@/components/authPageTemplate";
import ProtectAuthRoutes from "@/routes/authRoutes";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectAuthRoutes>
      <AuthPage>{children}</AuthPage>
    </ProtectAuthRoutes>
  );
};

export default layout;

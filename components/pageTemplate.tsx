import React from "react";
import Header from "./header";
import Footer from "./footer";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[url('/images/white_bg.png')] bg-cover bg-center h-screen  ">
      <div className="bg-[url('/images/Ellipse_2.png')]  bg-cover bg-center min-h-screen flex justify-center">
        <div className="max-w-[1200px] w-full">
          <Header />
          <div>{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;

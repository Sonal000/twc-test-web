import React from "react";
import Image from "next/image";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[url('/images/white_bg.png')] bg-cover bg-center   flex ">
        <div className="  bg-cover bg-no-repeat bg-center w-full    md:w-[55%] xl:w-[55%] min-h-screen flex justify-end items-center overflow-hidden">

          <div className="w-[400vw] h-[140vh]  bg-[rgb(8,63,70)] rounded-tr-[120%] rounded-br-[120%]"></div>
        </div>
      </div>
      <div className="relative w-screen h-screen  flex ">
        <div className="max-w-[1400px] w-full mx-auto flex-col md:flex-row flex justify-center items-center">
          <div className=" order-2 flex justify-center items-center w-full h-full flex-[0.7] md:flex-[0.5]">
            {children}
          </div>
          <div className="order-1 md:order-3 flex-[0.1] md:flex-[0.5]  flex justify-center items-center p-10 ">
            <div className="flex justify-center items-start flex-col">
              <div className="flex  items-center gap-1">

                <div className="w-8 h-8 md:w-10 md:h-10 relative">

                <Image
                  src="/images/twc.png"
                  alt="twc-logo"
                  fill
                  sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
                  />
                  </div>

                <h2 className=" font-semibold text-xl md:text-6xl">twc</h2>
              </div>
              <h2 className="text-2xl md:text-7xl text-white md:text-[#083F46] font-bold">
                contacts
              </h2>
              <p className="text-2xl md:text-7xl text-white md:text-[#083F46] font-medium">
                portal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

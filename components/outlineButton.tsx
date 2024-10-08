import React from "react";

type Props = {
  title: string;
  onClick?: () => void;
  inverted?: boolean;
  type?: "button" | "submit" | "reset";
};

const outlineButton = ({ title, onClick, type, inverted = false }: Props) => {
  return (
    <>
      {inverted ? (
        
        <button
        type={type}
        onClick={onClick}
        className="group border-2 hover:bg-white border-[#083F46] px-5 transition-all duration-200 py-1 rounded-3xl"
      >
        <div className="text-[#083F46] transition-all duration-200 group-hover:text-[#083F46] text-md">
          {title}
        </div>
      </button>

      ) : (
        <button
          type={type}
          onClick={onClick}
          className="group border-2 hover:bg-white border-white px-6 transition-all duration-200 py-1 rounded-3xl"
        >
          <div className="text-white transition-all duration-200 group-hover:text-[#083F46] text-md md:text-lg">
            {title}
          </div>
        </button>
      )}
    </>
  );
};

export default outlineButton;

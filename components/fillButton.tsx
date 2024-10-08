import React from "react";

type Props = {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const outlineButton = ({ title, onClick, type }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="group border-2 hover:bg-white border-[#083F46] bg-[#083F46] px-5 transition-all duration-200  py-1 rounded-3xl"
    >
      <div className="text-white transition-all duration-200 group-hover:text-[#083F46] text-md  md:text-lg">
        {title}
      </div>
    </button>
  );
};

export default outlineButton;

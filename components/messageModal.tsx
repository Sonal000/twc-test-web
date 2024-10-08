import React from "react";
import Button from "@/components/fillButton";

type messageModalProps = {
  action: string;
  message: string;
  onClick: () => void;
};

const messageModal = ({ action, onClick, message }: messageModalProps) => {
  return (
    <>
      <div className="absolute top-0  left-0 bg-black opacity-70 right-0 bottom-0 backdrop-blur-3xl flex justify-center items-center"></div>
      <div className="absolute top-0  left-0  right-0 bottom-0 flex justify-center items-center">
        <div className="rounded-3xl  bg-white  p-10 flex flex-col justify-center items-center gap-2">
          <p className="text-medium text-[#083F46]">{message}</p>

          <Button title={action} onClick={onClick}></Button>
        </div>
      </div>
    </>
  );
};

export default messageModal;

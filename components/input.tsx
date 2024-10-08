type Props = {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error?: string;
};

const Input = ({ title, name, value, onChange, error }: Props) => {
  return (
    <div>
      <div className="bg-white rounded-3xl w-[15rem] md:w-[20rem]  px-5 py-2 flex  justify-center items-center gap-3 text-[#083F46]">
        <h1 className="text-lg md:text-lg whitespace-nowrap font-[550]  text-[#083F46]">
          {title}
        </h1>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full text-[#083F46] text-md md:text-lg bg-transparent border-none focus:outline-none"
        />
      </div>
      <p className="text-xs px-5 text-red-500">{error ? error : ""}</p>
    </div>
  );
};

export default Input;

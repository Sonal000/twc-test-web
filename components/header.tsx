import Image from "next/image"

const header = () => {
  return (
    <div className="w-full p-10 flex justify-start items-center text-[#fff]">
    <div className="flex justify-start flex-col">
      <div className="flex  items-center gap-1">
        <Image
          src="/images/twc.png"
          width={30}
          height={30}
          alt="twc-logo"
        />
        <h2 className=" font-semibold text-2xl">twc</h2>
      </div>
      <h2 className="text-3xl font-bold">contacts</h2>
      <p className="text-3xl font-medium">portal</p>
    </div>
  </div>
  )
}

export default header
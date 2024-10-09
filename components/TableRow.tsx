import Image from "next/image";
import { useContacts } from "@/api/useContacts";
import Button from "@/components/fillButton";
import { useState } from "react";


type tableProps = {
  gender: string;
  fullname: string;
  email: string;
  phone: string;
  _id: string;
  handleDelete: () => void
  setShowModal: React.Dispatch<
  React.SetStateAction<{ state: boolean; message: string; action: string }>
>;
};

const TRow = ({ gender, email, phone, fullname, _id ,setShowModal,handleDelete}: tableProps) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState({
    email: email,
    fullname: fullname,
    phone: phone,
    gender: gender,
  });
  const [error, setError] = useState({
    emailError: "",
    phoneError: "",
    fullnameError: "",
    genderError: "",
    updateError: "",
  });



  const handleGenderClick = () => {
    setValue({ ...value, gender: value.gender === "male" ? "female" : "male" });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    setValue({ ...value, [name]: inputValue });
    setError({
      emailError: "",
      phoneError: "",
      fullnameError: "",
      genderError: "",
      updateError: "",
    });
  };

  const { update } = useContacts();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await update(
          value.email,
          value.phone,
          value.fullname,
          value.gender,
          _id
        );
        if (res && res.status === "success") {
          //   router.push("/contacts");
          setEdit(false);
          setShowModal({
            state: true,
            message: "Your contact has been saved successfully!",
            action: "Okay",
          });
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError({ ...error, updateError: "Failed to create contact" });
        setShowModal({
          state: true,
          message: "Failed to update contact",
          action: "Okay",
        });
      }
    }
  };



  const validate = () => {
    let valid = true;
    const newErrors = {
      emailError: "",
      phoneError: "",
      fullnameError: "",
      genderError: "",
      updateError: "",
    };
    if (!value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      newErrors.emailError = "Invalid email address";
      valid = false;
    }
    if (!value.fullname.trim()) {
      newErrors.fullnameError = "Full name is required";
      valid = false;
    }
    if (!/^\d{10}$/.test(value.phone)) {
      newErrors.phoneError = "Phone number must be exactly 10 digits";
      valid = false;
    }
    if (!value.gender) {
      newErrors.genderError = "Gender is required";
      valid = false;
    }
    setError(newErrors);
    return valid;
  };

  const handleClick = (id: string) => {
    setEdit(true);
    console.log(id);
  };

  return (
    <>
      <tr>
        <td className="min-w-[8rem] px-4 py-2">
          {value?.gender === "female" ? (
            <Image
              src={"/images/female.png"}
              height={40}
              width={40}
              alt="gender"
            ></Image>
          ) : (
            <Image
              src={"/images/male.png"}
              height={40}
              width={40}
              alt="gender"
            ></Image>
          )}
        </td>
        <td className="min-w-[8rem] px-4 py-2">
          {edit ? (
            <input
              className="w-full outline-none bg-slate-300 p-1"
              type="text"
              name="fullname"
              value={value.fullname}
              onChange={handleChange}
            />
          ) : (
            value?.fullname
          )}
          {error && error?.fullnameError && (
            <p className="text-red-500 text-xs ">{error?.fullnameError}</p>
          )}
        </td>
        <td className="min-w-[8rem] px-4 py-2">
          {" "}
          {edit ? (
            <button
              onClick={handleGenderClick}
              className="flex justify-center
          items-center gap-1"
            >
              {value?.gender}
              <Image
                src={"/images/arrow.png"}
                height={20}
                width={20}
                alt="save"
              ></Image>
            </button>
          ) : (
            value?.gender
          )}
        </td>
        <td className="min-w-[8rem] px-4 py-2">
          {" "}
          {edit ? (
            <input
              className="w-full outline-none bg-slate-300 p-1"
              type="text"
              name="email"
              value={value.email}
              onChange={handleChange}
            />
          ) : (
            value?.email
          )}
          {error && error?.emailError && (
            <p className="text-red-500 text-xs ">{error?.emailError}</p>
          )}
        </td>
        <td className="min-w-[8rem] px-4 py-2">
          {" "}
          {edit ? (
            <input
              className="w-full outline-none bg-slate-300 p-1"
              type="text"
              name="phone"
              value={value.phone}
              onChange={handleChange}
            />
          ) : (
            value?.phone
          )}
          {error && error?.phoneError && (
            <p className="text-red-500 text-xs ">{error?.phoneError}</p>
          )}
        </td>
        <td className="min-w-[8rem] px-4 py-2 flex justify-center items-center gap-2">
          {edit ? (
            <form onSubmit={handleSubmit}>
              <Button title="Save" type="submit" />
            </form>
          ) : (
            <div>
              <button
                onClick={() => handleClick(_id)}
                className=" text-white  rounded"
              >
                <Image
                  src={"/images/edit.png"}
                  height={20}
                  width={20}
                  alt="edit"
                ></Image>
              </button>
              <button
                onClick={handleDelete}
                className="= text-white rounded ml-2"
              >
                <Image
                  src={"/images/delete.png"}
                  height={20}
                  width={20}
                  alt="delete"
                ></Image>
              </button>
            </div>
          )}
        </td>
      </tr>


    </>
  );
};

export default TRow;

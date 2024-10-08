"use client";
import React, { useState } from "react";
import Button from "@/components/outlineButton";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import { useContacts } from "@/api/useContacts";

const page = () => {
  const router = useRouter();

  const [value, setValue] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    gender: "",
  });
  const [error, setError] = React.useState({
    emailError: "",
    phoneError: "",
    fullnameError: "",
    genderError: "",
    createError: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    setValue({ ...value, [name]: inputValue });
    setError({
      emailError: "",
      phoneError: "",
      fullnameError: "",
      genderError: "",
      createError: "",
    });
  };

  const { create } = useContacts();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await create(
          value.email,
          value.phone,
          value.fullname,
          value.gender
        );
        if (res && res.status === "success") {
          router.push("/contacts");
        }
      } catch (err) {
        setError({ ...error, createError: "Failed to create contact" });
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
      createError: "",
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

  return (
    <div className="w-[90%] h-[90%] flex justify-center items-start px-10 py-16 flex-col">
      <h1 className="text-white text-3xl md:text-5xl font-bold">New Contact</h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            error={error && error?.fullnameError}
            name="fullname"
            value={value.fullname}
            onChange={handleChange}
            title={"fullname"}
          />
          <Input
            error={error && error?.emailError}
            name="email"
            value={value.email}
            onChange={handleChange}
            title={"e-mail"}
          />
          <Input
            error={error && error?.phoneError}
            name="phone"
            value={value.phone}
            onChange={handleChange}
            title={"phone number"}
          />
          <RadioInput
            gender={value.gender}
            onChange={handleChange}
            error={error.genderError}
          ></RadioInput>
        </div>

        {error && error?.createError && (
          <p className="text-red-500 text-xs ">{error?.createError}</p>
        )}
        <div className="flex justify-start items-center gap-4 mt-16 text-lg text-bold text-white">
          <Button type="submit" title="add your first contact" />
        </div>
      </form>
    </div>
  );
};

export default page;

type RadioInputProps = {
  gender: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const RadioInput = ({ gender, onChange, error }: RadioInputProps) => {
  return (
    <div className="flex flex-col justify-center items-start">
      <div className="flex justify-center items-center gap-4">
        <h2 className="text-white text-lg whitespace-nowrap font-[550] mb-2">
          gender
        </h2>
        <div className="flex items-center gap-4 text-white">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={onChange}
              className="mr-2"
            />
            Male
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={onChange}
              className="mr-2"
            />
            Female
          </label>
        </div>
      </div>
      {<p className="px-5 text-red-500 text-xs">{error ? error : ""}</p>}
    </div>
  );
};

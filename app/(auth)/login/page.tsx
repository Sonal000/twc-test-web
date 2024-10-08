"use client";

import React from "react";
import Button from "@/components/outlineButton";
import Link from "next/link";
import Input from "@/components/input";
import { useAuthentication } from "@/api/useAuthentication";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuthContext";

const page = () => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState({
    emailError: "",
    loginError: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      emailError: "",
      loginError: "",
    };
    if (!value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      newErrors.emailError = "Invalid email address";
      valid = false;
    }
    setError(newErrors);
    return valid;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    setValue({ ...value, [name]: inputValue });
    setError({ emailError: "", loginError: "" });
  };

  const { login } = useAuthentication();
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await login(value.email, value.password);
        if (res && res.status === "success") {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch({ type: "LOGIN", payload: res.data.user });
          router.push("/");
        }
      } catch (err) {
        setError({ ...error, loginError: "Invalid email or password" });
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center md:items-start px-10">
        <div className="w-[80%] md:w-[60%]">
          <h1 className="text-white text-5xl font-bold">Hi there,</h1>
          <h2 className="mt-4 text-white text-3xl font-medium">
            Welcome to our contacts portal
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center  flex-col items-start w-full gap-5 mt-10">
            <Input
              name="email"
              value={value.email}
              onChange={handleChange}
              title={"e-mail"}
              error={error && error?.emailError}
            />
            <Input
              name="password"
              value={value.password}
              onChange={handleChange}
              title={"password"}
            />

            {error && error?.loginError && (
              <p className="text-red-500 text-xs ">{error?.loginError}</p>
            )}
            <div className="flex justify-center items-center gap-4 mt-3 text-lg text-bold text-white">
              <Button type="submit" title="login" />
              or
              <Link className="underline" href="/register">
                Click to Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;

"use client";
import React from "react";
import AuthPage from "@/components/authPageTemplate";
import Button from "@/components/outlineButton";
import Link from "next/link";
import Input from "@/components/input";
import { useAuthentication } from "@/api/useAuthentication";
import { useRouter } from "next/navigation";

const page = () => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    registerError: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    setValue({ ...value, [name]: inputValue });
    setError({
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      registerError: "",
    });
  };

  const { register } = useAuthentication();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await register(
          value.email,
          value.password,
          value.confirmPassword
        );
        if (res && res.status === "success") {
          router.push("/login");
        }
      } catch (err) {
        setError({ ...error, registerError: "Registration failed!" });
      }
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      registerError: "",
    };
    if (!value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      newErrors.emailError = "Invalid email address";
      valid = false;
    }
    if (value.password.length < 6) {
      newErrors.passwordError = "Password must be at least 6 characters";
      valid = false;
    }
    if (value.confirmPassword !== value.password) {
      newErrors.confirmPasswordError = "Passwords do not match";
      valid = false;
    }
    setError(newErrors);
    return valid;
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-start px-10">
        <div className="w-full">
          <h1 className="text-white text-5xl font-bold">Register Now!</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center flex-col items-start w-full gap-5 mt-10">
            <Input
              title={"e-mail"}
              name="email"
              value={value.email}
              onChange={handleChange}
              error={error && error?.emailError}
            />
            <Input
              title={"create password"}
              name="password"
              value={value.password}
              onChange={handleChange}
              error={error && error?.passwordError}
            />
            <Input
              title={"confirm password"}
              name="confirmPassword"
              value={value.confirmPassword}
              onChange={handleChange}
              error={error && error?.confirmPasswordError}
            />

            {error && error?.registerError && (
              <p className="text-red-500 text-xs ">{error?.registerError}</p>
            )}
            <div className="flex justify-center items-center gap-4 mt-3 text-lg text-bold text-white">
              <Button type="submit" title="register" />
              or
              <Link className="underline" href="/login">
                Back to Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;

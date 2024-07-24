"use client";
import RenderField from "@/lib/filed/renderField";
import React, { useEffect } from "react";
import { Form } from "react-final-form";

interface FormValues {
  username: string;
  password: string;
}
const Login: React.FC = () => {
  const onSubmit = async (values: FormValues) => {
    // console.log("Form submitted:", values);
    try {
      const response = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        onSubmit={onSubmit}
        initialValues={{ username: "", password: "" }}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="p-5 gap-6 flex flex-col w-96 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] h-auto"
          >
            <div className="flex justify-center text-[18px]">
              Silahkan Login
            </div>

            <RenderField<FormValues>
              name="username"
              placeholder="Masukkan Username"
            />

            <RenderField<FormValues>
              name="password"
              placeholder="Masukkan Password"
            />
            <button
              type="submit"
              className="flex bg-black text-white rounded justify-center p-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
            >
              {" "}
              Login{" "}
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default Login;

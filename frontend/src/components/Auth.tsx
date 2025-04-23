import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@harshitb_14/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing up");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-neutral-700  rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-blue-500 mb-4">
              {type === "signin" ? "Welcome Back" : "Get Started"}
            </h1>
            <p className="text-gray-300">
              {type === "signin"
                ? "Sign in to continue your journey"
                : "Create your account to begin"}
            </p>
            <div className="mt-2">
              <span className="text-sm text-gray-300">
                {type === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Link
                  to={type === "signin" ? "/signup" : "/signin"}
                  className="ml-2 text-blue-400 hover:text-indigo-200 font-semibold transition-colors"
                >
                  {type === "signin" ? "Sign up" : "Sign in"}
                </Link>
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {type === "signup" && (
              <LabelledInput
                label="Full Name"
                placeholder="John Doe"
                icon="👤"
                onChange={(e) =>
                  setPostInputs({ ...postInputs, name: e.target.value })
                }
              />
            )}

            <LabelledInput
              label="Email"
              placeholder="john@example.com"
              icon="✉️"
              onChange={(e) =>
                setPostInputs({ ...postInputs, username: e.target.value })
              }
            />

            <LabelledInput
              label="Password"
              type="password"
              placeholder="••••••••"
              icon="🔒"
              onChange={(e) =>
                setPostInputs({ ...postInputs, password: e.target.value })
              }
            />

            <button
              onClick={sendRequest}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.01] hover:shadow-indigo-200 "
            >
              {type === "signup" ? "Create Account" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type = "text",
}: LabelledInputType) {
  return (
    <div className="relative">
      <input
        type={type}
        id={label.replace(/\s+/g, "-").toLowerCase()} // Unique ID for accessibility
        onChange={onChange}
        placeholder=" " // Required for floating label effect
        className="peer  block w-full px-3 pb-3 pt-5 text-base text-white bg-transparent rounded-lg border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:text-white dark:border-gray-600 dark:focus:border-blue-500
        autofill:bg-[#171717] autofill:shadow-[inset_0_0_0px_1000px_#171717]"
        required
      />
      <label
        htmlFor={label.replace(/\s+/g, "-").toLowerCase()}
        className="absolute text-md text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-2 z-10 origin-[0] bg-[#171717] px-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
      >
        {label}
      </label> <style>
        {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active {
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s !important;
            background-color: black !important;
          }
        `}
      </style>
    </div>
  );
}
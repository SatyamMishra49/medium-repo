import { ChangeEvent, useState } from "react";
import AuthHeader from "./AuthHeader";
import { SigninInput } from "@lakshaycode22/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SigninAuth = () => {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState<SigninInput>({
    username: "",
    password: "",
  });
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        userInputs
      );
      const jwtToken = response.data.token;
      localStorage.setItem("token", jwtToken);
      navigate("/blogs")
    } catch (error) {
      alert(
        "There was an error while signing up. Please make sure your account doesn't already exist and you have entered proper credentials."
      );
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center h-screen p-4">
        <div className="flex justify-center">
          <div>
            <div className="lg:px-12 p-4">
              {" "}
              <AuthHeader type="signIn" />
            </div>

            <div>
              <LabelledInputField
                label="Username"
                placeholder="example@gmail.com"
                onChange={(e) => {
                  setUserInputs({ ...userInputs, username: e.target.value });
                }}
                type="text"
              />
              <LabelledInputField
                label="Password"
                placeholder="12345678"
                onChange={(e) => {
                  setUserInputs({ ...userInputs, password: e.target.value });
                }}
                type="password"
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="mt-4 bg-black w-full text-white rounded-md p-2 font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputField {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const LabelledInputField = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputField) => {
  return (
    <div className="mt-2">
      <div className="font-semibold">{label}</div>
      <input
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        className="border-2 rounded-md w-full p-2"
      />
    </div>
  );
};

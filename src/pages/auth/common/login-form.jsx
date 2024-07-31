import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/api/auth/authSlice";
import { toast } from "react-toastify";
import { doSignInWithEmailAndPassword } from "../../../utils/firebase/auth";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const [isLoading, setIsloading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setIsloading(true);
      const response = await doSignInWithEmailAndPassword(data.email, data.password);
      // if (response.error) {
      //   throw new Error(response.error.message);
      // }

      // if (response.data.error) {
      //   throw new Error(response.data.error);
      // }

      // if (!response.data.token) {
      //   throw new Error("Invalid credentials");
      // }

      dispatch(setUser(data));
      navigate("/dashboard");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        placeholder="Enter your Email"
        name="email"
        label="email"
        type="email"
        register={register}
        error={errors.email}
        className="h-[48px]"
      />
      <Textinput
        placeholder="Enter your Password"
        name="password"
        label="passwrod"
        type="password"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/auth/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        text="Login"
        className="btn btn-dark block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;

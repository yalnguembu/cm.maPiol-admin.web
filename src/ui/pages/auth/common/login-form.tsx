import React, { useContext, useState } from "react";
import Textinput from "@/ui/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "@/ui/components/ui/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { homePages } from "@/utils/menus";
import { useDispatch } from "react-redux";
import { setUser } from "@/ui/store/api/auth/authSlice";
import { DependeciesContext } from "@/utils/useDepedencies";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const LoginForm = () => {
  const { userServices } = useContext(DependeciesContext);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const navigate = useNavigate();
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const user = await userServices.login(email, password);
      console.log(user);
      if (user.status !== 1) {
        toast.info(
          "Votre compte est inactif veillez contacter l'administrateur pour l'activer"
        );
        return;
      }

      dispatch(setUser(JSON.parse(JSON.stringify(user))));

      navigate(homePages[user.userType]);
      toast.success("Connecté avec succès");
    } catch (error: unknown) {
      const errorCode = error?.code;
      if (errorCode === "auth/invalid-credential") {
        toast.error("Email ou mot de passe incorrect");
      } else if (errorCode === "auth/network-request-failed") {
        toast.error("Assurez-vous d'avoir une bonne connexion et réessayez");
      } else {
        console.log(errorCode);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        type="email"
        register={register}
        error={errors.email}
        value={email}
        onChange={(e) => setemail(e.target.value)}
        className="h-[48px]"
        placeholder="Entrer votre addresse email"
      />
      <Textinput
        name="password"
        label="mots de passe"
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        register={register}
        error={errors.password}
        className="h-[48px]"
        placeholder="Entrer votre mot de passe"
      />
      <div className="flex justify-end">
        <Link
          to="/auth/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Mot de passe oublié?{" "}
        </Link>
      </div>
      <Button
        type="submit"
        text="Se connecter"
        className="block w-full text-center btn-dark py-2 rounded-lg font-medium"
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;

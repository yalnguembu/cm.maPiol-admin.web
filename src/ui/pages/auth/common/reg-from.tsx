import React, { useContext, useState } from "react";
import Textinput from "@/ui/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/ui/components/ui/Button";
import { toast } from "react-toastify";
import { DependenciesContext } from "@/utils/useDependencies";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("L'Email est Requis"),
    lastname: yup.string().required("Le Lastname est Requis"),
    firstname: yup.string().required("Le Firstname est Requis"),
    password: yup
      .string()
      .min(8, "8 caracteres minimum")
      .max(16, "16 caracteres au maximum")
      .required("Le mot de pase est Requis"),
  })
  .required();

type RegisterFormProps = {
  next: (id: string) => void;
};
const RegisterForm = ({ next }: RegisterFormProps) => {
  const { userServices } = useContext(DependenciesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setemail] = useState("");
  const [lastname, setNom] = useState("");
  const [firstname, setPrenom] = useState("");
  const [password, setpassword] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const user = await userServices.createOwner({
        email,
        password,
        firstname,
        lastname,
      });
      next(user.id); 
    } catch (error) {
      var errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        toast.error("L'email existe deja");
      } else if (errorCode === "auth/network-request-failed") {
        toast.error("Assurez vous d'avoir une bonne connexion et réesayez");
      } else {
        toast.error("Erreur d'inscription,veuillez réessayer");
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="lastname"
        label="Nom"
        type="text"
        register={register}
        error={errors.lastname}
        value={lastname}
        onChange={(e) => setNom(e.target.value)}
        className="h-[48px]"
        placeholder="Entrer votre nom"
      />
      <Textinput
        name="firstname"
        label="Prenom"
        type="text"
        register={register}
        error={errors.firstname}
        value={firstname}
        onChange={(e) => setPrenom(e.target.value)}
        className="h-[48px]"
        placeholder="Entrer votre prenom"
      />
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
        placeholder="Entrer votre mot de passe"
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <Button
        type="submit"
        text="Continuer"
        className="btn btn-dark block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default RegisterForm;

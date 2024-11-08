import React, { useState } from "react";
import Button from "@/ui/components/ui/Button";
import Modal from "@/ui/components/ui/Modal";
import Textinput from "@/ui/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDepedencies } from "@/utils/useDepedencies";

type Props = {
  onCreated: () => Promise<void>;
  isActive: boolean;
  onClose: () => void;
};
const AddUserModal = (props: Props) => {
  const { onCreated, isActive, onClose } = props;
  const { userServices } = useDepedencies();

  const [email, setEmail] = useState<string>("");
  const [firstname, setNom] = useState<string>("");
  const [lastname, setPrenom] = useState<string>("");
  const [idCardNumber, setCNI] = useState<string>("");
  const [phoneNumber, setTelephone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schema = yup
    .object({
      email: yup.string().email("Invalid email").required("L'Email est Requis"),
      firstname: yup.string().required("Ce champs est Requis"),
      lastname: yup.string().required("Ce champs est Requis"),
      idCardNumber: yup.string().required("Ce champs est Requis"),
      phoneNumber: yup.string().required("Ce champs est Requis"),
      password: yup
        .string()
        .required("Ce champs est Requis")
        .min(8, "Minimum 8 caracteres")
        .max(16, "Maximum 8 caracteres"),
    })
    .required();

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
      const userId = await userServices.createAdminUser({
        email: email,
        lastname: lastname,
        firstname: firstname,
        phoneNumber: phoneNumber,
        idCardNumber: idCardNumber,
      });

      if (userId) {
        await onCreated();
        toast.success("User cree avec succes");
      }
    } catch (error) {
      toast.error("Erreur lors de la creation, veuillez réessayer");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        activeModal={isActive}
        onClose={onClose}
        className="max-w-xl w-[600px]"
        centered
        title="Nouvel utilisateur"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 grid grid-cols-2"
        >
          <Textinput
            name="email"
            label="addresse email"
            type="email"
            register={register}
            error={errors.email}
            value={email}
            onChange={(event: InputEvent) => setEmail(event.target?.value)}
            className="h-[48px]"
            placeholder="Entrer l'addresse email"
          />
          <Textinput
            name="phoneNumber"
            label="Telephone"
            type="number"
            register={register}
            error={errors.phoneNumber}
            value={phoneNumber}
            onChange={(event: InputEvent) => setTelephone(event.target?.value)}
            className="h-[48px]"
            placeholder="Entrer le numero de phoneNumber"
          />
          <Textinput
            name="firstname"
            value={firstname}
            label="Nom"
            type="text"
            register={register}
            error={errors.firstname}
            onChange={(event: InputEvent) => setNom(event.target?.value)}
            className="h-[48px]"
            placeholder="Entrer le addresse firstname"
          />
          <Textinput
            name="lastname"
            label="Prenom"
            type="text"
            register={register}
            error={errors.lastname}
            value={lastname}
            onChange={(event: InputEvent) => setPrenom(event.target?.value)}
            className="h-[48px]"
            placeholder="Entrer le addresse lastname"
          />
          <Textinput
            name="idCardNumber"
            label="idCardNumber"
            type="text"
            register={register}
            error={errors.idCardNumber}
            value={idCardNumber}
            onChange={(event: InputEvent) => setCNI(event.target?.value)}
            className="h-[48px]"
            placeholder="Entrer le numero decni"
          />
          <Textinput
            name="password"
            label="Mot de passe"
            type="password"
            register={register}
            error={errors.password}
            value={password}
            onChange={(event: InputEvent) => setPassword(event.target?.value)}
            className="h-[48px]"
            placeholder="Entrer le mot de passe"
          />
          <div className="pb-4"></div>
          <div className="pb-4 flex justify-end w-full">
            <Button
              type="submit"
              text="Creer"
              className="btn btn-dark block text-center px-12 mt-4"
              isLoading={isLoading}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddUserModal;

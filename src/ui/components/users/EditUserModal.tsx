import React, { useState } from "react";
import Button from "@/ui/components/ui/Button";
import Modal from "@/ui/components/ui/Modal";
import Textinput from "@/ui/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDependencies } from "@/utils/useDependencies";
import { UserView } from "@/primary/UserView";

type Props = {
  onUpdated: () => Promise<void>;
  isActive: boolean;
  onClose: () => void;
  user: UserView;
};

const EditUserModal = (props: Props) => {
  const { onUpdated, isActive, onClose, user } = props;
  const { userServices } = useDependencies();

  const [email, setEmail] = useState(user?.email);
  const [lastname, setNom] = useState(user?.lastname);
  const [firstname, setPrenom] = useState(user?.firstname);
  const [idCardNumber, setCNI] = useState(user?.idCardNumber);
  const [phoneNumber, setTelephone] = useState(user?.phoneNumber);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup
    .object({
      email: yup.string().email("Invalid email").required("L'Email est Requis"),
      lastname: yup.string().required("Ce champs est Requis"),
      firstname: yup.string().required("Ce champs est Requis"),
      idCardNumber: yup.string().required("Ce champs est Requis"),
      phoneNumber: yup.string().required("Ce champs est Requis"),
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
      await userServices.updateUser(user.id, {
        email: email,
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber,
        idCardNumber: idCardNumber,
      });
      await onUpdated();
      toast.success("Utilisateur modifier avec succes");
    } catch (error) {
      toast.error("Erreur lors de l'edition, veuillez réessayer");
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <>
      <Modal
        activeModal={isActive}
        onClose={onClose}
        className="w-1/2"
        centered
        title="Modifier Profile"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 grid grid-cols-1"
        >
          <Textinput
            name="lastname"
            value={lastname}
            label="Nom"
            type="text"
            register={register}
            error={errors.lastname}
            onChange={(e) => setNom(e.target.value)}
            className="h-[48px]"
            placeholder="Entrer le addresse nom"
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
            placeholder="Entrer le addresse prenom"
          />
          <Textinput
            name="email"
            label="addresse email"
            type="email"
            register={register}
            error={errors.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[48px]"
            placeholder="Entrer le addresse email"
          />
          <Textinput
            name="phoneNumber"
            label="Telephone"
            type="number"
            register={register}
            error={errors.phoneNumber}
            value={phoneNumber}
            onChange={(e) => setTelephone(e.target.value)}
            className="h-[48px]"
            placeholder="Entrer le numero de telephone"
          />
          <Textinput
            name="idCardNumber"
            label="CNI"
            type="text"
            register={register}
            error={errors.idCardNumber}
            value={idCardNumber}
            onChange={(e) => setCNI(e.target.value)}
            className="h-[48px]"
            placeholder="Entrer le numero de CNI"
          />
          <div className="pb-4">
            <Button
              type="submit"
              text="Enregistrer"
              className="btn btn-dark block w-full text-center "
              isLoading={isLoading}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditUserModal;

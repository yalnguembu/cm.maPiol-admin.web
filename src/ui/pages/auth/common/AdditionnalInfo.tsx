import React, { useContext, useState, Fragment } from "react";
import Textinput from "@/ui/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/ui/components/ui/Button";
import { toast } from "react-toastify";
import { Transition } from "@headlessui/react";
import { DependeciesContext } from "@/utils/useDepedencies";
import Fileinput from "@/ui/components/ui/Fileinput";

const schema = yup
  .object({
    idCardNumber: yup.string().required("Ce champs est Requis"),
    idCardExpirationDate: yup.string().required("Ce champs est Requis"),
  })
  .required();

const AdditionnalInfos = ({ userId }) => {
  const { userServices } = useContext(DependeciesContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [idCardNumber, setNom] = useState("");
  const [idCardExpirationDate, setIdCardExpirationDate] = useState("");
  const [idCardPicture, setIdCardPicture] = useState("");

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
      await userServices.addAdditionnalInfos(userId, {
        idCardNumber,
        idCardExpirationDate,
        idCardPicture,
      });

      setIsSuccess(true);
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
    <Transition appear show={true} as={Fragment}>
      <div className="w-full h-full overflow-y-auto">
        <div className={`flex min-h-full items-center justify-center p-6`}>
          <Transition.Child
            as={Fragment}
            enter={"duration-300  ease-out"}
            enterFrom={"opacity-0 scale-95"}
            enterTo={"opacity-100 scale-100"}
            leave={"duration-200 ease-in"}
            leaveFrom={"opacity-100 scale-100"}
            leaveTo={"opacity-0 scale-95"}
          >
            {!isSuccess ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-3/5"
              >
                <p className="text-center mb-12">
                  Votre compte a ete cree avec succes cependant nous desirons
                  plus d'elements pour valider votre compte afin que vous
                  puissier ajouter vos biens sur kinaru
                </p>
                <Textinput
                  name="idCardNumber"
                  label="Numero de CNI"
                  type="text"
                  register={register}
                  error={errors.idCardNumber}
                  value={idCardNumber}
                  onChange={(e) => setNom(e.target.value)}
                  className="h-[48px]"
                  placeholder="Entrer votre Numero de CNI"
                />
                <Textinput
                  name="idCardExpirationDate"
                  label="Date d'expiration"
                  type="date"
                  register={register}
                  error={errors.idCardExpirationDate}
                  value={idCardExpirationDate}
                  onChange={(e) => setIdCardExpirationDate(e.target.value)}
                  className="h-[48px]"
                  placeholder="Entrer sa date d'expiration"
                />
                <Fileinput
                  accept="image/png, image/jpeg"
                  label="Photo CNI"
                  name="picture"
                  preview={true}
                  required={false}
                  selectedFile={idCardPicture}
                  placeholder="Choose a file or drop it here..."
                  className="h-40"
                  onChange={(e) => setIdCardPicture(e.target?.files[0])}
                />
                <Button
                  type="submit"
                  text="Terminer"
                  className="btn btn-dark block w-full text-center "
                  isLoading={isLoading}
                />
              </form>
            ) : (
              <p className="text-center mb-12">
                Votre information on ete ajouter avec succes, vos informations
                sont encour de verification nous vous recontactereons merci!
              </p>
            )}
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};

export default AdditionnalInfos;

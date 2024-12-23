import React, {useContext, useState, Fragment} from "react";
import Textinput from "@/ui/components/ui/Textinput";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/ui/components/ui/Button";
import {toast} from "react-toastify";
import {Transition} from "@headlessui/react";
import {DependenciesContext, ServicesContext} from "@/utils/useDependencies";
import Fileinput from "@/ui/components/ui/Fileinput";

const schema = yup
  .object({
    idCardNumber: yup.string().required("Ce champs est Requis"),
    idCardExpirationDate: yup.string().required("Ce champs est Requis"),
    phoneNumber: yup.string().required("Ce champs est Requis"),
    address: yup.string().required("Ce champs est Requis"),
  })
  .required();

const AdditionalInfos = ({userId}) => {
  const {userServices} = useContext<ServicesContext>(DependenciesContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [idCardNumber, setNom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [idCardExpirationDate, setIdCardExpirationDate] = useState("");
  const [idCardPicture, setIdCardPicture] = useState("");
  const [picture, setPicture] = useState("");

  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),

    mode: "all",
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await userServices.addAdditionalInfos(userId, {
        idCardNumber,
        idCardExpirationDate,
        idCardPicture,
        phoneNumber,
        address,
        picture
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
                <div className="grid grid-cols-2 gap-4">
                  <Textinput
                    name="phoneNumber"
                    label="Numero de telephone"
                    type="text"
                    register={register}
                    error={errors.phoneNumber}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-[48px]"
                    placeholder="Entrer votre Numero de telephone"
                  />
                  <Textinput
                    name="address"
                    label="Adresse"
                    type="text"
                    register={register}
                    error={errors.address}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-[48px]"
                    placeholder="Entrer votre adresse"
                  />
                  <div className="col-span-2">
                    <Fileinput
                      accept="image/png, image/jpeg"
                      label="Photo de profile"
                      name="profile"
                      preview={true}
                      required={false}
                      selectedFile={picture}
                      placeholder="Choose a file or drop it here..."
                      className="h-40 w-40 rounded-full mx-auto"
                      onChange={(e) => setPicture(e.target?.files[0])}
                    />
                  </div>

                  <div className="w-full my-4 bg-gray-200 h-[1px] block col-span-2"></div>
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
                  <div className="col-span-2">
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
                  </div>
                </div>
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

export default AdditionalInfos;

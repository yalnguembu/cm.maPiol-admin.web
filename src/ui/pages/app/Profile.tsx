import { Link } from "react-router-dom";
import Icon from "@/ui/components/ui/Icon";
import Card from "@/ui/components/ui/Card";
import { useEffect, useState } from "react";
import Button from "@/ui/components/ui/Button";
import Modal from "@/ui/components/ui/Modal";
import Textinput from "@/ui/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import WigetBg from "@/ui/assets/images/all-img/widget-bg-1.png";
import { UserView } from "@/primary/UserView";
import { useDepedencies } from "@/utils/useDepedencies";
import { State } from "@/ui/store/rootReducer";
import React from "@/react";
import Loading from "@/ui/components/Loading";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("L'Email est Requis"),
    nom: yup.string().required("Ce champs est Requis"),
    prenom: yup.string().required("Ce champs est Requis"),
    cni: yup.string().required("Ce champs est Requis"),
    telephone: yup.string().required("Ce champs est Requis"),
  })
  .required();
const Profile = () => {
  const { user: profile } = useSelector((state: State) => state.auth);

  const { userServices } = useDepedencies();
  const [user, setUser] = useState<UserView | null>(null);
  const [shouldEdit, setShouldEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toogleShouldEdit = () => setShouldEdit(!shouldEdit);

  const fetchProfile = async () => {
    setIsLoading(true);

    const response = await servcice.getUserById(profile?.id ?? "");

    setUser(response);
    setIsLoading(false);
  };

  const EditProfileModal = ({ user }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState(user.email);
    const [nom, setNom] = useState(user.nom);
    const [prenom, setPrenom] = useState(user.prenom);
    const [cni, setCNI] = useState(user.num_cni);
    const [telephone, setTelephone] = useState(user.telephone);
    const [isLoading, setIsLoading] = useState(false);

    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm({
      resolver: yupResolver(schema),
      //
      mode: "all",
    });

    const onSubmit = async (data) => {
      try {
        // const user = updateDocument("Users", userId, {
        //   email: email,
        //   prenom: prenom,
        //   nom: nom,
        //   telephone: telephone,
        //   num_cni: cni,
        // });
        // dispatch(setUser(user));
        fetchProfile();
        toogleShouldEdit();
        toast.success("Prolif modifier");
      } catch (error) {
        toast.error("Erreur lors de l'edition,veuillez réessayer");
        console.log(error);
      }
    };

    return (
      <>
        <Modal
          activeModal={shouldEdit}
          onClose={toogleShouldEdit}
          className="max-w-xl"
          centered
          title="Modifier Profile"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <Textinput
              name="nom"
              value={nom}
              label="Nom"
              type="text"
              register={register}
              error={errors.nom}
              onChange={(e) => setNom(e.target.value)}
              className="h-[48px]"
              placeholder="Entrer votre adresse nom"
            />
            <Textinput
              name="prenom"
              label="Prenom"
              type="text"
              register={register}
              error={errors.prenom}
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="h-[48px]"
              placeholder="Entrer votre adresse prenom"
            />
            <Textinput
              name="email"
              label="Adresse email"
              type="email"
              register={register}
              error={errors.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[48px]"
              placeholder="Entrer votre adresse email"
            />
            <Textinput
              name="telephone"
              label="Telephone"
              type="number"
              register={register}
              error={errors.telephone}
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="h-[48px]"
              placeholder="Entrer votre adresse telephone"
            />
            <Textinput
              name="cni"
              label="cni"
              type="text"
              register={register}
              error={errors.cni}
              value={cni}
              onChange={(e) => setCNI(e.target.value)}
              className="h-[48px]"
              placeholder="Entrer votre numero decni"
            />

            <Button
              type="submit"
              text="Enregistrer"
              className="btn btn-dark block w-full text-center "
              isLoading={isLoading}
            />
          </form>
        </Modal>
      </>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    setUser(profile);
    setIsLoading(false);
  }, []);

  const userTypes = [
    "",
    "Visiteur",
    "Locataire",
    "Propriétaire",
    "Administrateur",
  ];
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-5 profile-page">
          <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
            <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
            <div className="profile-box flex-none md:text-start text-center">
              <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                <div className="flex-none">
                  <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                    <img
                      src={user?.picture}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                    <Link
                      to="#"
                      className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                    >
                      <Icon icon="heroicons:camera" />
                    </Link>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                    {user?.fullName}
                  </div>
                  <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                    {userTypes[user?.userType]}
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <Button
                onClick={toogleShouldEdit}
                icon="heroicons:pencil-square"
                className="btn btn-dark"
                text="Modifier"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-4">
              <Card title="Informations">
                <ul className="list space-y-8">
                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <Icon icon="heroicons:envelope" />
                    </div>
                    <div className="flex-1">
                      <div className="capitalise text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        EMAIL
                      </div>
                      <a
                        href={`mailto:${user?.email}`}
                        className="text-base text-slate-600 dark:text-slate-50"
                      >
                        {user?.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <Icon icon="heroicons:phone-arrow-up-right" />
                    </div>
                    <div className="flex-1">
                      <div className="capitalise text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        TELEPHONE
                      </div>
                      <a
                        href={`tel:${user?.phoneNumber}`}
                        className="text-base text-slate-600 dark:text-slate-50"
                      >
                        {user?.telephone}
                      </a>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <Icon icon="heroicons:map-pin" />
                    </div>
                    <div className="flex-1">
                      <div className="capitalise text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        LOCALISATION
                      </div>
                      <div className="text-base text-slate-600 dark:text-slate-50">
                        {user?.adress}
                      </div>
                    </div>
                  </li>
                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="capitalise text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        NuUMERO CNI
                      </div>
                      <div className="text-base text-slate-600 dark:text-slate-50">
                        {user?.idCardNumber}
                      </div>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
            <div className="lg:col-span-3">
              <div
                className="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] h-40 relative"
                style={{
                  backgroundImage: `url(${WigetBg})`,
                }}
              >
                <div className="max-w-[180px]">
                  <h4 className="text-xl font-medium mb-4">
                    Upgrade your Dashcode
                  </h4>
                  <p className="text-sm text-opacity-80">
                    Pro plan for better results
                  </p>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 ltr:right-6 rtl:left-6 mt-2 h-12 w-12 bg-slate-800 text-white rounded-full text-xs font-medium flex flex-col items-center justify-center">
                  Now
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {shouldEdit && <EditProfileModal user={user} />}
    </div>
  );
};

export default Profile;

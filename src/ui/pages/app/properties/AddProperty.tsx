import React, { useContext, useState, useEffect } from "react";
import Textinput from "@/ui/components/ui/Textinput";
import Textarea from "@/ui/components/ui/Textarea";
import Button from "@/ui/components/ui/Button";
import Card from "@/ui/components/ui/Card";
import Icon from "@/ui/components/ui/Icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "@/ui/components/ui/Select";
import DropZone from "@/ui/components/partials/DropZone";
import Checkbox from "@/ui/components/ui/Checkbox";
import GoogleMapReact from "google-map-react";
import imgMaker from "../../../assets/images/marker.png";
import { useNavigate } from "react-router-dom";
import InputGroup from "@/ui/components/ui/InputGroup";
import { DependeciesContext } from "@/utils/useDepedencies";

const steps = [
  {
    id: 1,
    title: "Informations de base",
  },
  {
    id: 2,
    title: "Images",
  },
  {
    id: 3,
    title: "Address",
  },
  {
    id: 4,
    title: "Autres",
  },
];

const basicInformations = yup.object().shape({
  usage: yup.string().required("Ce champs est requis"),
  description: yup.string().required("Ce champs est requis"),
  type: yup.string().required("Ce champs est requis"),
  numberOfBuilding: yup.string().required("Ce champs est requis"),
  nombrePieces: yup.string().required("Ce champs est requis"),
  nombreEtage: yup.string().required("Ce champs est requis"),
  nombreEscalier: yup.string().required("Ce champs est requis"),
  surface: yup.string().required("Ce champs est requis"),
  centerOfImposition: yup.string().required("Ce champs est requis"),
  frequence: yup.string().required("Ce champs est requis"),
  bedroomNumber: yup.string().required("Ce champs est requis"),
  bathroomNumber: yup.string().required("Ce champs est requis"),
});

const imagesSchema = yup.object().shape({
  usage: yup.string().required("Ce champs est requis"),
});

const addressSchema = yup.object().shape({
  ville: yup.string().required("Ce champs est requis"),
  quartier: yup.string().required("Ce champs est requis"),
  street: yup.string().required("Ce champs est requis"),
});

const otherSchema = yup.object().shape({
  usage: yup.string().required("Ce champs est requis"),
});

const frequencies = [
  { value: "Jours", label: "Jours" },
  { value: "Semaines", label: "Semaines" },
  { value: "Mois", label: "Mois" },
  { value: "Annee", label: "Annee" },
];
const AddProperty = () => {
  const { propertyServices } = useContext(DependeciesContext);
  const navigate = useNavigate();
  const [stepNumber, setStepNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // first step
  const [usage, setUsage] = useState(0);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("XAF");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [numberOfBuilding, setNumberOfBulding] = useState("");
  const [nombrePieces, setNumberOfRoom] = useState("");
  const [nombreEscalier, setNumberOfStaircase] = useState("");
  const [nombreEtage, setNumberOfFloor] = useState("");
  const [surface, setSurface] = useState("");
  const [centerOfImposition, setCenterOfImposition] = useState("");
  const [frequence, setFrequence] = useState("");
  const [bedroomNumber, setNumberOfBedRoom] = useState("");
  const [bathroomNumber, setNumberOfBath] = useState("");

  //images step
  const [files, setFiles] = useState([]);

  //adresse step
  const [ville, setVille] = useState("");
  const [quartier, setQuartier] = useState("");
  const [street, setAdresse] = useState("");

  //images step

  //others informations step
  const [hasAssensor, setAssensor] = useState(false);
  const [hasBalcony, setBalcony] = useState(false);
  const [hasCave, setCave] = useState(false);
  const [hasSchoolNearby, setSchoolNearby] = useState(false);
  const [hasCollectiveHeating, setCollectiveHeating] = useState(false);
  const [hasPath, setPath] = useState(false);
  const [hasCollectiveHotWater, setCollectiveHotWater] = useState(false);
  const [hasHealthCenterNearby, setNearbyHealthCenter] = useState(false);
  const [hasGreenSpace, setGreenSpace] = useState(false);
  const [hasGarage, setGarage] = useState(false);
  const [hasSecurity, setSecurity] = useState(false);
  const [hasIntercom, setIntercom] = useState(false);
  const [hasDiningRoom, setDiningRoom] = useState(false);
  const [hasGrabageChute, setGarbageChute] = useState(false);

  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

  const handleMapClick = ({ lat, lng }) => {
    setPosition({ lat, lng });
  };
  useEffect(() => {
    // Fonction pour obtenir la position actuelle de l'utilisateur
    const fetchCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error obtaining location:", error);
            // Gestion des erreurs ou des valeurs par défaut si la géolocalisation échoue
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // Gestion des valeurs par défaut si la géolocalisation n'est pas supportée
      }
    };

    fetchCurrentLocation();
    fecthResidentialType();
    fecthCommercialType();
  }, []); // L'effet s'exécute uniquement lors du premier rendu du composant

  // find current step schema
  let currentStepSchema;
  switch (stepNumber) {
    case 0:
      currentStepSchema = basicInformations;
      break;
    case 1:
      currentStepSchema = imagesSchema;
      break;
    case 2:
      currentStepSchema = addressSchema;
      break;
    case 3:
      currentStepSchema = otherSchema;
      break;
    default:
      currentStepSchema = basicInformations;
  }
  useEffect(() => {}, [stepNumber]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    // keep watch on all fields
    mode: "all",
  });

  const userId = localStorage.getItem("Useruid");
  const onSubmit = async (data) => {
    // next step until last step . if last step then submit form
    if (isLoading) return;

    const totalSteps = steps.length;

    const isLastStep = stepNumber === totalSteps - 1;

    if (isLastStep) {
      setIsLoading(true);

      try {
        await propertyServices.createProperty(
          {
            userId,
            centreImposition: data.centerOfImposition,
            description: data.description,
            state: 0,
            status: 0,
            price: {
              value: data.amount,
              currency,
            },
            adress: {
              position: {
                latitude: position.lat,
                longitude: position.lng,
              },
              city: data.ville,
              quater: data.quartier,
              street: data.street,
            },
            surface: data.surface,
            type: data.type,
            usage: data.usage,
            frequence,
            numberOfBuilding: data.numberOfBuilding,
            nombreEscalier: data.nombreEscalier,
            nombreEtage: data.nombreEtage,
            nombrePieces: data.nombrePieces,
            bathroomNumber: data.bathroomNumber,
            bedroomNumber: data.bedroomNumber,
            hasAssensor: hasAssensor,
            hasBalcony: hasBalcony,
            hasCave: hasCave,
            hasHealthCenterNearby: hasHealthCenterNearby,
            hasCollectiveHeating: hasCollectiveHeating,
            hasPath: hasPath,
            hasCollectiveHotWater: hasCollectiveHotWater,
            hasSchoolNearby: hasSchoolNearby,
            hasGreenSpace: hasGreenSpace,
            hasGarage: hasGarage,
            hasSecurity: hasSecurity,
            hasIntercom: hasIntercom,
            hasDiningRoom: hasDiningRoom,
            hasGrabageChute: hasGrabageChute,
          },
          files
        );
        navigate(-1);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setStepNumber(stepNumber + 1);
    }
  };

  const usages = [
    { value: "0", label: "Residentiel" },
    { value: "1", label: "Commercial" },
  ];
  const currencies = [
    { value: "XAF", label: "XAF" },
    { value: "USD", label: "USD" },
  ];

  const [residentialTypes, setResidentialTypes] = useState([]);
  const [commercialTypes, setCommercial] = useState([]);

  const fecthResidentialType = async () => {
    const types = await propertyServices.getResidentialTypes();
    setResidentialTypes(
      types.map((type) => ({ value: type.id, label: type.name }))
    );
  };

  const fecthCommercialType = async () => {
    const types = await propertyServices.getCommertialTypes();

    setCommercial(types.map((type) => ({ value: type.id, label: type.name })));
  };

  useEffect(() => {
    setType("");
    if (usage == 0) setTypes(residentialTypes);
    else setTypes(commercialTypes);
  }, [usage]);

  const handlePrev = () => {
    setStepNumber(stepNumber - 1);
  };

  const Marker = () => (
    <img
      src={imgMaker}
      alt="Marker"
      style={{
        width: "35px", // Ajustez la taille du marqueur selon vos besoins
        height: "50px",
        objectFit: "cover",
      }}
    />
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          className="h-[calc(100dvh-200px)]"
          title="Ajouter une nouvelle propriete"
          headerslot={
            <div
              className={`space-x-3 ${
                stepNumber > 0 ? "flex justify-between" : " text-right"
              }`}
            >
              <Button
                onClick={() => navigate(-1)}
                text="Annuler"
                className="btn-secondary mr-6"
              />

              {stepNumber !== 0 && (
                <Button
                  text="prev"
                  className="btn-outline-light"
                  onClick={handlePrev}
                />
              )}
              <Button
                text={stepNumber !== steps.length - 1 ? "Suivant" : "Terminer"}
                className="btn-dark"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          }
        >
          <div className="grid gap-5 grid-cols-12 divide-x">
            <div className="lg:col-span-3 col-span-12">
              <div className="flex z-[5] items-start relative flex-col lg:min-h-full md:min-h-[300px] min-h-[250px]">
                {steps.map((item, i) => (
                  <div className="relative z-[1] flex-1 last:flex-none" key={i}>
                    <div
                      className={`   ${
                        stepNumber >= i
                          ? "bg-slate-900 text-white ring-slate-900 dark:bg-slate-900 dark:ring-slate-700  dark:ring-offset-slate-500 ring-offset-2"
                          : "bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 text-opacity-70 dark:bg-slate-700 dark:ring-slate-700"
                      } 
            transition duration-150 icon-box md:h-12 md:w-12 h-8 w-8 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium
            `}
                    >
                      {stepNumber <= i ? (
                        <span> {i + 1}</span>
                      ) : (
                        <span className="text-3xl">
                          <Icon icon="bx:check-double" />
                        </span>
                      )}
                    </div>

                    <div
                      className={` ${
                        stepNumber >= i
                          ? "bg-slate-900 dark:bg-slate-900"
                          : "bg-[#E0EAFF] dark:bg-slate-600"
                      } absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px]`}
                    ></div>
                    <div
                      className={` ${
                        stepNumber >= i
                          ? " text-slate-900 dark:text-slate-300"
                          : "text-slate-500 dark:text-slate-300 dark:text-opacity-40"
                      } absolute top-0 ltr:left-full rtl:right-full ltr:pl-4 rtl:pr-4 text-base leading-6 md:mt-3 mt-1 transition duration-150 w-full`}
                    >
                      <span className="w-max block">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="conten-box lg:col-span-9 col-span-12 h-[calc(100dvh-350px)] overflow-y-auto pl-8">
              {stepNumber === 0 && (
                <div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-y-3 gap-x-5">
                    <div className="grid grid-cols-2 col-span-3 gap-y-3 gap-x-5">
                      <Select
                        label="Usage"
                        value={usage}
                        onChange={(e) => setUsage(e.target.value)}
                        placeholder="Selectionnez l'usage"
                        error={errors.usage}
                        register={register}
                        options={usages}
                        name="usage"
                      />
                      <Select
                        label="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Selectionnez le type"
                        error={errors.type}
                        register={register}
                        options={types}
                        name="type"
                      />
                      <InputGroup
                        type="text"
                        label="Montant"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        name="amount"
                        prepend={
                          <Select
                            className="border-none w-24 active:border-none focus:outline-none"
                            onChange={(e) => setCurrency(e.target.value)}
                            value={currency}
                            placeholder="Devise"
                            register={register}
                            options={currencies}
                            name="devise"
                          />
                        }
                        error={errors.amount}
                        placeholder="Entrez le montant"
                        register={register}
                      />
                      <Select
                        label="Frequence"
                        onChange={(e) => setFrequence(e.target.value)}
                        placeholder="Selectionnez la frequence"
                        error={errors.frequence}
                        register={register}
                        options={frequencies}
                        name="frequence"
                      />
                    </div>
                    <div className="col-span-3">
                      <Textarea
                        label="Description"
                        dvalue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Entrer la description de votre propriete"
                        name="description"
                        error={errors.description}
                        register={register}
                      />
                    </div>
                    <Textinput
                      label="Nombre de batiment"
                      value={numberOfBuilding}
                      onChange={(e) => setNumberOfBulding(e.target.value)}
                      type="number"
                      placeholder="Entrer le nombre de batiment"
                      name="numberOfBuilding"
                      error={errors.numberOfBuilding}
                      register={register}
                    />
                    <Textinput
                      label="Nombre d'etage"
                      value={nombreEtage}
                      onChange={(e) => setNumberOfFloor(e.target.value)}
                      type="number"
                      placeholder="Entrer le nombre d'etage"
                      name="nombreEtage"
                      error={errors.nombreEtage}
                      register={register}
                    />
                    <Textinput
                      label="Nombre de pieces"
                      value={nombrePieces}
                      onChange={(e) => setNumberOfRoom(e.target.value)}
                      type="number"
                      placeholder="Entrer le nombre de pieces"
                      name="nombrePieces"
                      error={errors.nombrePieces}
                      register={register}
                    />
                    <Textinput
                      label="Nombre d'escalier"
                      value={nombreEscalier}
                      onChange={(e) => setNumberOfStaircase(e.target.value)}
                      type="number"
                      placeholder="Entrer le nombre d'escalier"
                      name="nombreEscalier"
                      error={errors.nombreEscalier}
                      register={register}
                    />
                    <Textinput
                      label="Surface"
                      value={surface}
                      onChange={(e) => setSurface(e.target.value)}
                      type="number"
                      placeholder="Entrer la surface"
                      name="surface"
                      error={errors.surface}
                      hasicon
                      register={register}
                    />
                    <Textinput
                      label="Nombre de douche"
                      value={bathroomNumber}
                      onChange={(e) => setNumberOfBath(e.target.value)}
                      type="number"
                      placeholder="Entrer le nombre de douche"
                      name="bathroomNumber"
                      error={errors.bathroomNumber}
                      hasicon
                      register={register}
                    />
                    <Textinput
                      label="Nombre de chambre"
                      value={bedroomNumber}
                      onChange={(e) => setNumberOfBedRoom(e.target.value)}
                      type="number"
                      placeholder="Entrer le nombre de chambre"
                      name="bedroomNumber"
                      error={errors.bedroomNumber}
                      hasicon
                      register={register}
                    />
                    <Textinput
                      label="Centre d'imposition"
                      value={centerOfImposition}
                      onChange={(e) => setCenterOfImposition(e.target.value)}
                      type="text"
                      placeholder="Entrer le Centre d'imposition"
                      name="centerOfImposition"
                      error={errors.centerOfImposition}
                      register={register}
                      hasicon
                    />
                  </div>
                </div>
              )}
              {stepNumber === 1 && (
                <div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="lg:col-span-3 md:col-span-2 col-span-1">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                        Selectionnez les images de votre proprietes
                      </h4>
                    </div>
                    <div className="h-full lg:col-span-3 md:col-span-2 col-span-1">
                      <DropZone value={files} onChange={setFiles} />
                    </div>
                  </div>
                </div>
              )}
              {stepNumber === 2 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-5 pl-6">
                    <div className="">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                        Entrer les informations concenant l'emplacement de votre
                        propriete
                      </h4>
                    </div>
                    <Textinput
                      label="Ville"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      type="text"
                      placeholder="Entrer votre ville"
                      name="ville"
                      error={errors.ville}
                      register={register}
                    />
                    <Textinput
                      label="Quartier"
                      value={quartier}
                      onChange={(e) => setQuartier(e.target.value)}
                      type="text"
                      placeholder="Entrer votre quartier"
                      name="quartier"
                      error={errors.quartier}
                      register={register}
                    />
                    <Textinput
                      label="Adresse"
                      value={street}
                      onChange={(e) => setAdresse(e.target.value)}
                      type="text"
                      placeholder="Entrer votre adresse"
                      name="street"
                      error={errors.street}
                      register={register}
                    />
                    <label className="block capitalize">
                      Selectionner l'emplacement
                    </label>
                    <div
                      className=""
                      style={{ height: "400px", width: "100%" }}
                    >
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "AIzaSyBYNu1iWbxlkTCf87GlV2xYjkcbv5I0vzI",
                        }}
                        center={position}
                        defaultZoom={13}
                        onClick={handleMapClick}
                      >
                        <Marker
                          lat={position.lat}
                          lng={position.lng}
                          text="My Marker"
                        />
                      </GoogleMapReact>
                    </div>
                  </div>
                </div>
              )}
              {stepNumber === 3 && (
                <div className="pl-6">
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
                    <div className="lg:col-span-3 md:col-span-2 col-span-1">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6 mt-3">
                        Votre propriete dispose t-elle
                      </h4>
                    </div>
                    <Checkbox
                      label="Un Assenceur"
                      value={hasAssensor}
                      onChange={() => setAssensor(!hasAssensor)}
                      name="hasAssensor"
                      register={register}
                    />
                    <Checkbox
                      label="Un balcon"
                      value={hasBalcony}
                      onChange={() => setBalcony(!hasBalcony)}
                      name="hasBalcony"
                      register={register}
                    />
                    <Checkbox
                      label="Une hasCave"
                      value={hasCave}
                      onChange={() => setCave(!hasCave)}
                      name="hasCave"
                      register={register}
                    />
                    <Checkbox
                      label="Un ecole a proximite"
                      value={hasSchoolNearby}
                      onChange={() => setSchoolNearby(!hasSchoolNearby)}
                      name="hasSchoolNearby"
                      register={register}
                    />
                    <Checkbox
                      label="Un chauffage collectif"
                      value={hasCollectiveHeating}
                      onChange={() =>
                        setCollectiveHeating(!hasCollectiveHeating)
                      }
                      name="hasCollectiveHeating"
                      register={register}
                    />
                    <Checkbox
                      label="Une chemine"
                      value={hasPath}
                      onChange={() => setPath(!hasPath)}
                      name="hasPath"
                      register={register}
                    />
                    <Checkbox
                      label="Un Eau chaude collective"
                      value={hasCollectiveHotWater}
                      onChange={() =>
                        setCollectiveHotWater(!hasCollectiveHotWater)
                      }
                      name="hasCollectiveHotWater"
                      register={register}
                    />
                    <Checkbox
                      label="Centre de sante a proximite"
                      value={hasHealthCenterNearby}
                      onChange={() =>
                        setNearbyHealthCenter(!hasHealthCenterNearby)
                      }
                      name="hasHealthCenterNearby"
                      register={register}
                    />
                    <Checkbox
                      label="Un espace vert"
                      value={hasGreenSpace}
                      onChange={() => setGreenSpace(!hasGreenSpace)}
                      name="hasGreenSpace"
                      register={register}
                    />
                    <Checkbox
                      label="Un hasGarage"
                      value={hasGarage}
                      onChange={() => setGarage(!hasGarage)}
                      name="hasGarage"
                      register={register}
                    />
                    <Checkbox
                      label="Un service de gardiennage"
                      value={hasSecurity}
                      onChange={() => setSecurity(!hasSecurity)}
                      name="hasSecurity"
                      register={register}
                    />
                    <Checkbox
                      label="Un Interphone"
                      value={hasIntercom}
                      onChange={() => setIntercom(!hasIntercom)}
                      name="hasIntercom"
                      register={register}
                    />
                    <Checkbox
                      label="Une salle a manger"
                      value={hasDiningRoom}
                      onChange={() => setDiningRoom(!hasDiningRoom)}
                      name="hasDiningRoom"
                      register={register}
                    />
                    <Checkbox
                      label="Un vide ordure"
                      value={hasGrabageChute}
                      onChange={() => setGarbageChute(!hasGrabageChute)}
                      name="hasGrabageChute"
                      register={register}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default AddProperty;

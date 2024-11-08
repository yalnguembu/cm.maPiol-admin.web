import React, { useState, useEffect } from "react";
import Textinput from "@/ui/components/ui/Textinput";
import Textarea from "@/ui/components/ui/Textarea";
import Button from "@/ui/components/ui/Button";
import Card from "@/ui/components/ui/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "@/ui/components/ui/Select";
import DropZone from "@/ui/components/partials/DropZone";
import Checkbox from "@/ui/components/ui/Checkbox";
import GoogleMapReact from "google-map-react";
import imgMaker from "../../../assets/images/marker.png";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/ui/components/Loading";
import InputGroup from "@/ui/components/ui/InputGroup";
import { useDepedencies } from "@/utils/useDepedencies";

const globalSchema = yup.object().shape({
  name: yup.string().required("Ce champs est requis"),
  description: yup.string().required("Ce champs est requis"),
  numberOfBulding: yup.string().required("Ce champs est requis"),
  numberOfRoom: yup.string().required("Ce champs est requis"),
  numberOfFloor: yup.string().required("Ce champs est requis"),
  numberOfStaircase: yup.string().required("Ce champs est requis"),
  surface: yup.string().required("Ce champs est requis"),
  centerOfImposition: yup.string().required("Ce champs est requis"),
  ville: yup.string().required("Ce champs est requis"),
  quartier: yup.string().required("Ce champs est requis"),
  addresse: yup.string().required("Ce champs est requis"),
  usage: yup.string().required("Ce champs est requis"),
  type: yup.string().required("Ce champs est requis"),
  frequency: yup.string().required("Ce champs est requis"),
});

const frequencies = [
  { value: "Jours", label: "Jours" },
  { value: "Semaines", label: "Semaines" },
  { value: "Mois", label: "Mois" },
  { value: "Annee", label: "Annee" },
];

const EditProperty = () => {
  const { propertyServices } = useDepedencies();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // first step
  const [description, setDescription] = useState("");
  const [numberOfBulding, setNumberOfBulding] = useState("");
  const [numberOfRoom, setNumberOfRoom] = useState("");
  const [numberOfStaircase, setNumberOfStaircase] = useState("");
  const [numberOfFloor, setNumberOfFloor] = useState("");
  const [surface, setSurface] = useState("");
  const [centerOfImposition, setCenterOfImposition] = useState("");
  const [usage, setUsage] = useState(0);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [frequence, setFrequence] = useState("");

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

  //images step
  const [files, setFiles] = useState([]);

  //addresse step
  const [ville, setVille] = useState("");
  const [quartier, setQuartier] = useState("");
  const [addresse, setaddresse] = useState("");

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
  const [bedroomNumber, setNumberOfBedRoom] = useState("");
  const [bathroomNumber, setNumberOfBath] = useState("");

  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

  const [property, setProperty] = useState({});

  const [shouldDisplayOldImage, setshouldDisplayOldImage] = useState(
    !!property?.images?.length
  );

  const userId = localStorage.getItem("Useruid");

  const params = useParams();

  const fetchProperty = async () => {
    setIsLoading(true);
    const response = await propertyServices.getPropertyById(params.id);
    setProperty(response);
    setDescription(response.description);
    setNumberOfBulding(response.numberOfBuilding);
    setNumberOfRoom(response.nombrePieces);
    setNumberOfStaircase(response.nombreEscalier);
    setNumberOfFloor(response.nombreEtage);
    setSurface(response.surface);
    setCenterOfImposition(response.centreImposition);
    setVille(response.address.city);
    setQuartier(response.address.quater);
    setaddresse(response.address.street);
    setAssensor(response.hasAssensor);
    setBalcony(response.hasBalcony);
    setCave(response.hasCave);
    setSchoolNearby(response.hasHealthCenterNearby);
    setCollectiveHeating(response.hasCollectiveHeating);
    setPath(response.hasPath);
    setCollectiveHotWater(response.hasCollectiveHotWater);
    setNearbyHealthCenter(response.hasSchoolNearby);
    setGreenSpace(response.hasGreenSpace);
    setGarage(response.hasGarage);
    setSecurity(response.hasSecurity);
    setIntercom(response.hasIntercom);
    setDiningRoom(response.hasDiningRoom);
    setGarbageChute(response.hasGrabageChute);
    setPosition(response.address.position );
    setUsage(response.usage);
    setCurrency(response.price.devise);
    setFrequence(response.frequence);
    setAmount(response.price.value);
    setNumberOfBedRoom(response.bedroomNumber);
    setNumberOfBath(response.bathroomNumber);
    // setType([...residentialTypes
    //   ,...commercialTypes].find((propertyType) => ))

    // setFiles(response.images.map((file) => fileUrlToFile(file)));

    setIsLoading(false);
  };

  useEffect(() => {
    fecthResidentialType();
    fecthCommercialType();
    fetchProperty();
  }, []);

  useEffect(() => {
    setType("");
    if (usage == 0) setTypes(residentialTypes);
    else setTypes(commercialTypes);
  }, [usage]);

  const handleMapClick = ({ lat, lng }) => {
    setPosition({ lat, lng });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(globalSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isSaving || isLoading) return;

    setIsSaving(true);
    // const imageId = shouldDisplayOldImage
    //   ? property?.images?.length
    //   : (await saveImage(files)) ?? "";

    // if (!imageId) return;
    try {
      console.log(1);

      await propertyServices.createProperty(
        {
          userId,
          centreImposition: data.centerOfImposition,
          description: data.description,
          state: 1,
          status: 1,
          price: {
            value: data.amount,
            currency,
          },
          address: {
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
      // const fileIds = [];
      // const saveImages = async () => {
      //   files.forEach(async (file) => {
      //     fileIds.push(await saveImage(file));
      //   });
      //   return fileIds;
      // };
      // await saveImages().then((data) => {
      //   console.log(data);
      // });
      // await updateDocument("Proprietes", params.id, {
      //   addresse: data.addresse,
      //   type: data.type,
      //   centreImposition: data.centerOfImposition,
      //   description: data.description,
      //   hasAssensor: assensor,
      //   hasBalcony: balcony,
      //   hasCave: cave,
      //   hasSchoolNearby: nearbyHealthCenter,
      //   hasCollectiveHeating: collectiveHeating,
      //   hasPath: path,
      //   hasCollectiveHotWater: collectiveHotWater,
      //   hasHealthCenterNearby: schoolNearby,
      //   hasGreenSpace: greenSpace,
      //   hasGarage: garage,
      //   hasSecurity: security,
      //   hasIntercom: intercom,
      //   hasDiningRoom: diningRoom,
      //   hasGrabageChute: garbageChute,
      //   usage: data.usage,
      //   prix: data.amount,
      //   devise: data.devise,
      //   nombreBatiment: data.numberOfBulding,
      //   nombreEscalier: data.numberOfStaircase,
      //   nombreEtage: data.numberOfFloor,
      //   nombrePieces: data.numberOfRoom,
      //   position: {
      //     lat: position.lat,
      //     lng: position.lng,
      //   },
      //   surface: data.surface,
      //   userId,
      //   frequence: data.frequency,
      //   ville: data.ville,
      //   quartier: data.quartier,
      // });
      navigate(`/owner/properties/${params.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const Marker = () => (
    <img
      src={imgMaker}
      alt="Marker"
      style={{
        width: "35px",
        height: "50px",
        objectFit: "cover",
      }}
    />
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <header className="flex justify-between items-center py-4">
            <p className="card-title">Edit proprety</p>
            <div className="flex">
              <Button
                onClick={() => navigate(`/owner/properties/${params.id}`)}
                text="Annuler"
                className="btn-secondary mr-2"
              />
              <Button
                text="Enregistrer"
                className="btn-dark"
                type="submit"
                isLoading={isSaving}
              />
            </div>
          </header>
        </section>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="conten-box grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card title="Informations de base" className="col-span-2">
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
                    value={frequence}
                    onChange={(e) => setFrequence(e.target.value)}
                    placeholder="Selectionnez la frequence"
                    error={errors.frequency}
                    register={register}
                    options={frequencies}
                    name="frequency"
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
                  value={numberOfBulding}
                  onChange={(e) => setNumberOfBulding(e.target.value)}
                  type="number"
                  placeholder="Entrer le nombre de batiment"
                  name="numberOfBulding"
                  error={errors.numberOfBulding}
                  register={register}
                />
                <Textinput
                  label="Nombre d'etage"
                  value={numberOfFloor}
                  onChange={(e) => setNumberOfFloor(e.target.value)}
                  type="number"
                  placeholder="Entrer le nombre d'etage"
                  name="numberOfFloor"
                  error={errors.numberOfFloor}
                  register={register}
                />
                <Textinput
                  label="Nombre de pieces"
                  value={numberOfRoom}
                  onChange={(e) => setNumberOfRoom(e.target.value)}
                  type="number"
                  placeholder="Entrer le nombre de pieces"
                  name="numberOfRoom"
                  error={errors.numberOfRoom}
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
                  label="Nombre d'escalier"
                  value={numberOfStaircase}
                  onChange={(e) => setNumberOfStaircase(e.target.value)}
                  type="number"
                  placeholder="Entrer le nombre d'escalier"
                  name="numberOfStaircase"
                  error={errors.numberOfStaircase}
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
            </Card>
            <Card title="Autres" className="h-min">
              <div className="grid grid-cols-1 gap-2">
                <div className="md:col-span-2 col-span-1">
                  <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6 mt-3">
                    Votre propriete dispose t-elle
                  </h4>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <Checkbox
                    label="Un Assenceur"
                    value={hasAssensor}
                    onChange={() => setAssensor(!hasAssensor)}
                    name="assensor"
                    register={register}
                  />
                  <Checkbox
                    label="Un balcon"
                    value={hasBalcony}
                    onChange={() => setBalcony(!hasBalcony)}
                    name="balcony"
                    register={register}
                  />
                  <Checkbox
                    label="Une cave"
                    value={hasCave}
                    onChange={() => setCave(!hasCave)}
                    name="cave"
                    register={register}
                  />
                  <Checkbox
                    label="Un ecole a proximite"
                    value={hasSchoolNearby}
                    onChange={() => setSchoolNearby(!hasSchoolNearby)}
                    name="schoolNearby"
                    register={register}
                  />
                  <Checkbox
                    label="Un chauffage collectif"
                    value={hasCollectiveHeating}
                    onChange={() => setCollectiveHeating(!hasCollectiveHeating)}
                    name="collectiveHeating"
                    register={register}
                  />
                  <Checkbox
                    label="Une chemine"
                    value={hasPath}
                    onChange={() => setPath(!hasPath)}
                    name="path"
                    register={register}
                  />
                  <Checkbox
                    label="Un Eau chaude collective"
                    value={hasCollectiveHotWater}
                    onChange={() =>
                      setCollectiveHotWater(!hasCollectiveHotWater)
                    }
                    name="collectiveHotWater"
                    register={register}
                  />
                  <Checkbox
                    label="Centre de sante a proximite"
                    value={setNearbyHealthCenter}
                    onChange={() =>
                      setNearbyHealthCenter(!setNearbyHealthCenter)
                    }
                    name="nearbyHealthCenter"
                    register={register}
                  />
                  <Checkbox
                    label="Un espace vert"
                    value={hasGreenSpace}
                    onChange={() => setGreenSpace(!hasGreenSpace)}
                    name="greenSpace"
                    register={register}
                  />
                  <Checkbox
                    label="Un garage"
                    value={hasGarage}
                    onChange={() => setGarage(!hasGarage)}
                    name="garage"
                    register={register}
                  />
                  <Checkbox
                    label="Un service de gardiennage"
                    value={hasSecurity}
                    onChange={() => setSecurity(!hasSecurity)}
                    name="security"
                    register={register}
                  />
                  <Checkbox
                    label="Un Interphone"
                    value={hasIntercom}
                    onChange={() => setIntercom(!hasIntercom)}
                    name="intercom"
                    register={register}
                  />
                  <Checkbox
                    label="Une salle a manger"
                    value={hasDiningRoom}
                    onChange={() => setDiningRoom(!hasDiningRoom)}
                    name="diningRoom"
                    register={register}
                  />
                  <Checkbox
                    label="Un vide ordure"
                    value={hasGrabageChute}
                    onChange={() => setGarbageChute(!hasGrabageChute)}
                    name="garbageChute"
                    register={register}
                  />
                </div>
              </div>
            </Card>
            <Card title="Images" className="col-span-2">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                <div className="lg:col-span-3 md:col-span-2 col-span-1">
                  <h4 className="text-base text-slate-800 dark:text-slate-300 mb-6">
                    Selectionnez les images de votre proprietes
                  </h4>
                </div>
                <div className="h-full lg:col-span-3 md:col-span-2 col-span-1">
                  {shouldDisplayOldImage ? (
                    <div className="w-full h-48 relative">
                      {/* <img
            src={service.photoURL}
            className="w-full h-full object-cover object-center border rounded-md"
            alt=""
          />
          <Button
            className="absolute top-4 right-4 btn btn-outline-light text-gray-500 bg-gray-50 rounded-full p-2 hover:text-red-500"
            icon="heroicons:trash"
            onClick={() => setshouldDisplayOldImage(false)}
          /> */}
                    </div>
                  ) : (
                    <DropZone
                      name="picture"
                      label="Image"
                      register={register}
                      error={errors.picture}
                      multiple={false}
                      preview={true}
                      accept="image/png, image/gif, image/jpeg"
                      placeholder="Cliquez ici pour selectionner une image"
                      value={files}
                      onChange={(e) => setFiles(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </Card>
            <Card title="Address">
              <div className="grid grid-cols-1  gap-5">
                <div>
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
                    label="addresse"
                    value={addresse}
                    onChange={(e) => setaddresse(e.target.value)}
                    type="text"
                    placeholder="Entrer votre addresse"
                    name="addresse"
                    error={errors.address}
                    register={register}
                  />
                </div>
                <div>
                  <label className="block capitalize">
                    Selectionner l'emplacement
                  </label>
                  <div className="" style={{ height: "300px", width: "100%" }}>
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
            </Card>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditProperty;

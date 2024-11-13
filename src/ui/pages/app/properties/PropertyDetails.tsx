import React, { useEffect, useState, useContext } from "react";
import Icon from "@/ui/components/ui/Icon";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "@/ui/components/Loading";
import GoogleMapReact from "google-map-react";
import imgMaker from "@/ui/assets/images/marker.png";
import Button from "@/ui/components/ui/Button";
import Carousel from "@/ui/components/ui/Carousel";
import { SwiperSlide } from "swiper/react";
import Modal from "@/ui/components/ui/Modal";
import VideoPlayer from "@/ui/components/ui/VideoPlayer";
import Fileinput from "@/ui/components/ui/Fileinput";
import { PropertyView } from "@/primary/property/PropertyView";
import AddVisitModal from "@/ui/components/AddVisitModal";
import { useSelector } from "react-redux";
import {DependenciesContext, ServicesContext} from "@/utils/useDependencies";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { isTenant } = useSelector((state) => state.auth);
  const { propertyServices } =
    useContext<ServicesContext>(DependenciesContext);

  const [property, setProperty] = useState<PropertyView>({});
  const [isLoading, setIsLoading] = useState(false);
  const [residentialTypes, setResidentialTypes] = useState([]);
  const [commercialTypes, setCommercial] = useState([]);
  const [name, setName] = useState("");

  const userId = localStorage.getItem("Useruid");

  const params = useParams();

  const fetchProperty = async () => {
    const response = await propertyServices.getPropertyById(params.id);

    setProperty(response);
  };

  const fecthResidentialType = async () => {
    const types = await propertyServices.getResidentialTypes();
    setResidentialTypes(types);
  };

  const fecthCommercialType = async () => {
    const types = await propertyServices.getCommertialTypes();
    setCommercial(types);
  };

  const fetchPropertyTypes = async () => {
    const findType = (type) => type?.id == property?.type;

    if (property?.usage == 0) setName(residentialTypes?.find(findType));
    else setName(commercialTypes?.find(findType));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProperty();
    fecthResidentialType();
    fecthCommercialType();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchPropertyTypes();
    setIsLoading(false);
  }, [residentialTypes, commercialTypes]);

  const facilities = [
    {
      label: "Ascenseur",
      value: property?.hasAssensor,
      key: "existAscenseur",
      icon: "heroicons-outline:building-office",
    },
    {
      label: "Balcon",
      value: property?.hasBalcony,
      key: "existBalcon",
      icon: "heroicons-outline:home-modern",
    },
    {
      label: "Cave",
      value: property?.hasCave,
      key: "existCave",
      icon: "heroicons-outline:photo",
    },
    {
      label: "Centre de Sante a proximite",
      value: property?.hasHealthCenterNearby,
      key: "existCentreSanteAproximative",
      icon: "heroicons-outline:photo",
    },
    {
      label: "Chauffage Collectif",
      value: property?.hasCollectiveHeating,
      key: "existChauffageCollectif",
      icon: "heroicons-outline:photo",
    },
    {
      label: "Chemine",
      value: property?.hasPath,
      key: "existChemine",
      icon: "heroicons-outline:home-modern",
    },
    {
      label: "Eau Chaude Collective",
      value: property?.hasCollectiveHotWater,
      key: "existEauChaudeCollective",
      icon: "heroicons-outline:photo",
    },
    {
      label: "Ecole Aproximitite",
      value: property?.hasSchoolNearby,
      key: "existEcoleAproximative",
      icon: "heroicons-outline:academic-cap",
    },
    {
      label: "Espace Vert",
      value: property?.hasGreenSpace,
      key: "existEspaceVert",
      icon: "heroicons-outline:globe-europe-africa",
    },
    {
      label: "Garage",
      value: property?.hasGarage,
      key: "existGarage",
      icon: "heroicons-outline:truck",
    },
    {
      label: "Gardiennage",
      value: property?.hasSecurity,
      key: "existGardiennage",
      icon: "heroicons-outline:lock-closed",
    },
    {
      label: "Interphone",
      value: property?.hasIntercom,
      key: "existInterphone",
      icon: "heroicons-outline:device-phone-mobile",
    },
    {
      label: "SalleManger",
      value: property?.hasDiningRoom,
      key: "existSalleManger",
      icon: "heroicons-outline:photo",
    },
    ,
    {
      label: "Vide Ordure",
      value: property?.hasGrabageChute,
      key: "existVideOrdure",
      icon: "heroicons-outline:photo",
    },
  ];

  const Marker = () => (
    <img
      src={imgMaker}
      alt="Marker"
      style={{
        width: "26px",
        height: "35px",
        objectFit: "cover",
      }}
    />
  );
  const [shouldDisplayGallery, setShouldDisplayGallery] = useState(false);
  const [shouldDisplayVideo, setShouldDisplayVideo] = useState(false);
  const [shouldDisplayVisit, setShouldDisplayVisit] = useState(false);
  const [shouldDisplayVideoSettings, setShouldDisplayVideoSettings] =
    useState(false);

  const toggleShouldDisplayGallery = () =>
    setShouldDisplayGallery(!shouldDisplayGallery);

  const toggleDisplayVideo = () => setShouldDisplayVideo(!shouldDisplayVideo);
  const toggleDisplayVideoSettings = () =>
    setShouldDisplayVideoSettings(!shouldDisplayVideoSettings);

  const Gallery = () => {
    return (
      <Modal
        activeModal={shouldDisplayGallery}
        onClose={toggleShouldDisplayGallery}
        className="max-w-fit"
        title="Gallery"
        centered
      >
        <div className="w-[90dvw] h-[80dvh]">
          <div className="h-[70dvh] bg-gray-100">
            <Carousel
              className="main-caro"
              navigation={true}
              pagination={{
                enabled: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
            >
              {property?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="single-slide bg-no-repeat bg-contain bg-center w-full h-[70dvh]"
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Carousel>
          </div>
          <div className="flex gap-x-2 justify-center items-center overlfow-x-auto pt-4">
            {property?.images?.map((image, index) => (
              <img
                key={index}
                alt={`${property?.nomPropriete} images ${index}`}
                src={image}
                fetchPriority="low"
                loading="lazy"
                className=" h-16 w-16  object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      </Modal>
    );
  };

  const Video = () => {
    return (
      <Modal
        activeModal={shouldDisplayVideo}
        onClose={toggleDisplayVideo}
        className="max-w-fit"
        title="Visite virtuelle"
        centered
      >
        <div className="w-[90dvw] h-[80dvh] flex justify-center items-center">
          <VideoPlayer className="w-full h-full" url={property.video} />
        </div>
      </Modal>
    );
  };

  const VideoSettings = ({ videoURL, onClose, isActive, onUpdated }) => {
    const [video, setVideo] = useState(undefined);

    const saveImage = async () => {
      try {
        setIsLoading(true);
        if (!saveImage) return;
        await propertyServices.editVideo(params.id, video);
        onClose();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(true);
      }
    };

    return (
      <Modal
        activeModal={isActive}
        onClose={onClose}
        className="w-2/3"
        title="Configuration Visite virtuelle"
        centered
      >
        <div className="w-full flex flex-col gap-y-4">
          <div className="bg-gray-100">
            <Fileinput
              accept="videos/*"
              placeholder="Cliquer ici pour uploader la video"
              isVideo={true}
              onChange={(event) => setVideo(event?.target?.files[0])}
            />
          </div>

          <div className="border rounded w-full">
            <VideoPlayer
              className="w-full h-full"
              url={video ? URL.createObjectURL(video) : videoURL}
            />
          </div>
          <Button
            onClick={saveImage}
            className="btn btn-dark"
            text="Enregistrer"
          />
        </div>
      </Modal>
    );
  };


  const toggleDisplayVisit = () => setShouldDisplayVisit(!shouldDisplayVisit);

  const handelOnCreated = async () => {
    toggleDisplayVisit();
    await fetchProperty();
  };

  return (
    <div>
      <div className="flex space-x-4 pb-4 items-center">
        <Button
          icon="heroicons-outline:arrow-left"
          className="btn bg-white btn-border-ligth cursor-pointer rounded-full p-2"
          onClick={() => navigate(-1)}
        />
        <span>Informations sur la proprietes</span>
      </div>
      {isLoading || !property.id ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col">
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-7 gap-6">
              <div className="lg:col-span-4 relative">
                <div className="w-full h-200 md:h-[388px] my-auto object-cover rounded-md bg-gray-100">
                  <Carousel
                    className="main-caro"
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                  >
                    {property?.images?.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className="single-slide bg-no-repeat bg-cover bg-center rounded-md w-full h-200 md:h-[388px]"
                          style={{
                            backgroundImage: `url(${image})`,
                          }}
                        ></div>
                      </SwiperSlide>
                    ))}
                  </Carousel>
                </div>
                <Button
                  onClick={toggleShouldDisplayGallery}
                  icon="heroicons-outline:photo"
                  className="btn-light text-slate-800 absolute z-20 bottom-4 right-4 px-3 py-1.5 text-xs"
                  text="Voir toutes les images"
                />
              </div>
              <div className="lg:col-span-3 grid-cols-4 grid xl:grid-cols-2 gap-3">
                {property?.images?.length
                  ? property?.images
                      ?.slice(1, 5)
                      .map((image, index) => (
                        <img
                          key={index}
                          alt={`${property?.description} images ${index}`}
                          src={image}
                          fetchPriority="low"
                          loading="lazy"
                          className="w-full h-50 lg:h-[188px] object-cover rounded-md"
                        />
                      ))
                  : [0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className="w-full h-50 lg:h-[188px] object-cover rounded-md bg-gray-100"
                      />
                    ))}
              </div>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 gap-x-8 mt-6">
              <section className="col-span-2">
                <h1 className="text-xl md:text-2xl lg:text-4xl">
                  {name?.nom ?? ""}
                </h1>
                <div className="flex  items-center text-slate-400 dark:text-slate-400 text-sm mt-1">
                  <Icon icon="heroicons-outline:map-pin" width="16" />
                  <span className="ml-1">
                    {`${property?.address?.street ?? ""} ${
                      property?.address?.quater ?? ""
                    }, ${property?.address?.city ?? ""}`}
                  </span>
                </div>
                <p className="dark:text-slate-200 text-lg text-slate-900 font-semibold base max-w-[100%] truncate mt-3">
                  {`${property?.price?.value ?? ""} ${
                    property?.price?.currency ?? ""
                  } / ${property?.frequence ?? ""}`}
                </p>
                <div className="flex items-center mt-2 gap-6">
                  <div className="bg-white px-3 py-2 flex space-x-2 rounded-lg">
                    <Icon icon="heroicons-outline:building-office" width="15" />
                    <span className="text-xs">
                      {property?.numberOfBuilding ?? "1"} chambres
                    </span>
                  </div>
                  <div className="bg-white px-3 py-2 flex space-x-2 rounded-lg">
                    <Icon icon="heroicons-outline:building-office" width="15" />
                    <span className="text-xs">
                      {property?.numberOfBuilding ?? "1"} douches
                    </span>
                  </div>
                  <div className="bg-white px-3 py-2 flex space-x-2 rounded-lg">
                    <Icon
                      icon="heroicons-outline:arrows-pointing-out"
                      width="15"
                    />
                    <span className="text-xs">
                      {property?.surface ?? ""}m2 (surface)
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 font-medium pt-4">
                  {property?.description ?? ""}
                </p>
                <div className="py-4 space-y-4">
                  <div>
                    <h2 className="text-base mt-8">Facitities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                      {facilities
                        .filter((facility) => facility.value)
                        .map((facility) => (
                          <div className="flex items-center" key={facility.key}>
                            <Icon icon={facility.icon} />
                            <span className="text ml-2">{facility.label}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-base mt-8">Localisation</h2>
                    <div className="bg-slate-200 h-[350px] w-full border mt-6">
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "AIzaSyBYNu1iWbxlkTCf87GlV2xYjkcbv5I0vzI",
                        }}
                        center={property?.address?.position}
                        defaultZoom={13}
                      >
                        <Marker
                          lat={property?.address?.position?.latitude ?? 0}
                          lng={property?.address?.position?.longitude ?? 0}
                          text="My Marker"
                        />
                      </GoogleMapReact>
                    </div>
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-y-4">
                {isTenant && (
                  <Button
                    icon="heroicons-outline:calendar"
                    text="Programmer une visite"
                    onClick={toggleDisplayVisit}
                    className=" btn btn-dark "
                  />
                )}
                {property?.userId === userId ? (
                  <>
                    <Link
                      to={`/owner/properties/${params.id}/edit`}
                      className="bg-slate-900 text-white w-full flex space-x-3 rounded justify-center items-center px-6 py-3"
                    >
                      <Icon icon="heroicons-outline:pencil-square" />
                      <span>Edit</span>
                    </Link>
                    <Button
                      onClick={toggleDisplayVideoSettings}
                      icon="heroicons-outline:cog-6-tooth"
                      text="Visite virtuele"
                      className="border border-[#a6837b] text-[#a6837b] w-full flex space-x-3 rounded justify-center items-center px-6 py-3"
                    />
                  </>
                ) : (
                  !!property?.video && (
                    <Button
                      onClick={toggleDisplayVideo}
                      icon="heroicons-outline:eye"
                      text="Effectuer une visite virtuele"
                      className="bg-[#a6837b] text-white w-full flex space-x-3 rounded justify-center items-center px-6 py-3"
                    />
                  )
                )}
                <div className="border rounded-lg p-4 xl:p-6 2xl:p-8 mt-6">
                  <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h3 className="text-base">Contrats</h3>
                    {property.userId === userId && (
                      <Link
                        to={`/owner/contracts/add/?property=${params.id}`}
                        className="btn-ligth  border-dashed border-slate-900 flex space-x-3 rounded justify-center items-center px-3 py-1"
                      >
                        <Icon icon="heroicons-outline:plus" />
                        <span>Nouveau</span>
                      </Link>
                    )}
                  </div>

                  <p className="text-gray-300">Aucun contrats pour le moment</p>
                </div>
              </section>
            </section>
          </div>
          <Gallery />
          <Video />
          <VideoSettings
            videoURL={property.video}
            isActive={shouldDisplayVideoSettings}
            onClose={toggleDisplayVideoSettings}
            onUpdated={() => {
              toggleDisplayVideoSettings();
              fetchProperty();
            }}
          />
          <AddVisitModal
            isActive={shouldDisplayVisit}
            onClose={toggleDisplayVisit}
            onCreated={handelOnCreated}
            ownerId={property.userId}
            propertyId={property.id}
            tenantId={userId}
          />
        </>
      )}
    </div>
  );
};

export default PropertyDetails;

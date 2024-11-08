import React, { useContext, useEffect, useState } from "react";
import Icon from "@/ui/components/ui/Icon";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/ui/components/Loading";
import Carousel from "@/ui/components/ui/Carousel";
import { SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { PropertyView } from "@/primary/property/PropertyView";
import { State } from "@/ ui/store/rootReducer";
import { DependeciesContext } from "@/utils/useDepedencies";

const PropertyGridList = () => {
  const navigate = useNavigate();
  const { isOwner } = useSelector((state: State) => state.auth);
  const { propertyServices } =
    useContext(DependeciesContext);

  const [properties, setProperties] = useState<PropertyView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [residentialTypes, setResidentialTypes] = useState([]);
  const [commercialTypes, setCommercial] = useState([]);


  const userId = localStorage.getItem("Useruid");

  const fetchMyProperties = async () => {
    setIsLoading(true);
    const response = await propertyServices.getMines(userId);
    setProperties(response);
    setIsLoading(false);
  };

  const fetchAllProperties = async () => {
    setIsLoading(true);
    const response = await propertyServices.getAllProperties();
    setProperties(response);
    setIsLoading(false);
  };

  const fecthResidentialType = async () => {
    const types = await propertyServices.getResidentialTypes();
    setResidentialTypes(types);
  };

  const fecthCommercialType = async () => {
    const types = await propertyServices.getCommertialTypes();
    setCommercial(types);
  };

  const Images = ({ images }: { images: string[] }) => {
    return (
      <div>
        <Carousel
          pagination={true}
          navigation={true}
          className="main-caro"
          autoplay={false}
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="single-slide bg-no-repeat bg-cover bg-center rounded-md w-full h-60"
                style={{
                  backgroundImage: `url(${image})`,
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    );
  };

  type PropertyProps = { property: PropertyView };

  const PropertyGridItem = ({ property }: PropertyProps) => {
    const [name, setName] = useState({ name: "" });
    const findType = (type) => type.id == property.type;
    useEffect(() => {
      if (property?.usage == 0) setName(residentialTypes?.find(findType));
      else setName(commercialTypes?.find(findType));
    }, []);
    return (
      <div
        onClick={() =>
          navigate(`${isOwner ? "/owner" : ""}/properties/${property.id}`)
        }
        className="card rounded-md bg-white dark:bg-slate-800 cursor-pointer"
      >
        <Images images={property.images} />
        <div className="py-6 px-4">
          <p className="dark:text-slate-200 text-slate-900 font-semibold text-xl max-w-[100%] truncate">
            {name?.name}
          </p>
          <div className="flex items-center text-slate-400 dark:text-slate-400 text-sm pt-2">
            <Icon icon="heroicons-outline:map-pin" width="18" />
            <span className="ml-1">
              {`${property?.address?.street} ${property?.address?.quater}, ${property?.address?.city}`}
            </span>
          </div>
          <p className="dark:text-slate-200 text-slate-900 font-semibold base max-w-[100%] truncate mt-3">
            {`${property?.price.value} ${property?.price.currency} / ${property?.frequence}`}
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (isOwner) fetchMyProperties();
    else fetchAllProperties();

    fecthResidentialType();
    fecthCommercialType();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center pb-12 pt-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          {isOwner && "Mes "}Propietes
        </h1>

        {isOwner && (
          <Link
            to="/owner/properties/add"
            className="btn btn-dark  text-center"
          >
            Nouvelle propriete
          </Link>
        )}
      </div>
      {isLoading ? (
        <Loading />
      ) : properties.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyGridItem key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <p>Aucune proprietes pour le moment</p>
        </div>
      )}
    </div>
  );
};

export default PropertyGridList;

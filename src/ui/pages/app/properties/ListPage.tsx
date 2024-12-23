import React, {useEffect, useState} from "react";
import Icon from "@/ui/components/ui/Icon";
import {Link, useNavigate} from "react-router-dom";
import Loading from "@/ui/components/Loading";
import Carousel from "@/ui/components/ui/Carousel";
import {SwiperSlide} from "swiper/react";
import {useSelector} from "react-redux";
import {PropertyView} from "@/primary/property/PropertyView";
import {State} from "@/ ui/store/rootReducer";
import {useProperties} from "@/ui/hooks/useProperties";

const PropertyGridList = () => {
    const navigate = useNavigate();
    const {isOwner} = useSelector((state: State) => state.auth);

    const [activeTab, setActiveTab] = useState(0);

    const {
      isLoading,
      properties,
      residentialTypes,
      commercialTypes,
      fetchMyProperties,
      fetchAllProperties,
      fetchResidentialType,
      fetchCommercialType,
    } = useProperties();

    const userId = localStorage.getItem("Useruid");

    const Images = ({images}: { images: string[] }) => {
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

    const PropertyGridItem = ({property}: PropertyProps) => {
      const [name, setName] = useState({name: ""});
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
          <Images images={property.images}/>
          <div className="py-6 px-4">
            <p className="dark:text-slate-200 text-slate-900 font-semibold text-xl max-w-[100%] truncate">
              {name?.name}
            </p>
            <div className="flex items-center text-slate-400 dark:text-slate-400 text-sm pt-2">
              <Icon icon="heroicons-outline:map-pin" width="18"/>
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
      if (isOwner) fetchMyProperties(userId);
      else fetchAllProperties();

      fetchResidentialType();
      fetchCommercialType();
    }, []);

    // useEffect(() => {
    //   fetchUsersByType();
    // }, [activeTab]);

    return (
      <div>
        <div className="flex justify-between items-center pb-12 pt-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            {isOwner && "Mes "}Proprietes
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
          <Loading/>
        ) : properties.length ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.map((property) => (
                <PropertyGridItem key={property.id} property={property}/>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-screen w-full items-center justify-center">
            <p>Aucune proprietes pour le moment</p>
          </div>
        )}
      </div>
    )
      ;
  }
;

export default PropertyGridList;
//
// useEffect(() => {
//   fetchUsersByType();
// }, [activeTab]);
//
// useEffect(() => {
//   setActiveUser(users.find((user) => user.id === userId));
// }, [userId]);
//
// const [activeTab, setActiveTab] = useState(0);
//
// useEffect(() => {
//   fetchUsersByType();
// }, [activeTab]);
//
// const handelActivate = async () => {
//   setActionLoading(true);
//   try {
//     await updateDocument("Users", activeUser?.id, {
//       isActivated: true,
//     });
//     setShouldActivate(false);
//     await fetchUsersByType();
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setActionLoading(false);
//   }
// };
//
// <div className="w-full border-b border-b-gray-100">
//   <div className="flex items-center gap-x-2 py-4 mt-2">
//     <Button
//       onClick={() => setActiveTab(0)}
//       className={`btn rounded-full py-1.5 text-center px-6 ${
//         activeTab === 0
//           ? "btn-dark bg-primary-500"
//           : "btn-ligth bg-primary-100 text-black-500"
//       }`}
//       text="Prestataires"
//     />
//     <Button
//       onClick={() => setActiveTab(1)}
//       className={`btn rounded-full py-1.5 text-center px-6 ${
//         activeTab === 1
//           ? "btn-dark bg-primary-500"
//           : "btn-ligth bg-primary-100 text-black-500"
//       }`}
//       text="Clients"
//     />
//   </div>
// </div>

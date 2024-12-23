import React, {useEffect, useState} from "react";
import {SwiperSlide} from "swiper/react";
import {PropertyView} from "@/primary/property/PropertyView";
import {useNavigate} from "react-router-dom";
import Icon from "@/ui/components/ui/Icon";

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

type PropertyProps = { property: PropertyView, isOwner: boolean, name: string };

export const PropertyGridItem = (
  {
    property,
    isOwner,
    name
  }: PropertyProps) => {
  // const [name, setName] = useState({name: ""});
  const navigate = useNavigate();

  useEffect(() => {
    // if (property?.usage == 0) setName(residentialTypes?.find(findType));
    // else setName(commercialTypes?.find(findType));
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
          {name}
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
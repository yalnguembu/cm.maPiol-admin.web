import {useContext, useState} from "react";
import {DependenciesContext, ServicesContext} from "@/utils/useDependencies";
import {PropertyView} from "@/primary/property/PropertyView";

export const useProperties = () => {
  const {propertyServices} =
    useContext<ServicesContext>(DependenciesContext);

  const [properties, setProperties] = useState<PropertyView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [residentialTypes, setResidentialTypes] = useState([]);
  const [commercialTypes, setCommercial] = useState([]);

  const fetchMyProperties = async (userId: string) => {
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

  const fetchResidentialType = async () => {
    const types = await propertyServices.getResidentialTypes();
    setResidentialTypes(types);
  };

  const fetchCommercialType = async () => {
    const types = await propertyServices.getCommertialTypes();
    setCommercial(types);
  };

  return {
    isLoading,
    properties,
    residentialTypes,
    commercialTypes,
    fetchMyProperties,
    fetchAllProperties,
    fetchResidentialType,
    fetchCommercialType,
  }
}
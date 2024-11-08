import React, {useContext, useEffect, useState} from "react";
import Icon from "@/ui/components/ui/Icon";
import {Link, useNavigate} from "react-router-dom";
import Loading from "@/ui/components/Loading";
import Tooltip from "@/ui/components/ui/Tooltip";
import {useSelector} from "react-redux";
import {ContractView} from "@/primary/contract/ContractView";
import type {UserView} from "@/primary/user/UserView";
import {DependeciesContext} from "@/utils/useDepedencies";
import {PropertyType} from "@/domains/PropertyType";
import {dateToString} from "@/utils/date";
import {ContractStatusFilter} from "@/domains/contract/enum";

type ContractProperties = {
  status: ContractStatusFilter
}
const ContractGridList = ({status}: ContractProperties) => {
  const {contractServices, userServices, propertyServices} =
    useContext(DependeciesContext);
  const navigate = useNavigate();
  const {isAdmin, isTenant, isOwner} = useSelector((state) => state.auth);
  const [contracts, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem("Useruid");

  type ProfileProps = {
    tenantId: string;
  };

  const Profile = ({tenantId}: ProfileProps) => {
    const [user, setUser] = useState<UserView>({});

    const fetchUser = async () => {
      const response: UserView =
        (await userServices?.getUserByUUID(tenantId ?? "")) ?? {};

      setUser(response);
    };

    useEffect(() => {
      fetchUser();
    }, []);

    return (
      <div className="border-t pt-4 pb-2">
        <Tooltip
          // eslint-disable-next-line react/no-children-prop
          children={
            <div className="flex items-center group w-min rounded-lg transition">
              <div className="w-10 h-10 rounded-full bg-gray-400">
                <img src="" alt=""/>
              </div>
              <div className="ml-2 mt-1">
                <span
                  className=" block text-lg p-0 leading-4 font-medium group-hover:text-blue-600 group-hover:underline text-slate-900 w-full truncate">
                  {user?.fullName}
                </span>
                <div className="flex items-center text-slate-400 dark:text-slate-400 text-sm mt-1">
                  <Icon icon="heroicons-outline:at-symbol" width="14"/>
                  <span className="ml-1">{user?.email}</span>
                </div>
              </div>
            </div>
          }
          placement="top-start"
          className="btn btn-outline-dark"
          arrow
          allowHTML
          interactive
          animation="shift-away"
          theme="custom-light"
          maxWidth="320px"
          content={
            <div className="p-4 w-60 flex flex-col justify-center items-center text-center">
              <div className="w-[5rem] h-[5rem] block bg-black-500 rounded-full border overflow-hidden">
                <img
                  className="w-25 h-25 block bg-black-500 rounded-full border object-center object-cover"
                  src={user?.firstname}
                  alt={`une photo de ${user?.fullName}`}
                />
              </div>
              <span className="block text-xl mb-0 pb-0 font-semibold text-slate-900 mt-4">
                {user?.fullName}
              </span>
              <div className="flex items-center text-slate-400 dark:text-slate-400 text-sm mt-2">
                <Icon icon="heroicons-outline:at-symbol" width="14"/>
                <span className="ml-1">{user?.email}</span>
              </div>
              <span
                className="text-xs block p-0 leading-4 mt-4 font-medium group-hover:text-blue-600 group-hover:underline text-slate-900 w-full truncate">
                {/* membre depuis 2012 */}
              </span>
            </div>
          }
        />
      </div>
    );
  };

  type ContractGridItemProps = {
    contract: ContractView;
  };

  const ContractGridItem = ({contract}: ContractGridItemProps) => {
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const frequencies = ["Jours", "Semaines", "Mois", "Annee"];

    const [residentialTypes, setResidentialTypes] = useState([]);
    const [commercialTypes, setCommercial] = useState([]);
    const [propertyType, setPropertyType] = useState<PropertyType>({});

    const fetchProperty = async () => {
      const response = await propertyServices.getPropertyById(
        contract.propertyId
      );
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

      if (property?.usage == 0)
        setPropertyType(residentialTypes?.find(findType));
      else setPropertyType(commercialTypes?.find(findType));
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

    return (
      <div
        onClick={() => navigate(`${isAdmin ? '/admin/contracts' : isOwner ? '/owner/contracts' : '/contracts'}/${contract?.id}`)}
        className="card rounded-md bg-white dark:bg-slate-800 hover:shadow-xl cursor-pointer p-4 px-6 flex flex-col gap-6 -y"
      >
        <div className="pt-3 flex items-center">
          <div className="w-12 h-12 bg-gray-400">
            <img src={property?.images?.at(0)} alt={propertyType?.name}/>
          </div>
          {isLoading ? (
            <Loading/>
          ) : (
            <div className="ml-2 mt-1">
              <Link
                to={`/owner/propreties/${contract?.propertyId}`}
                className=" hover:text-blue-600 font-medium hover:underline block text-lg p-0 leading-4 text-slate-900 w-full truncate"
              >
                {propertyType?.name ?? ""}
              </Link>
              <div className="flex items-center text-slate-400 dark:text-slate-400 text-sm pt-2">
                <Icon icon="heroicons-outline:map-pin" width="18"/>
                <span className="ml-1">
                  {property?.address?.fulladdress ?? ""}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="pt-3">
          <span className="ml-1 block text-xl font-bold text-slate-900 w-full truncate">
            {contract?.amountPaid?.value} {contract.amountPaid?.currency} /{" "}
            {contract.amountByAmount?.value} {contract.amountByAmount?.currency}
            ({frequencies[contract?.frequency]})
          </span>
          <div className="flex items-center text-slate-400 dark:text-slate-400 text-sm pt-2">
            <Icon icon="heroicons-outline:calendar" width="18"/>
            <span className="ml-1 font-semibold">
              {dateToString(contract.startDate)} -{" "}
              {dateToString(contract.endDate)}
            </span>
          </div>
        </div>
        {!isTenant && <Profile tenantId={contract.tenantId}/>}
      </div>
    );
  };

  const fetchMyContracts = async () => {
    setIsLoading(true);
    const response = await contractServices.getMines(
      userId,
      isOwner ? "owner" : isTenant ? "tenant" : "",
      status
    );
    setProperties(response);
    setIsLoading(false);
  };

  const fetchAllContracts = async () => {
    setIsLoading(true);
    const response = await contractServices.getAll(status);
    setProperties(response);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchAllContracts();
    else fetchMyContracts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center pb-12 pt-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          {isOwner ? "Mes " : ""} Contrats
        </h1>
        {isOwner ? (
          <Link
            to="/owner/contracts/add"
            className="btn btn-dark text-center flex items-center"
          >
            <Icon
              icon="heroicons-outline:plus"
              className="w-4 h-4 mr-2 stroke-white"
            />
            <span>Nouveau contrat</span>
          </Link>
        ) : (
          <></>
        )}
      </div>
      {isLoading ? (
        <Loading/>
      ) : contracts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contracts.map((contract) => (
            <ContractGridItem key={contract.id} contract={contract}/>
          ))}
        </div>
      ) : (
        <div className="flex items-center jusdtify-center">
          <p>Aucun contrats pour le moment</p>
        </div>
      )}
    </div>
  );
};

export default ContractGridList;

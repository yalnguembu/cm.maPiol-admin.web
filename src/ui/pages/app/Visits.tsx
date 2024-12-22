import React, {useContext, useEffect, useState} from "react";
import Icon from "@/ui/components/ui/Icon";
import {Link, useNavigate} from "react-router-dom";
import Loading from "@/ui/components/Loading";
import Tooltip from "@/ui/components/ui/Tooltip";
import {useSelector} from "react-redux";
import {NotificationView} from "@/primary/notification/NotificationView";
import type {UserView} from "@/primary/user/UserView";
import {DependenciesContext, ServicesContext} from "@/utils/useDependencies";
import {PropertyType} from "@/domains/PropertyType";
import Button from "@/ui/components/ui/Button";
import {VisitView} from "@/primary/visit/VisitView";
import {VisitStatus} from "@/domains/visit/VisitDate";

const VisitGridList = () => {
  const {visitServices, userServices, propertyServices, notificationServices} =
    useContext<ServicesContext>(DependenciesContext);
  const navigate = useNavigate();
  const {isAdmin, isTenant} = useSelector((state) => state.auth);
  const [visits, setVisits] = useState([]);
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
              <div className="w-10 h-10 rounded bg-gray-100">
                <img className="w-10 h-10" src={user?.picture} alt=""/>
              </div>
              <div className="ml-2 mt-1">
                <span
                  className=" block text-lg p-0 leading-4 font-medium group-hover:text-blue-600 group-hover:underline text-slate-900 w-full truncate">
                  {user?.fullName}
                </span>
                <div className="flex items-center text-slate-400 dark:text-slate-400 text-sm mt-1">
                  <Icon icon="heroicons-outline:envelope" width="14"/>
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
                <Icon icon="heroicons-outline:envelope" width="14"/>
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

  type VisitGridItemProps = {
    visit: VisitView;
  };

  const VisitGridItem = ({visit}: VisitGridItemProps) => {
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [residentialTypes, setResidentialTypes] = useState([]);
    const [commercialTypes, setCommercial] = useState([]);
    const [propertyType, setPropertyType] = useState<PropertyType>({});

    const fetchProperty = async () => {
      const response = await propertyServices.getPropertyById(visit.propertyId);
      setProperty(response);
    };

    const fetchResidentialType = async () => {
      const types = await propertyServices.getResidentialTypes();
      setResidentialTypes(types);
    };

    const fetchCommercialType = async () => {
      const types = await propertyServices.getCommertialTypes();
      setCommercial(types);
    };

    const fetchPropertyTypes = async () => {
      const findType = (type) => type?.id == property?.type;

      if (property?.usage == 0)
        setPropertyType(residentialTypes?.find(findType));
      else setPropertyType(commercialTypes?.find(findType));
    };

    const cancelVisit = async (id: string, index: number) => {
      await visitServices.cancel(visit.id, index);
      await notificationServices.create({
        createdAt: new Date().toISOString(),
        deletedAt: "",
        readAt: "",
        updatedAt: "",
        notifiableId: visit.id,
        notifiableType: "AgendaVisites",
        receiver: visit.tenantId,
        status: 0,
        type: 0,
        data: {
          details: "Malheuresement le proprietaires n'est pas disponible pour une visite ce jour.",
          title: "Visites refuser",
          icon: "visit"
        },
      });
    };
    const acceptVisit = async (id: string, index: number) => {
      await visitServices.accept(visit.id, index);
      await notificationServices.create({
        createdAt: new Date().toISOString(),
        deletedAt: "",
        readAt: "",
        updatedAt: "",
        notifiableId: visit.id,
        notifiableType: "AgendaVisites",
        receiver: visit.tenantId,
        status: 0,
        type: 0,
        data: {
          details: "Une visite entre le proprietaire et vous a ete cale!",
          title: "Visites Accepter",
          icon: "visit"
        },
      });
    };

    useEffect(() => {
      setIsLoading(true);
      fetchProperty();
      fetchResidentialType();
      fetchCommercialType();
      setIsLoading(false);
    }, []);

    useEffect(() => {
      setIsLoading(true);
      fetchPropertyTypes();
      setIsLoading(false);
    }, [residentialTypes, commercialTypes]);

    const statusTexts = ["En attente", "Refuser", "Accepter"];

    return (
      <div
        onClick={() => navigate(`/owner/visits/${visit?.id}`)}
        className="card rounded-md bg-white dark:bg-slate-800 hover:shadow-xl cursor-pointer p-4 px-6 flex flex-col justify-between gap-y-2"
      >
        <div className="pt-3 flex items-center">
          <div className="w-12 h-12 rounded bg-gray-100">
            <img
              className="w-12 h-12 rounded"
              src={property?.images?.at(0)}
              alt=""
            />
          </div>
          {isLoading ? (
            <Loading/>
          ) : (
            <div className="ml-2 mt-1">
              <Link
                to={`/owner/propreties/${visit?.propertyId}`}
                className=" hover:text-blue-600 font-medium hover:underline block text-lg p-0 leading-4 text-slate-900 w-full truncate"
              >
                {propertyType?.name ?? ""}
              </Link>
              <div className="flex items-center text-slate-400 dark:text-slate-400 text-sm pt-2">
                <Icon icon="heroicons-outline:map-pin" width="18"/>
                <span className="ml-1">
                  {`${property?.addresse ?? ""} ${property?.quartier ?? ""}, ${
                    property?.ville ?? ""
                  }`}
                </span>
              </div>
            </div>
          )}
        </div>
        <div
          className={`rounded-full px-3 my-1 py-1 w-fit text-nowrap text-sm font-semibold ${
            visit.status == 0
              ? "text-orange-500 bg-orange-200"
              : visit.status == 1
                ? "text-red-600 bg-red-200"
                : visit.status == 2
                  ? "text-green-600 bg-green-200"
                  : ""
          }`}
        >

          {statusTexts[visit.status]}
        </div>
        <div className=" mt-2">

        {
          visit?.dates?.map((dateItem, index) =>
            <div key={index} className="flex justify-between items-center py-1">
              <div className="flex items-center space-x-4 text-gray-500 font-medium">
                <div className="flex items-center space-x-1">
                  <Icon icon="heroicons-outline:calendar" width="18"/>
                  <span>{dateItem?.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon icon="heroicons-outline:clock" width="18"/>
                  <span>{dateItem?.hour?.substring(0, 5)}</span>
                </div>
              </div>
              {dateItem.status === "PENDING" ? (
                <div className="flex gap-x-2">
                  <Button
                    icon="heroicons-outline:x-mark"
                    onClick={() => cancelVisit(visit.id, index)}
                    className="hover:btn-danger btn text-gray-500 rounded-full px-1 py-1 w-min"
                  />
                  <Button
                    icon="heroicons-outline:check"
                    onClick={() => acceptVisit(visit.id, index)}
                    className="hover:btn-primary btn text-gray-500 rounded-full px-1 py-1 w-min"
                  />
                </div>
              ) : dateItem.status !== 0 &&
                <div className={`rounded-full px-3 my-1 py-1 w-fit text-nowrap text-sm font-semibold ${
                  visit.status == 1
                    ? "text-red-600 bg-red-200"
                    : visit.status == 2
                    && "text-green-600 bg-green-200"}`}
                >{dateItem.status}</div>
              }
            </div>
          )
        }
        </div>

        {!isTenant && <Profile tenantId={visit.tenantId}/>}
        <div>
          <div className="text-sm block max-h-16 overflow-hidden">
            {visit?.details}
          </div>
        </div>

      </div>
    );
  };

  const fetchMyVisits = async () => {
    setIsLoading(true);
    const response = await visitServices.getMines(userId, isTenant ? "tenant" : "owner");
    setVisits(response);
    setIsLoading(false);
  };

  const fetchAllVisits = async () => {
    setIsLoading(true);
    const response = await visitServices.getAll();
    setVisits(response);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchAllVisits();
    else fetchMyVisits();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center pb-12 pt-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          {isAdmin ? "" : "Mes "} Visites
        </h1>
      </div>
      {isLoading ? (
        <Loading/>
      ) : visits.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {visits.map((visit) => (
            <VisitGridItem key={visit.id} visit={visit}/>
          ))}
        </div>
      ) : (
        <div className="flex items-center jusdtify-center">
          <p>Aucune visites pour le moment</p>
        </div>
      )}
    </div>
  );
};

export default VisitGridList;

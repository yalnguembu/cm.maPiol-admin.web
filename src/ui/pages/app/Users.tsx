import React, { useEffect, useState } from "react";
import Loading from "@/ui/components/Loading";
import Card from "@/ui/components/ui/Card";
import Button from "@/ui/components/ui/Button";
import { useDepedencies } from "@/utils/useDepedencies";
import { UserView } from "@/primary/UserView";
import { useSelector } from "react-redux";
import { State } from "@/ui/store/rootReducer";
import AddUserModal from "@/ui/components/users/AddUserModal";
import EditUserModal from "@/ui/components/users/EditUserModal";
import UserDetailsModal from "@/ui/components/users/UserDetailsModal";

const columns = [
  {
    label: "Nom",
  },
  {
    label: "Email",
  },
  {
    label: "Telephone",
  },
  {
    label: "N_ CNI",
  },
  {
    label: "Action",
  },
];

enum UserType {
  "VISITOR" = "Visiteurs",
  "TENANT" = "Locataires",
  "OWNER" = "Propriétaires",
  "ADMIN" = "Administrateurs",
}
type UserListProps = {
  userType: "ADMIN" | "OWNER" | "TENANT" | "VISITOR";
};

const UsersList = ({ userType }: UserListProps) => {
  const { userServices } = useDepedencies();

  const { isAdmin } = useSelector((state: State) => state.auth);

  const [users, setUsers] = useState<UserView[]>([]);
  const [activeUser, setActiveUser] = useState<UserView | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUsersByType = async () => {
    setIsLoading(true);

    const response =
      userType === "OWNER"
        ? await userServices.getAllOwners()
        : userType === "TENANT"
        ? await userServices.getAllTenants()
        : await userServices.getAllVisitors();

    setUsers(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsersByType();
  }, []);

  useEffect(() => {
    const user = users.find((user) => user.id == userId);
    setActiveUser(user);
  }, [userId]);

  const [shouldEdit, setShouldEdit] = useState<boolean>(false);
  const [shouldAdd, setShouldAdd] = useState<boolean>(false);
  const [shouldDisplayDetails, setShouldDisplayDetails] =
    useState<boolean>(false);

  const toggleShouldAdd = () => setShouldAdd(!shouldAdd);
  const toggleShouldEdit = () => setShouldEdit(!shouldEdit);
  const toggleShouldDisplayDetails = () =>
    setShouldDisplayDetails(!shouldDisplayDetails);

  return (
    <div>
      <h1 className="text-xl lg:text-2xl xl:text-3xl my-4">Utilisateurs</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <Card
          title={`${UserType[userType]}`}
          className="min-h-[70dvh]"
          headerslot={
            isAdmin ? (
              <div className="py-6 space-x-8">
                <Button
                  icon="heroicons-outline:refresh"
                  onClick={fetchUsersByType}
                  className="btn btn-light rounded-full p-2"
                />
                <Button
                  onClick={toggleShouldAdd}
                  className="btn btn-dark text-center"
                  text="Nouvel ustilisateur"
                  icon="heroicons-outline:plus"
                ></Button>
              </div>
            ) : (
              <></>
            )
          }
          noborder
        >
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-slate-800 border-t table-fixed dark:divide-slate-100">
                  <thead className="bg-slate-800 dark:bg-slate-100">
                    <tr>
                      {columns.map((column, i) => (
                        <th
                          key={i}
                          scope="col"
                          className=" table-th  text-white "
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {users.length ? (
                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                      {users.map((row) => (
                        <tr
                          onDoubleClick={() => {
                            toggleShouldDisplayDetails();
                            setUserId(row.id);
                          }}
                          key={row.id}
                          className="hover:bg-slate-200 hover:cursor-pointer dark:hover:bg-slate-700"
                        >
                          <td className="table-td font-semibold text-slate-800">
                            {row?.fullName}
                          </td>
                          <td className="table-td font-semibold text-gray-500">
                            {row?.email}
                          </td>
                          <td className="table-td">{row?.phoneNumber}</td>
                          <td className="table-td">{row?.idCardNumber}</td>
                          <td>
                            <div className="flex gap-2">
                              <Button
                                size={14}
                                icon="heroicons-outline:eye"
                                className="btn btn-light p-1.5 rounded-full"
                                onClick={() => {
                                  toggleShouldDisplayDetails();
                                  setUserId(row.id);
                                }}
                              />
                              <Button
                                icon="heroicons-outline:pencil"
                                size={14}
                                className="btn btn-light p-1.5 rounded-full"
                                onClick={() => {
                                  toggleShouldEdit();
                                  setUserId(row.id);
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <caption className="caption-bottom text-center py-24">
                      <span> Oups! Aucun utilisateur pour l`intant</span>
                    </caption>
                  )}
                </table>
              </div>
            </div>
          </div>
        </Card>
      )}
      {shouldAdd && (
        <AddUserModal
          isActive={shouldAdd}
          onClose={toggleShouldAdd}
          onCreated={async () => {
            toggleShouldAdd();
            await fetchUsersByType();
          }}
        />
      )}
      {shouldEdit && (
        <EditUserModal
          isActive={shouldEdit}
          onClose={toggleShouldEdit}
          user={activeUser}
          onUpdated={async () => {
            toggleShouldEdit();
            await fetchUsersByType();
          }}
        />
      )}
      {shouldDisplayDetails && (
        <UserDetailsModal
          isActive={shouldDisplayDetails}
          onClose={toggleShouldDisplayDetails}
          user={activeUser}
        />
      )}
    </div>
  );
};

export default UsersList;

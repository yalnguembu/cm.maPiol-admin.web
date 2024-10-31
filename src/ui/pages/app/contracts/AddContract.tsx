import React, { useContext, useState, useEffect } from "react";
import Textinput from "@/ui/components/ui/Textinput";
import Button from "@/ui/components/ui/Button";
import Card from "@/ui/components/ui/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "@/ui/components/ui/Select";
import { useNavigate, useSearchParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Icon from "@/ui/components/ui/Icon";
import { DependeciesContext } from "@/utils/useDepedencies";
import { UserView } from "@/primary/user/UserView";

const AddContract = () => {
  const { contractServices, userServices, propertyServices } =
    useContext(DependeciesContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [duration, setDration] = useState("");
  const [frequency, setFrequence] = useState("");
  const [devise, setDevise] = useState("");
  const [amountPresume, setAmountPresume] = useState("");
  const [amountGive, setAmountGive] = useState("");
  const [amountCaution, setAmountCaution] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [durationCaution, setDurationCaution] = useState("");
  const [delaiCaution, setDelaiCaution] = useState("");
  const [durationPreavis, setDurationPreavis] = useState("");
  const [propertyId, setPropertyId] = useState("");

  const frequencies = [
    { value: 1, label: "Jours" },
    { value: 2, label: "Semaines" },
    { value: 3, label: "Mois" },
    { value: 4, label: "Annee" },
  ];

  const currencies = [
    { value: "XAF", label: "XAF" },
    { value: "USD", label: "USD" },
  ];
  // useQue
  const [properties, setProperties] = useState([]);
  const [locators, setLocators] = useState([]);

  const fetchLocators = async () => {
    const tenants = await userServices.getAllVisitors();
    const visitors = await userServices.getAllTenants();
    setLocators([{ id: "-", fullName: "---" }, ...tenants, ...visitors]);
  };

  const fetchProperties = async () => {
    const response = await propertyServices.getMines(userId);
    setProperties(response);
    const propertyIdParam = searchParams.get("property");
    if (propertyIdParam) {
      setPropertyId(propertyIdParam);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchLocators();
  }, []);

  const [shouldCreateNewUser, setShouldCreateNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [CNINumber, setCNINumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedUser, setSelectedUser] = useState<UserView>();

  const userId = localStorage.getItem("Useruid");
  const globalSchema = yup.object().shape({
    startDate: yup.string().required("Ce champs est requis"),
    endDate: yup.string().required("Ce champs est requis"),
    paymentDate: yup.string().required("Ce champs est requis"),
    duration: yup.string().required("Ce champs est requis"),
    frequency: yup.string().required("Ce champs est requis"),
    devise: yup.string().required("Ce champs est requis"),
    amountPresume: yup.string().required("Ce champs est requis"),
    amountGive: yup.string().required("Ce champs est requis"),
    amountCaution: yup.string().required("Ce champs est requis"),
    paymentMethod: yup.string().required("Ce champs est requis"),
    durationCaution: yup.string().required("Ce champs est requis"),
    delaiCaution: yup.string().required("Ce champs est requis"),
    durationPreavis: yup.string().required("Ce champs est requis"),
  });

  const userSchema = yup.object().shape({
    name: yup.string().required("Ce champs est requis"),
    email: yup
      .string()
      .email("Adresse email invalide")
      .required("Ce champs est requis"),
    password: yup
      .string()
      .required("Ce champs est requis")
      .min(8, "Veillez sasir au moins 8 caracteres")
      .max(16, "Veillez sasir au maximum 8 caracteres"),
    CNINumber: yup.string().required("Ce champs est requis"),
    phoneNumber: yup.string().required("Ce champs est requis"),
  });

  const curretSchema = shouldCreateNewUser ? userSchema : globalSchema;

  useEffect(() => {}, [curretSchema]);

  const [isCreating, setIsCreating] = useState(false);
  const createUser = async (data) => {
    await userServices.create();
    const user = await userServices.createOwnerUser({
      email: data.email,
      phoneNumber: data.phoneNumber,
      firstname: data.name,
      lastname: data.name,
      idCardNumber: data.CNINumber,
      password,
    });
    setSelectedUser(user);
    return user;
  };

  const createContract = async (data) => {
    const response = await contractServices.createContract({
      startDate: startDate,
      endDate: endDate,
      paymentDate: paymentDate,
      returnTimeDeposit: data.delaiCaution,
      devise: data.devise,
      preadviceDuration: data.durationPreavis,
      contractDuration: data.duration,
      frequency: data.frequency,
      tenantId: data.selectedUser?.id ?? data.userId,
      paymentMethod: data.paymentMethod,
      ownerId: userId,
      propertyId: data.propertyId,
      depositAmount: {
        value: data.amountCaution,
        currency: data.devise,
      },
      amountByAmount: {
        value: data.amountPresume,
        currency: data.devise,
      },
      amountPaid: {
        value: data.amountGive,
        currency: data.devise,
      },
      amountDepositDuration: {
        value: data.delaiCaution,
        currency: data.devise,
      },
    });
    return response;
  };
  const onSubmit = async (data) => {
    if (isLoading) return;

    if (shouldCreateNewUser) {
      try {
        setIsCreating(true);
        const userId = await createUser(data);
        if (userId) {
          setShouldCreateNewUser(false);
        }
        return;
      } catch (error) {
        console.log(error);
      } finally {
        setIsCreating(false);
      }
    }

    setIsLoading(true);
    try {
      await createContract(data);
      navigate("/owner/contracts/pending");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(curretSchema),
    mode: "all",
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <header className="flex justify-between items-center py-4">
            <p className="card-title">Nouveau contract</p>
            <div className="flex">
              <Button
                onClick={() => navigate(-1)}
                text="Annuler"
                className="btn-secondary mr-2"
              />
              <Button
                text="Enregistrer"
                className="btn-dark"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </header>
        </section>

        <div className="conten-box grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="col-span-3">
            <Card title="Information de base">
              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
                <Textinput
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  label="Date de debut"
                  name="startDate"
                  error={errors.startDate}
                  register={register}
                />
                <Textinput
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  label="Date de fin"
                  error={errors.endDate}
                  register={register}
                  name="endDate"
                />
                <Textinput
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  label="Date de paiment"
                  error={errors.paymentDate}
                  register={register}
                  name="paymentDate"
                />
                <Textinput
                  label="Duree"
                  value={duration}
                  onChange={(e) => setDration(e.target.value)}
                  type="text"
                  placeholder="Durre"
                  name="duration"
                  error={errors.duration}
                  register={register}
                />
                <Select
                  label="Frequence"
                  value={frequency}
                  onChange={(e) => setFrequence(e.target.value)}
                  placeholder="Selectionnez la frequence"
                  error={errors.frequency}
                  register={register}
                  options={frequencies}
                  name="frequency"
                />
              </div>
            </Card>
            <Card title="Payment" className="mt-6">
              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
                <Select
                  label="Devise"
                  value={devise}
                  onChange={(e) => setDevise(e.target.value)}
                  placeholder="Devise"
                  register={register}
                  options={currencies}
                  error={errors.devise}
                  name="devise"
                />
                <Textinput
                  type="text"
                  label="Montant prevu"
                  value={amountPresume}
                  onChange={(e) => setAmountPresume(e.target.value)}
                  name="amountPresume"
                  error={errors.amountPresume}
                  placeholder="Entrez le montant prevu"
                  register={register}
                />
                <Textinput
                  type="text"
                  label="Montant versee"
                  value={amountGive}
                  onChange={(e) => setAmountGive(e.target.value)}
                  name="amountGive"
                  error={errors.amountGive}
                  placeholder="Entrez le montant versee"
                  register={register}
                />
                <Textinput
                  label="Moyen de paiment"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  type="text"
                  placeholder="Entre le moyen de paiment"
                  name="paymentMethod"
                  error={errors.paymentMethod}
                  register={register}
                />
                <Textinput
                  type="text"
                  label="Montant caution"
                  value={amountCaution}
                  onChange={(e) => setAmountCaution(e.target.value)}
                  name="amountCaution"
                  error={errors.amountCaution}
                  placeholder="Entrez le montant de la caution"
                  register={register}
                />
                <Textinput
                  label="Durre de la caution"
                  value={durationCaution}
                  onChange={(e) => setDurationCaution(e.target.value)}
                  type="text"
                  placeholder="Entrez la durree de la caution"
                  name="durationCaution"
                  error={errors.durationCaution}
                  register={register}
                />
                <Textinput
                  label="Delais de restitution de la caution"
                  value={delaiCaution}
                  onChange={(e) => setDelaiCaution(e.target.value)}
                  type="text"
                  placeholder="Entrez le Delais de restitution de la caution"
                  name="delaiCaution"
                  error={errors.delaiCaution}
                  register={register}
                />
                <Textinput
                  label="Duree du preavis"
                  value={durationPreavis}
                  onChange={(e) => setDurationPreavis(e.target.value)}
                  type="text"
                  placeholder="Durre"
                  name="durationPreavis"
                  error={errors.durationPreavis}
                  register={register}
                />
              </div>
            </Card>
          </div>
          <div className="col-span-2 h-min">
            <Card title="Propritee">
              <Select
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                placeholder="Selectionnez la propriete"
                error={errors.propertyId}
                register={register}
                options={properties.map((property) => ({
                  value: property.id,
                  label: property.description,
                }))}
                name="propertyId"
              />
            </Card>
            <Card
              title="Locataire"
              className="mt-6"
              headerslot={
                !shouldCreateNewUser && (
                  <Button
                    text="Nouvel locataire"
                    className="text-slate-900 border border-slate-900 hover:shadow-lg hover:bg-gray-100"
                    onClick={() => setShouldCreateNewUser(true)}
                    icon="heroicons-outline:plus"
                  />
                )
              }
            >
              {shouldCreateNewUser ? (
                <>
                  <h5 className="text-lg text-slate-900 font-semibold mb-4">
                    Cree un nouveau locataire
                  </h5>
                  <div className="flex flex-col gap-6">
                    <Textinput
                      label="Nom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Entrez le nom"
                      name="name"
                      error={errors.name}
                      register={register}
                    />
                    <Textinput
                      label="Enail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Entrez l'email"
                      name="email"
                      error={errors.email}
                      register={register}
                    />
                    <Textinput
                      label="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Entrez le password"
                      name="password"
                      error={errors.password}
                      register={register}
                    />
                    <Textinput
                      label="Numero de CNI"
                      value={CNINumber}
                      onChange={(e) => setCNINumber(e.target.value)}
                      type="text"
                      placeholder="Entrez le numero de CNI"
                      name="CNINumber"
                      error={errors.CNINumber}
                      register={register}
                    />
                    <Textinput
                      label="Numero de telephone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="text"
                      placeholder="Entrez le numero telephone"
                      name="phoneNumber"
                      error={errors.phoneNumber}
                      register={register}
                    />
                    <div className="flex">
                      <Button
                        onClick={() => setShouldCreateNewUser(false)}
                        text="Annuler"
                        className="btn-secondary mr-2"
                      />
                      <Button
                        text="Creer"
                        className="btn-dark"
                        type="submit"
                        isLoading={isCreating}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* <InputGroup
                    label="Utilisateur"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    type="text"
                    placeholder="Entrez le nom ou le prenom"
                    name="userSearch"
                    error={errors.userSearch}
                    register={register}
                    prepend={
                      <Icon
                        icon="heroicons-outline:magnifying-glass"
                        width="18"
                      />
                    }
                    append={
                      <Button
                        className=" hover:border py-1.5 px-2"
                        icon="heroicons-outline:x-mark"
                      />
                    }
                  /> */}
                  <Select
                    value={selectedUser?.id}
                    onChange={(e) =>
                      setSelectedUser(
                        locators.find((locator) => locator.id == e.target.value)
                      )
                    }
                    // placeholder="Selectionnez le locataire"
                    error={errors.userId}
                    register={register}
                    options={locators?.map((locator) => ({
                      value: locator.id,
                      label: locator.fullName,
                    }))}
                    name="userId"
                  />
                  {!!selectedUser && (
                    <div className="flex w-full items-center justify-between border px-4 py-2 rounded-lg transition">
                      <div className="flex">
                        <Icon icon="heroicons-outline:user-circle" width="38" />
                        <div className="ml-2 mt-1">
                          <span className=" block text-lg p-0 leading-4 font-medium group-hover:text-blue-600 group-hover:underline text-slate-900 w-full truncate">
                            {selectedUser?.fullName}
                          </span>
                          <div className="flex items-center text-slate-400 dark:text-slate-400 text-sm mt-1">
                            <Icon
                              icon="heroicons-outline:at-symbol"
                              width="14"
                            />
                            <span className="ml-1">{selectedUser?.email}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className=" hover:border py-1.5 px-2"
                        icon="heroicons-outline:x-mark"
                        onClick={() => setSelectedUser("")}
                      />
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContract;

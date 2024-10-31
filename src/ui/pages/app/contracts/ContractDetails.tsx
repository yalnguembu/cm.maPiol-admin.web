import React, {useContext, useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Button from "@/ui/components/ui/Button";
import {DependeciesContext} from "@/utils/useDepedencies";
import {UserView} from "@/primary/user/UserView";
import {ContractView} from "@/primary/contract/ContractView";
import Loading from "@/ui/components/Loading";
import {PropertyView} from "@/primary/property/PropertyView";
import {dateToString} from "@/utils/date";
import Payments from "./Payments";
import Checkbox from "@/ui/components/ui/Checkbox";
import Icon from "../../../components/ui/Icon";

const ContractDetails = () => {
  const {contractServices, userServices, propertyServices} =
    useContext(DependeciesContext);
  const navigate = useNavigate();
  const [contract, setContract] = useState<ContractView>({});
  const [isLoading, setIsLoading] = useState(false);
  const [tenant, setTenant] = useState<UserView>({});
  const [owner, setOwner] = useState<UserView>({});
  const [property, setProperty] = useState<PropertyView>({});

  const userId = localStorage.getItem("Useruid") ?? "";

  const [shouldDisplayPayments, setShouldDisplayPayments] = useState(false);

  const toggleDisplayPayments = () =>
    setShouldDisplayPayments(!shouldDisplayPayments);

  const params = useParams();

  const fetchContractDetails = async () => {
    setIsLoading(true);
    const response = await contractServices.getById(params.id);
    setContract(response);
    console.log(response);

    const ownerResponse: UserView = response.ownerId
      ? await userServices?.getUserByUUID(response.ownerId)
      : {};
    setOwner(ownerResponse);

    const tenantResponse: UserView = response.tenantId
      ? await userServices?.getUserByUUID(response.tenantId)
      : {};
    setTenant(tenantResponse);

    const propertyResponse: PropertyView = response.propertyId
      ? await propertyServices?.getPropertyById(response.propertyId)
      : {};
    setProperty(propertyResponse);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchContractDetails();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 pb-4 items-center">
          <Button
            icon="heroicons-outline:arrow-left"
            className="btn bg-white btn-border-ligth cursor-pointer rounded-full p-2"
            onClick={() => navigate(-1)}
          />
          <span>Details du contrat</span>
        </div>
        {(contract.ownerId === userId || contract.tenantId === userId) &&
          contract.status === 2 && (
            <Button
              onClick={toggleDisplayPayments}
              icon="heroicons-outline:banknotes"
              text="Paiments"
              className="bg-[#a6837b] text-white flex space-x-3 rounded justify-center items-center px-6 py-3"
            />
          )}
      </div>

      {isLoading ? (
        <Loading/>
      ) : (
        <>
          <div className="py-4">
            <p className="font-semibold text-xl text-primary-700 mt-2">
              ENTRE LES SOUSSIGNÉS :
            </p>
            <div className="mb-2">
              <p className="text-lg text-[#192340] p-2">
                {owner.fullName} , titulaire de la CNI N° {owner.idCardNumber}{" "}
                délivrée le {owner.id}, Tél : {owner.phoneNumber}
              </p>
              <p className="text-xl font-semibold text-[#666] mt-2">
                dénommée LE BAILLEUR
              </p>
              <p className="font-semibold text-xl text-primary-700 mt-2">
                D’UNE PART
              </p>
            </div>

            <div className="mb-2">
              <p className="text-lg text-[#192340] p-2">
                {tenant.fullName} , titulaire de la CNI N° {tenant.idCardNumber}{" "}
                délivrée le {tenant.id}, Tél : {tenant.phoneNumber}
              </p>
              <p className="text-xl font-semibold text-[#666] mt-2">
                dénommée LE LOCATAIRE
              </p>
              <p className="font-semibold text-xl text-primary-700 mt-2">
                D’AUTRE PART
              </p>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-xl text-primary-700 mt-2">
                IL A ÉTÉ CONVENU CE QUI SUIT :
              </p>
            </div>
            <div className="mb-2">
              <p className="font-semibold text-xl text-primary-700 mt-2">
                ARTICLE 1 : OBJET DU CONTRAT
              </p>
              <p className="text-lg text-[#192340] p-2">
                Le Bailleur loue au Locataire, qui accepte, les locaux situés à{" "}
                {property.adress?.street}, désignés ci-après {property.type}. Le
                Bien est loué à usage
                {property.usage}. exclusivement.
              </p>
            </div>
            <div className="mb-2">
              <p className="font-semibold text-xl text-primary-700 mt-2">
                ARTICLE 2 : DURÉE DU BAIL
              </p>
              <p className="text-lg text-[#192340] p-2">
                Le présent bail est consenti pour une durée de{" "}
                {dateToString(contract.startDate)}, à compter du{" "}
                {dateToString(contract.endDate)}, pour se terminer le{" "}
                {contract.endDate}. À l’expiration de cette période, le bail
                peut être renouvelé par accord mutuel.
              </p>
            </div>
            <div className="mb-2">
              <p className="font-semibold text-xl text-primary-700 mt-2">
                ARTICLE 3 : LOYER
              </p>
              <p className="text-lg text-[#192340] p-2">
                Le loyer {contract.frequency} est fixé à{" "}
                {contract.amountByAmount?.value}{" "}
                {contract.amountByAmount?.currency}, payable d'avance avant le{" "}
                {dateToString(contract.paymentDate)}. Le paiement sera effectué
                par {contract.paymentMethod}.
              </p>
            </div>

            <p className="font-semibold text-xl text-primary-700 mt-2">
              ARTICLE 4 : DÉPÔT DE GARANTIE{" "}
            </p>
            <div className="mb-2">
              <p className="text-lg text-[#192340] p-2">
                Le Locataire verse, en garantie de l'exécution de ses
                obligations, un dépôt de garantie d'un montant de{" "}
                {contract.depositAmount?.value} F CFA , correspondant à{" "}
                {contract.amountDepositDuration?.value} mois de loyer. Ce dépôt
                sera restitué au Locataire dans un délai de{" "}
                {contract.returnTimeDeposit} mois après la fin du bail, sous
                réserve des éventuelles retenues pour dégradations.
              </p>
            </div>
            <div className="mb-2">
              <p className="font-semibold text-xl text-primary-700 mt-2">
                ARTICLE 5 : OBLIGATIONS DU BAILLEUR
              </p>
              <p className="text-lg text-[#192340] p-2">
                Le Bailleur s'engage à :
              </p>
              <p className="text-lg text-[#192340] p-2">
                - Assurer au Locataire la jouissance paisible du Bien loué.
              </p>
              <p className="text-lg text-[#192340] p-2">
                - Maintenir le Bien en état de servir à l'usage prévu.{" "}
              </p>
              <p className="text-lg text-[#192340] p-2">
                - Effectuer toutes les réparations nécessaires non imputables au
                Locataire.{" "}
              </p>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-xl text-primary-700 mt-2">
                ARTICLE 6 : OBLIGATIONS DU LOCATAIRE
              </p>
              <p className="text-lg text-[#192340] p-2">
                Le Locataire s'engage à :
              </p>
              <p className="text-lg text-[#192340] p-2">
                - Payer le loyer aux échéances convenues.
              </p>
              <p className="text-lg text-[#192340] p-2">
                - User des locaux de manière raisonnable et conformément à leur
                destination.{" "}
              </p>
              <p className="text-lg text-[#192340] p-2">
                - Ne pas sous-louer le Bien sans l'accord écrit du Bailleur.{" "}
              </p>
              <p className="text-lg text-[#192340] p-2">
                - Maintenir le Bien en bon état et réaliser les petites
                réparations nécessaires.{" "}
              </p>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-xl text-primary-700 mt-2">
                ARTICLE 7 : ÉTAT DES LIEUX
              </p>
              <p className="text-lg text-[#192340] p-2">
                Un état des lieux sera dressé à l'entrée et à la sortie du
                Locataire. Les parties signent l'état des lieux et en conservent
                un exemplaire chacun.
              </p>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-xl text-primary-700 mt-2">
                ARTICLE 8 : RÉSILIATION
              </p>
              <p className="text-lg text-[#192340] p-2">
                En cas de non-respect par l'une des parties de ses obligations,
                le présent bail pourra être résilié de plein droit, sous réserve
                de respecter un préavis de {contract.preadviceDuration} mois.
              </p>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-xl text-primary-700 mt-2">
                ARTICLE 9 : SIGNATURES
              </p>
              <p className="text-lg text-[#192340] p-2">
                Fait à [Lieu], le [Date].{" "}
              </p>
              <p className="text-lg text-[#192340] p-2">
                [Nom et signature du Bailleur]{" "}
              </p>
              <p className="text-lg text-[#192340] p-2">
                [Nom et signature du Locataire]{" "}
              </p>
            </div>

            <p className="font-semibold text-xl text-primary-700 mt-2">
              Statut du Contrat
            </p>
            <div className="mb-2">
              <p className="text-lg text-[#192340] p-2">Statut:</p>
              <p
                className={`text-xl font-semibold text-[#666] mt-2 ${
                  contract.contractStatus === "Actif"
                }`}
              >
                {contract.contractStatus}
              </p>
            </div>
            {/*
        <button className={button}>
          <p className={buttonp}>Télécharger le Contrat</p>
        </button>

        <button
          onClick={() => navigate("PaymentList", { property })}
          className={[button, secondaryButton]}
        >
          <p className={[buttonp, secondaryButtonp]}>
            Voir l'Historique de Paiement
          </p>
        </button> */}
          </div>
          <div className="flex items-center">
            <Icon icon="heroicons:check"/>
            <span>
              Approuver par le bailleur
            </span>
          </div>
          <Checkbox
            value={false}
            onChange={() => {
            }}
            label="Approuver par le locataire"
          />
          <div className="w-full flex py-4 justify-end">
            <Button
              onClick={toggleDisplayPayments}
              icon="heroicons-outline:check"
              text="J'ai lu et j'approuve"
              className="btn bg-slate-500 text-white flex space-x-3 rounded justify-center items-center px-6 py-3"
            />
          </div>
        </>
      )}
      <Payments
        isActive={shouldDisplayPayments}
        onClose={toggleDisplayPayments}
      />
    </div>
  );
};

export default ContractDetails;

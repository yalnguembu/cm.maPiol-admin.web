import Card from "@/ui/components/ui/Card";
import React, {useState, useContext, useEffect} from "react";
import Button from "@/ui/components/ui/Button";
import Modal from "@/ui/components/ui/Modal";
import Icon from "@/ui/components/ui/Icon";
import {DependenciesContext, ServicesContext} from "@/utils/useDependencies";
import {Payment} from "@/domains/contract/Payment";
import Loading from "@/ui/components/Loading";
import {dateToString} from "@/utils/date.js";
import AddPayment from "@/ui/pages/app/contracts/AddPayment";

const Payments = ({onClose, isActive, contractId}) => {
  const {contractServices} = useContext<ServicesContext>(DependenciesContext);
  const [shouldDisplayForm, setShouldDisplayForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [payments, setPayments] = useState<Payment[]>([]);


  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const paymentsFetched = await contractServices.getPayments(contractId);
      // console.log(groupPaymentsByYearAndMonths(paymentsFetched));
      setPayments(/*groupPaymentsByYearAndMonths(*/paymentsFetched/*)*/);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handledCreated = () => {
    toggleShouldDisplayForm();
    fetchPayments();
  }

  useEffect(() => {
    fetchPayments();
  }, []);

  const toggleShouldDisplayForm = () =>
    setShouldDisplayForm(!shouldDisplayForm);

  function groupPaymentsByYearAndMonths(payments) {
    const groupedObjects = {};

    payments.forEach((payment) => {
      const key = `${payment.year}-${payment.period}`;

      if (!groupedObjects[key]) {
        groupedObjects[key] = [];
      }

      groupedObjects[key].push(payment);
    });

    return groupedObjects;
  }


  return (
    <Modal
      activeModal={isActive}
      onClose={onClose}
      className="w-2/3"
      title=""
      centered
    >
      <div className="w-full flex flex-col gap-y-4 max-h-[70dvh] overflow-y-auto">
        <div className="flex justify-between border-b pb-4">
          <h5>Paiments</h5>
          {!shouldDisplayForm && (
            <Button
              onClick={toggleShouldDisplayForm}
              className="btn text-[#a6837b] border hover:bg-[#a6837b] hover:text-white border-[#a6837b] py-1.5"
              text="Nouveau"
              icon="heroicons:plus"
            />
          )}
        </div>
        <div className="grid gap-4 relative transition duration-300">
          {shouldDisplayForm && (
            <AddPayment
              onClose={toggleShouldDisplayForm}
              onCreated={handledCreated}
              contractId={contractId}
            />
          )}
          {
            isLoading ?
              <div className="max-h-1/2">
                <Loading/>
              </div>
              : payments.length ? payments?.map((payment, index) => (
                  <Card key={index}
                        title={`${payment.paymentType}: ${payment.amount.value} ${payment.amount.currency}`}
                        subtitle={`${payment.unit} / ${payment.period} - ${payment.paymentMethod}`}
                        className="border rounded-lg"
                  >
                    <div className="flex gap-4">
                      <div className="flex gap-2 text-sm">
                        <span>Effectue le: </span>
                        <span>{dateToString(payment.initialisationDate)}</span>
                      </div>
                      <span>|</span>
                      <div className="flex gap-2 text-sm">
                        <span>Pour le compte de l'anne:</span>
                        <span>{payment.year}</span>
                      </div>
                    </div>
                    <div className="flex mt-2 text-sm">
                      {payment.description}
                    </div>
                  </Card>
                ))
                : <p className="p-4 text-center"> Aucun Payments pour le moments, Ajouter un!</p>
          }
        </div>
      </div>
    </Modal>
  );
};
export default Payments;

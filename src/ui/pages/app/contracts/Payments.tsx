import Card from "@/ui/components/ui/Card";
import Select from "@/ui/components/ui/Select";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import Textinput from "@/ui/components/ui/Textinput";
import React, {useState, useContext, useEffect} from "react";
import Button from "@/ui/components/ui/Button";
import Modal from "@/ui/components/ui/Modal";
import {DependeciesContext} from "@/utils/useDepedencies";
import {Payment} from "@/domains/contract/Payment";
import Loading from "@/ui/components/Loading";
import {dateToString} from "@/utils/date.js";

const Payments = ({onClose, isActive, contractId}) => {
  const schema = yup.object().shape({
    amount: yup.string().required("Ce champs est requis"),
    month: yup.string().required("Ce champs est requis"),
    year: yup.string().required("Ce champs est requis"),
  });

  const {contractServices} = useContext(DependeciesContext);
  const [shouldDisplayForm, setShouldDisplayForm] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(2024);
  const [payments, setPayments] = useState <Payment[]>([]);

  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

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

  const onSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await contractServices.addPayment(new Payment({
        amount: {
          currency: "XAF",
          value: amount,
        },
        year,
        month,
        contractId,
        initialisationDate: Date.now(),
      }));
      fetchPayments();
      toggleShouldDisplayForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const toggleShouldDisplayForm = () =>
    setShouldDisplayForm(!shouldDisplayForm);

  function groupPaymentsByYearAndMonths(payments) {
    const groupedObjects = {};

    payments.forEach((payment) => {
      const key = `${payment.year}-${payment.month}`;

      if (!groupedObjects[key]) {
        groupedObjects[key] = [];
      }

      groupedObjects[key].push(payment);
    });

    return groupedObjects;
  }

  const months = [
    {
      value: 1,
      label: "January",
    },
    {
      value: 2,
      label: "Febuary",
    },
  ];
  const years = [
    {
      value: 2024,
      label: "2024",
    },
    {
      value: "2023",
      label: 2023,
    },
  ];
  return (
    <Modal
      activeModal={isActive}
      onClose={onClose}
      className="w-2/3"
      title=""
      centered
    >
      <div className="w-full flex flex-col gap-y-4">
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
        <div className="grid gap-4 relative">
          {shouldDisplayForm && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="mb-4">
                <Button
                  type="submit"
                  className="btn btn-dark py-1.5 absolute -top-16 right-1"
                  text="Enregistrer"
                  isLoading={isLoading}
                />
                <Textinput
                  label="Nombre de batiment"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  placeholder="Entrer le montant"
                  name="amount"
                  error={errors.amount}
                  register={register}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Mois"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    placeholder="Selectionnez le mois"
                    error={errors.month}
                    register={register}
                    options={months}
                    name="month"
                  />
                  <Select
                    label="Annee"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Selectionnez l'annee"
                    error={errors.year}
                    register={register}
                    options={years}
                    name="year"
                  />
                </div>
              </Card>
            </form>
          )}
          {
            isLoading ?
              <div className="max-h-1/2">
                <Loading/>
              </div>
              : payments.length ? payments?.map((payment, index) => (
                  <Card key={index} title={"June - 2024"} subtitle={`${payment.amount.value} ${payment.amount.currency}`}>
                    <div>
                      <div className="flex">
                        <span>Initie le: </span>
                        <span className="ml-2 text-sm">{dateToString(payment.initialisationDate)}</span>
                      </div>
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

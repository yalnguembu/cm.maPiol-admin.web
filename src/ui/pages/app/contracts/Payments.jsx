import Card from "@/ui/components/ui/Card";
import Select from "@/ui/components/ui/Select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Textinput from "@/ui/components/ui/Textinput";
import React, { useState, useContext, useEffect } from "react";
import Button from "@/ui/components/ui/Button";
import Modal from "@/ui/components/ui/Modal";
import { DependeciesContext } from "@/utils/useDepedencies";

const Payments = ({ onClose, isActive }) => {
  const schema = yup.object().shape({
    amount: yup.string().required("Ce champs est requis"),
    month: yup.string().required("Ce champs est requis"),
    year: yup.string().required("Ce champs est requis"),
  });

  const { contractService } = useContext(DependeciesContext);
  const [shouldDisplayForm, setShouldDisplayForm] = useState(false);

  const [year, setYear] = useState(0);
  const [isLoading, setIsLoading] = useState(0);
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState(0);
  const [payments, setPayments] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await contractService.addPayment({
        amount,
        year,
        month,
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const paymentsFetched = await contractService.getPayments();
        setPayments(groupPaymentsByYearAndMonths(paymentsFetched));
        onClose();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  });

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
        <div className="flex justify-between">
          <h5>Paiments</h5>
          {!shouldDisplayForm && (
            <Button
              onClick={toggleShouldDisplayForm}
              className="btn btn-outline border py-1.5"
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
                  className="btn btn-dark py-1.5 absolute -top-12 right-1"
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
          {payments?.map((payment, index) => (
            <Card key={index} title={"June - 2024"} subtitle="35000/100000 XAF">
              <div>
                <div className="flex">
                  <span>Avance: </span>
                  <span className="ml-2">{payment.amount}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Modal>
  );
};
export default Payments;

import Select from "@/ui/components/ui/Select";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import Textarea from "@/ui/components/ui/Textarea";
import Textinput from "@/ui/components/ui/Textinput";
import React, {useState, useContext} from "react";
import Button from "@/ui/components/ui/Button";
import Card from "@/ui/components/ui/Card";
import {DependenciesContext, ServicesContext} from "@/utils/useDependencies";
import {Payment} from "@/domains/contract/Payment";

type AddPaymentProps = {
  onCreated: () => void,
  onClose: () => void,
  contractId: string,
}
const AddPayment = (
  {
    onCreated,
    onClose,
    contractId,
  }: AddPaymentProps) => {

  const {contractServices} = useContext<ServicesContext>(DependenciesContext);

  const schema = yup.object().shape({
    amount: yup.string().required("Ce champs est requis"),
    period: yup.string().required("Ce champs est requis"),
    year: yup.string().required("Ce champs est requis"),
    unit: yup.string().required("Ce champs est requis"),
    paymentMethod: yup.string().required("Ce champs est requis"),
    paymentType: yup.string().required("Ce champs est requis"),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>("");
  const [description, setDescription] = useState<string | null>("");
  const [unit, setUnit] = useState<number | null>("");
  const [period, setPeriod] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [year, setYear] = useState<number>(2024);

  const periods = [
    {
      value: "Mois",
      label: "Mois",
    },
    {
      value: "Semaines",
      label: "Semaines",
    },
    {
      value: "Jours",
      label: "Jours",
    },
    {
      value: "Heures",
      label: "Heures",
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
  const paymentMethods = [
    {
      value: "Cash",
      label: "Cash",
    }, {
      value: "Banque",
      label: "Banque",
    },
  ];
  const paymentTypes = [
    {
      value: "Avance",
      label: "Avance",
    }, {
      value: "Reste",
      label: "Reste",
    },
  ];

  const {
    register,
    formState: {errors},
    handleSubmit,
    clearErrors
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

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
        period,
        contractId,
        initialisationDate: Date.now(),
        paymentMethod,
        paymentType,
        description,
        unit
      }));
      setAmount("");
      setPaymentType(1);
      setPaymentMethod(1);
      setYear(2024);
      setDescription("");
      setPeriod(1);
      setUnit("");
      onCreated();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onReset = () => {
    onClose();
    clearErrors();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Card className="mb-4 p-0  border">
        <div className="absolute -top-16 right-1 space-x-4">
          <Button
            type="reset"
            className="btn bg-gray-200 py-1.5"
            text="Annuler"
          />
          <Button
            type="submit"
            className="btn btn-dark py-1.5"
            text="Enregistrer"
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <Textinput
            label="Montant"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Entrer le montant"
            name="amount"
            error={errors.amount}
            register={register}
          />
          <Select
            label="Periodes"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            placeholder="Selectionnez le mois"
            error={errors.period}
            register={register}
            options={periods}
            name="period"
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
          <Textinput
            label="Nombre de periode"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            type="number"
            placeholder="Entrer le nombre de periode"
            name="unit"
            error={errors.unit}
            register={register}
          />
          <Select
            label="Moyen de Paiement"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="Selectionnez le moyen de paiment"
            error={errors.paymentMethod}
            register={register}
            options={paymentMethods}
            name="paymentMethod"
          />
          <Select
            label="Type de versement"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            placeholder="Selectionnez le type de versement"
            error={errors.paymentType}
            register={register}
            options={paymentTypes}
            name="paymentType"
          />
          <div className="col-span-2">
            <Textarea
              label="Description"
              dvalue={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entrer la description du paiment (raison ou toute autre chosess qui vous semble utile)"
              name="description"
              error={errors.description}
              register={register}
            />
          </div>
        </div>
      </Card>
    </form>
  )
}

export default AddPayment;
import React, { useContext, useState } from "react";
import Button from "@/ui/components/ui/Button";
import Modal from "@/ui/components/ui/Modal";
import Textinput from "@/ui/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { DependenciesContext } from "@/utils/useDependencies";

type Props = {
  onCreated: () => Promise<void>;
  isActive: boolean;
  onClose: () => void;
  ownerId: string;
  propertyId: string;
  tenantId: string;
};
const AddVisitModal = (props: Props) => {
  const { onCreated, isActive, onClose, ownerId, propertyId, tenantId } = props;
  const { visitServices } =
    useContext(DependenciesContext);

  const [time, setStartDate] = useState<string>("");
  const [date, setEndDate] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schema = yup
    .object({
      startDate: yup.string().required("Ce champs est Requis"),
      endDate: yup.string().required("Ce champs est Requis"),
      details: yup.string().required("Ce champs est Requis"),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      console.log(
        date,
        time,
        details,
        ownerId,
        propertyId,
        tenantId);
      
      const userId = await visitServices.createVisit({
        date,
        time,
        details,
        ownerId,
        propertyId,
        tenantId,
        status: 0,
      });

        toast.success("Visit cree avec succes");
        await onCreated();
    } catch (error) {
      toast.error("Erreur lors de la creation, veuillez réessayer");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        activeModal={isActive}
        onClose={onClose}
        className="max-w-xl w-[600px]"
        centered
        title="Nouvel visite"
      >
        <form
        onReset={onClose}
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 grid"
        >
          <Textinput
            name="startDate"
            value={time}
            label="Date"
            type="date"
            register={register}
            error={errors.startDate}
            onChange={(event: InputEvent) => setStartDate(event.target?.value)}
            className="h-[48px]"
            placeholder="Entrer la date de visite"
          />
          <Textinput
            name="endDate"
            label="Heure"
            type="time"
            register={register}
            error={errors.endDate}
            value={date}
            onChange={(event: InputEvent) => setEndDate(event.target?.value)}
            className="h-[48px]"
            placeholder="Entrer l'heure de visite"
          />
          <Textinput
            name="details"
            label="details"
            type="text"
            register={register}
            error={errors.details}
            value={details}
            onChange={(event: InputEvent) => setDetails(event.target?.value)}
            className="h-[48px]"
            placeholder="Entrez les details ici"
          />
          <div className="pb-4 gap-x-4 flex justify-end w-full">
            <Button
              type="reset"
              text="Annuler"
              className="btn btn-light block text-center px-12 mt-4"
            />
            <Button
              type="submit"
              text="Creer"
              className="btn btn-dark block text-center px-12 mt-4"
              isLoading={isLoading}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddVisitModal;

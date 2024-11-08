import React, {useContext, useState} from "react";
import Button from "@/ui/components/ui/Button";
import Modal from "@/ui/components/ui/Modal";
import Textinput from "@/ui/components/ui/Textinput";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {toast} from "react-toastify";
import {DependeciesContext} from "@/utils/useDepedencies";

type Props = {
  onConfirm: () => Promise<void>;
  isActive: boolean;
  onClose: () => void;
  isLoading: boolean;
};
const SignContractModal = (props: Props) => {
  const {onConfirm, isActive, onClose, isLoading} = props;

  return (
    <>
      <Modal
        activeModal={isActive}
        onClose={onClose}
        className="max-w-xl w-[600px]"
        centered
        title="Confirmation"
      >
        <div
          className="gap-4 flex flex-col"
        >
          <p>
            En cliquant sur "Je confirme avoir lu et approuve", vous reconnaissez avoir lu et approuvé l'intégralité de
            ce contrat
          </p>
          <div className="pb-4 gap-x-4 flex flex-col w-full items-center">
            <Button
              onClick={onConfirm}
              text="Je confirme avoir lu et approuve"
              className="btn btn-dark w-2/3 text-center px-12 mt-4 rounded-full"
              isLoading={isLoading}
            />
            <Button
              onClick={onClose}
              text="Annuler"
              className="btn btn-light w-2/3 text-center px-12 mt-4 rounded-full"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignContractModal;

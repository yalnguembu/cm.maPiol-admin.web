import { Contract } from "@/domains/contract";
import { ContractType } from "@/domains/contract/types";
import { ContractProperties } from "@/domains/contract/types";

export type ContractFetched = {
  dateDebutContrat: string;
  dateFinContrat: string;
  delaiRestitutionCaution: string;
  devise: string;
  durreMontantCaution: number;
  durrePreAvis: string;
  durreeDuContrat: string;
  frequence: string;
  locataireId: string;
  montantCaution: number;
  montantParFrequence: number;
  montantVerse: number;
  moyentPayment: string;
  proprietaireId: string;
  proprieteId: string;
  id: ContractType;
  paiementDueDate: string;
};

export class ApiContract {
  static toDomain(apiContract: ContractFetched): Contract {
    return Contract.fromProperties({
      id: apiContract.id,
      startDate: apiContract.dateDebutContrat,
      endDate: apiContract.dateFinContrat,
      paymentDate: apiContract.paiementDueDate,
      returnTimeDeposit: apiContract.delaiRestitutionCaution,
      devise: apiContract.devise,
      amountDepositDuration: {
        value: apiContract.durreMontantCaution,
        currency: apiContract.devise,
      },
      preadviceDuration: apiContract.durrePreAvis,
      contractDuration: apiContract.durreeDuContrat,
      frequency: apiContract.frequence,
      tenantId: apiContract.locataireId,
      depositAmount: {
        value: apiContract.montantCaution,
        currency: apiContract.devise,
      },
      amountByAmount: {
        value: apiContract.montantParFrequence,
        currency: apiContract.devise,
      },
      amountPaid: {
        value: apiContract.montantVerse,
        currency: apiContract.devise,
      },
      paymentMethod: apiContract.moyentPayment,
      ownerId: apiContract.proprietaireId,
      propertyId: apiContract.proprieteId,
    });
  }
  static fromProperties(
    contract: ContractProperties
  ): Omit<ContractFetched, "id"> {
    return {
      dateDebutContrat: contract.startDate,
      paiementDueDate: contract.paymentDate,
      dateFinContrat: contract.endDate,
      delaiRestitutionCaution: contract.returnTimeDeposit,
      devise: contract.amountByAmount.currency,
      durreMontantCaution: contract.depositAmount.value,
      durrePreAvis: contract.preadviceDuration,
      durreeDuContrat: contract.contractDuration,
      frequence: contract.frequency,
      locataireId: contract.tenantId,
      montantCaution: contract.depositAmount.value,
      montantParFrequence: contract.amountByAmount.value,
      montantVerse: contract.amountPaid.value,
      moyentPayment: contract.paymentMethod,
      proprietaireId: contract.ownerId,
      proprieteId: contract.propertyId,
    };
  }
}

import {Contract} from "@/domains/contract";
import {ContractType} from "@/domains/contract/types";
import {ContractProperties} from "@/domains/contract/types";
import {Payment, PaymentProperties} from "@/domains/contract/Payment";

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
  approuveParLocatire: boolean;
  approuveParProprietaire: boolean;
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
      approvedByOwner: apiContract.approuveParProprietaire,
      approvedByTenant: apiContract.approuveParLocatire,
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
      approuveParLocatire: contract.approvedByOwner,
      approuveParProprietaire: contract.approvedByTenant,
    };
  }
}

export type ApiPaymentProperties = {
  montant: string;
  devise: string;
  annee: string;
  unite: string;
  contratId: string;
  dateInitialisation: string;
  periode: string;
  moyenDePaiement: string;
  typeDePaiement: string;
  description: string;
}

export class ApiPayment {
  static toDomain(payment: ApiPaymentProperties) {
    return new Payment({
      amount: {
        value: payment.montant ?? 0,
        currency: payment.devise ?? "XAF",
      },
      period: payment.periode ?? "",
      year: payment.annee ?? "",
      contractId: payment.contratId ?? "",
      initialisationDate: payment.dateInitialisation ?? "",
      description: payment.description ?? "",
      unit: payment.unite ?? "",
      paymentMethod: payment.moyenDePaiement ?? "",
      paymentType: payment.typeDePaiement ?? "",
    })
  }

  static fromDomain(payment: Payment) {
    return {
      montant: payment.amount.value,
      devise: payment.amount.currency,
      annee: payment.year,
      contratId: payment.contractId,
      dateInitialisation: payment.initialisationDate,
      periode: payment.period,
      description: payment.description,
      unite: payment.unit,
      moyenDePaiement: payment.paymentMethod,
      typeDePaiement: payment.paymentType,
    }
  }
}
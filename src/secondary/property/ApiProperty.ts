import { Property } from "@/domains/property";
import { PropertyType } from "@/domains/property/types";
import { PropertyProperties } from "domains/property/types";

export type PropertyFetched = {
  id: PropertyType;
  adresse: string;
  centreImposition: string;
  description: string;
  devise: string;
  etat: number;
  existAscenseur: boolean;
  existBalcon: boolean;
  existCave: boolean;
  existCentreSanteAproximative: boolean;
  existChauffageCollectif: boolean;
  existChemine: boolean;
  existEauChaudeCollective: boolean;
  existEcoleAproximative: boolean;
  existEspaceVert: boolean;
  existGarage: boolean;
  existGardiennage: boolean;
  existInterphone: boolean;
  existSalleManger: boolean;
  existVideOrdure: boolean;
  favorite: string;
  frequence: string;
  nombreBatiment: number;
  nombreEscalier: number;
  nombreEtage: number;
  nombrePieces: number;
  nombreDouche: number;
  nombreChambre: number;
  position: {
    lat: number;
    lng: number;
  };
  prix: number;
  quartier: string;
  statut: number;
  surface: number;
  type: PropertyType;
  usage: number;
  userId: string;
  ville: string;
  images: string[];
  videoURL?: string;
};

export class ApiProperty {
  static toDomain(apiProperty: PropertyFetched): Property {
    return Property.fromProperties({
      id: apiProperty.id ?? "",
      centreImposition: apiProperty.centreImposition ?? "",
      description: apiProperty.description ?? "",
      price: {
        value: apiProperty.prix ?? 0,
        currency: apiProperty.devise ?? "XAF",
      },
      state: apiProperty.statut ?? 0,
      hasAssensor: apiProperty.existAscenseur ?? false,
      hasBalcony: apiProperty.existBalcon ?? false,
      hasCave: apiProperty.existCave ?? false,
      hasHealthCenterNearby: apiProperty.existCentreSanteAproximative ?? false,
      hasCollectiveHeating: apiProperty.existChauffageCollectif ?? false,
      hasPath: apiProperty.existChemine ?? false,
      hasCollectiveHotWater: apiProperty.existEauChaudeCollective ?? false,
      hasSchoolNearby: apiProperty.existEcoleAproximative ?? false,
      hasGreenSpace: apiProperty.existEspaceVert ?? false,
      hasGarage: apiProperty.existGarage ?? false,
      hasSecurity: apiProperty.existGardiennage ?? false,
      hasIntercom: apiProperty.existInterphone ?? false,
      hasDiningRoom: apiProperty.existSalleManger ?? false,
      hasGrabageChute: apiProperty.existVideOrdure ?? false,
      favorite: apiProperty.favorite ?? "",
      frequence: apiProperty.frequence ?? "",
      numberOfBuilding: apiProperty.nombreBatiment ?? 0,
      nombreEscalier: apiProperty.nombreEscalier ?? 0,
      nombreEtage: apiProperty.nombreEtage ?? 0,
      nombrePieces: apiProperty.nombrePieces ?? 0,
      bathroomNumber: apiProperty.nombreDouche ?? 0,
      bedroomNumber: apiProperty.nombreChambre ?? 0,
      adress: {
        street: apiProperty.adresse ?? "",
        city: apiProperty.ville ?? "",
        country: "",
        quater: apiProperty.quartier ?? "",
        position: {
          latitude: apiProperty.position?.lat ?? 0.0,
          longitude: apiProperty.position?.lng ?? 0.0,
        },
      },
      status: apiProperty.statut ?? 0,
      surface: apiProperty.surface ?? 0,
      type: apiProperty.type ?? 1,
      usage: apiProperty.usage ?? 0,
      userId: apiProperty.userId ?? "",
      images: apiProperty.images ?? [],
      video: apiProperty.videoURL ?? "",
    });
  }
  static fromProperties(
    apiProperty: PropertyProperties
  ): Omit<PropertyFetched, "id" | "favorite"> {
    const property = {
      centreImposition: apiProperty.centreImposition,
      description: apiProperty.description,
      prix: apiProperty.price.value,
      devise: apiProperty.price.currency,
      statut: apiProperty.status,
      existAscenseur: apiProperty.hasAssensor,
      existBalcon: apiProperty.hasBalcony,
      existCave: apiProperty.hasCave,
      existCentreSanteAproximative: apiProperty.hasHealthCenterNearby,
      existChauffageCollectif: apiProperty.hasCollectiveHeating,
      existChemine: apiProperty.hasPath,
      existEauChaudeCollective: apiProperty.hasCollectiveHotWater,
      existEcoleAproximative: apiProperty.hasSchoolNearby,
      existEspaceVert: apiProperty.hasGreenSpace,
      existGarage: apiProperty.hasGarage,
      existGardiennage: apiProperty.hasSecurity,
      existInterphone: apiProperty.hasIntercom,
      existSalleManger: apiProperty.hasDiningRoom,
      existVideOrdure: apiProperty.hasGrabageChute,
      frequence: apiProperty.frequence,
      nombreBatiment: apiProperty.numberOfBuilding,
      nombreEscalier: apiProperty.nombreEscalier,
      nombreEtage: apiProperty.nombreEtage,
      nombrePieces: apiProperty.nombrePieces,
      nombreDouche: apiProperty.bathroomNumber,
      nombreChambre: apiProperty.bedroomNumber,
      adresse: apiProperty.adress.street,
      ville: apiProperty.adress.city,
      quartier: apiProperty.adress.quater,
      surface: apiProperty.surface,
      type: apiProperty.type,
      usage: apiProperty.usage,
      userId: apiProperty.userId,
      etat: apiProperty.state,
      position: {
        lat: apiProperty.adress.position.latitude,
        lng: apiProperty.adress.position.longitude,
      },
      images: apiProperty.images ?? [],
      videoURL: apiProperty.video,
    };
    const filtered = Object.entries(property)
      .filter(([key, value]) => value !== undefined && value !== "")
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    return filtered;
  }
}

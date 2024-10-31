import { Property } from "@/domains/property";
import { ApiProperty, PropertyFetched } from "./ApiProperty";
import { PropertyRepository } from "@/domains/property/repository/PropertyRepository";
import { PropertyToSave } from "@/domains/property/types";
import { FirebaseClient } from "@/secondary/FirebaseClient";

export class PropertyRessource implements PropertyRepository {
  constructor(private readonly firebaseClient: FirebaseClient) {}

  async getAll(): Promise<Property[]> {
    const apiProperties = await this.firebaseClient.getAllDocuments<
      PropertyFetched[]
    >({
      collection: "Proprietes",
    });
    return apiProperties.map(ApiProperty.toDomain);
  }

  async getMines(userId: string): Promise<Property[]> {
    const apiProperties = await this.firebaseClient.getDataByCondition<
      PropertyFetched[]
    >({
      collection: "Proprietes",
      field: "userId",
      operator: "==",
      value: userId,
    });
    return apiProperties.map(ApiProperty.toDomain);
  }

  async getById(propertyId: string): Promise<Property> {
    const property =
      await this.firebaseClient.getDocumentByName<PropertyFetched>({
        collection: "Proprietes",
        documentName: propertyId,
      });
    return ApiProperty.toDomain(property);
  }

  async create(form: PropertyToSave, files: File[]): Promise<string> {
    const images = await Promise.all(files.map(this.firebaseClient.saveImage));

    const propertyCreatedId = await this.firebaseClient.addDocument({
      collection: "Proprietes",
      form: ApiProperty.fromProperties({ ...form, images }),
    });
    return propertyCreatedId;
  }

  async update(propertyId: string, form: PropertyToSave): Promise<void> {
    await this.firebaseClient.updateDocument({
      collection: "Proprietes",
      documentName: propertyId,
      form,
    });
  }

  async editVideo(propertyId: string, video: File): Promise<void> {
    const videoURL = await this.firebaseClient.saveImage(video);
    await this.firebaseClient.updateDocument({
      collection: "Proprietes",
      documentName: propertyId,
      form: { videoURL },
    });
  }

  async getResidentialTypes() {
    const data = await this.firebaseClient.getAllDocuments({
      collection: "ProprietesUsageResidentiel",
    });

    return data?.map((propertyType) => ({
      name: propertyType.nom,
      id: propertyType.id,
    }));
  }

  async getCommertialTypes() {
    const data = await this.firebaseClient.getAllDocuments({
      collection: "ProprietesUsageCommercial",
    });

    return data?.map((propertyType) => ({
      name: propertyType.nom,
      id: propertyType.id,
    }));
  }
}

import { PropertyRepository } from "domains/property/repository/PropertyRepository";
import {
  CreateUseCase,
  GetByIdUseCase,
  GetAllUseCase,
  GetMinesUseCase,
  UpdateUserUseCase,
  GetResidentialTypesUseCase,
  GetCommertialTypesUseCase,
  EditVideoUseCase,
} from "./useCases";
import { PropertyId, PropertyToSave } from "domains/property/types";

export class PropertyService {
  private getByIdUseCase: GetByIdUseCase;
  private createUseCase: CreateUseCase;
  private getMinesUseCase: GetMinesUseCase;
  private getAllUseCase: GetAllUseCase;
  private updateUseCase: UpdateUserUseCase;
  private editVideoUseCase: EditVideoUseCase;
  private getResidentialTypesUseCase: GetResidentialTypesUseCase;
  private getCommertialTypesUseCase: GetCommertialTypesUseCase;

  constructor(propertyRepository: PropertyRepository) {
    this.getByIdUseCase = new GetByIdUseCase(propertyRepository);
    this.createUseCase = new CreateUseCase(propertyRepository);
    this.getMinesUseCase = new GetMinesUseCase(propertyRepository);
    this.getAllUseCase = new GetAllUseCase(propertyRepository);
    this.updateUseCase = new UpdateUserUseCase(propertyRepository);
    this.editVideoUseCase = new EditVideoUseCase(propertyRepository);
    this.getResidentialTypesUseCase = new GetResidentialTypesUseCase(
      propertyRepository
    );
    this.getCommertialTypesUseCase = new GetCommertialTypesUseCase(
      propertyRepository
    );
  }

  async getPropertyById(id: string) {
    return await this.getByIdUseCase.execute(id);
  }

  async getAllProperties() {
    return await this.getAllUseCase.execute();
  }

  async getMines(id: string) {
    return await this.getMinesUseCase.execute(id);
  }

  async createProperty(property: PropertyToSave, images: File[]) {
    return await this.createUseCase.execute(property, images);
  }

  async update(propertyId: PropertyId, form: PropertyToSave) {
    return await this.updateUseCase.execute(propertyId, form);
  }

  async getResidentialTypes() {
    return await this.getResidentialTypesUseCase.execute();
  }

  async getCommertialTypes() {
    return await this.getCommertialTypesUseCase.execute();
  }

  async editVideo(id: string, form: PropertyToSave) {
    return await this.editVideoUseCase.execute(id, form);
  }
}

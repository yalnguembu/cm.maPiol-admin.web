import { VisitRepository } from "@/domains/visit/repository/VisitRepository";
import {
  CancelUseCase,
  GetByIdUseCase,
  GetAllUseCase,
  GetMinesUseCase,
  AcceptUseCase,
  CreateUseCase
} from "./useCases";
import { VisitId } from "@/domains/visit/types";
import { VisitToSave } from "domains/visit/types";

export class VisitService {
  private getByIdUseCase: GetByIdUseCase;
  private cancelUseCase: CancelUseCase;
  private getMinesUseCase: GetMinesUseCase;
  private getAllUseCase: GetAllUseCase;
  private acceptUseCase: AcceptUseCase;
  private createUseCase: CreateUseCase;

  constructor(visitRepository: VisitRepository) {
    this.getByIdUseCase = new GetByIdUseCase(visitRepository);
    this.cancelUseCase = new CancelUseCase(visitRepository);
    this.getMinesUseCase = new GetMinesUseCase(visitRepository);
    this.getAllUseCase = new GetAllUseCase(visitRepository);
    this.acceptUseCase = new AcceptUseCase(visitRepository);
    this.createUseCase = new CreateUseCase(visitRepository)
  }

  async getById(id: string) {
    return await this.getByIdUseCase.execute(id);
  }

  async getAll() {
    return await this.getAllUseCase.execute();
  }

  async getMines(userId: string) {
    return await this.getMinesUseCase.execute(userId);
  }

  async cancel(id: string) {
    return await this.cancelUseCase.execute(id);
  }

  async accept(id: VisitId) {
    return await this.acceptUseCase.execute(id);
  }

  async createVisit(form: VisitToSave){
    return await this.createUseCase.execute(form);
  }

}

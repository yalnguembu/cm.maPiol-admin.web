import {NotificationRepository} from "@/domains/notification/repository/NotificationRepository";
import {
  GetMinesUseCase,
  ReadUseCase,
  CreateUseCase
} from "./useCases";
import {NotificationId} from "@/domains/notification/types";
import {NotificationToSave} from "@/domains/notification/types";

export class NotificationService {
  private getMinesUseCase: GetMinesUseCase;
  private readUseCase: ReadUseCase;
  private createUseCase: CreateUseCase;

  constructor(notificationRepository: NotificationRepository) {
    this.getMinesUseCase = new GetMinesUseCase(notificationRepository);
    this.readUseCase = new ReadUseCase(notificationRepository);
    this.createUseCase = new CreateUseCase(notificationRepository)
  }

  async getMines(userId: string) {
    return await this.getMinesUseCase.execute(userId);
  }

  async read(id: NotificationId) {
    return await this.readUseCase.execute(id);
  }

  async create(form: NotificationToSave) {
    return await this.createUseCase.execute(form);
  }

}

import { NotificationRepository } from "@/domains/notification/repository/NotificationRepository";
import { NotificationToSave } from "domains/contract/types";

export class CreateUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(form: NotificationToSave): Promise<void> {
    await this.notificationRepository.create(form);
  }
}

import { NotificationRepository } from "@/domains/notification/repository/NotificationRepository";

export class ReadUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(id: string): Promise<void> {
    await this.notificationRepository.accept(id);
  }
}

import {NotificationRepository} from "@/domains/notification/repository/NotificationRepository";
import {NotificationView} from "../../notification/NotificationView";

export class GetMinesUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {
  }

  async execute(userId: string): Promise<NotificationView[]> {
    const owners = await this.notificationRepository.getMines(userId);

    return owners.map(NotificationView.fromDomain);
  }
}

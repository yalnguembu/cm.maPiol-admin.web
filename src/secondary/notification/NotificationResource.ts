import {Notification} from "@/domains/notification";
import {ApiNotification, NotificationFetched} from "./ApiNotification";
import {NotificationRepository} from "@/domains/notification/repository/NotificationRepository";
import {NotificationToSave} from "@/domains/notification/types";
import {FirebaseClient} from "@/secondary/FirebaseClient";

export class NotificationResource implements NotificationRepository {
  constructor(private readonly firebaseClient: FirebaseClient) {
  }

  async getMines(
    userId: string
  ): Promise<Notification[]> {
    const apiNotifications = this.firebaseClient.getDataByCondition<NotificationFetched[]>({
      collection: "Notifications",
      field: "notifiableId",
      operator: "==",
      value: userId,
    });
    return apiNotifications.map(ApiNotification.toDomain);
  }

  async create(form: NotificationToSave): Promise<string> {
    return await this.firebaseClient.addDocument({
      collection: "Notifications",
      form: ApiNotification.fromProperties({...form}),
    });
  }

  async read(notificationId: string): Promise<void> {
    await this.firebaseClient.updateDocument({
      collection: "Notifications",
      documentName: notificationId,
      form: {
        ouvert: true
      },
    });
  }
}

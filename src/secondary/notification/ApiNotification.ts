import {Notification} from "@/domains/notification";
import {NotificationProperties} from "@/domains/notification/types";

export type NotificationFetched = {
  createdAt: string,
  deleted_at: string,
  notifiableId: string,
  notifiableType: string,
  read_at: string,
  statut: number,
  type: number,
  updated_at: string,
  datas: {
    details?: string,
    icon?: string,
    titre?: string,
  }
};

export class ApiNotification {
  static toDomain(apiNotification: NotificationFetched): Notification {
    return Notification.fromProperties({
      createdAt: apiNotification.createdAt ?? "",
      deletedAt: apiNotification.deleted_at ?? "",
      notifiableId: apiNotification.notifiableId ?? "",
      notifiableType: apiNotification.notifiableType ?? "",
      readAt: apiNotification.read_at ?? "",
      status: apiNotification.statut ?? 1,
      type: apiNotification.type ?? 1,
      updatedAt: apiNotification.updated_at ?? "",
      data: {
        details: apiNotification.datas.details ?? "",
        icon: apiNotification.datas.icon ?? "",
        title: apiNotification.datas.titre ?? "",
      }
    });
  }

  static fromProperties(
    notification: NotificationProperties
  ): Omit<NotificationFetched, "id"> {
    return {
      createdAt: notification.createdAt,
      deleted_at: notification.deletedAt,
      notifiableId: notification.notifiableId,
      notifiableType: notification.notifiableType,
      read_at: notification.readAt,
      statut: notification.status,
      type: notification.type,
      updated_at: notification.updatedAt,
      datas: {
        details: notification.data.details,
        icon: notification.data.icon,
        titre: notification.data.title,
      }
    };
  }
}
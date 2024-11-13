import {Notification} from "@/domains/notification";
import {
  NotifiableType,
  NotificationDetails,
  NotificationIcon,
  NotificationStatus, NotificationTitle,
  NotificationType
} from "@/domains/notification/enum";

export class NotificationView {
  private constructor(
    readonly createdAt: string,
    readonly deletedAt: string,
    readonly notifiableId: string,
    readonly notifiableType: NotifiableType,
    readonly readAt: string,
    readonly status: NotificationStatus,
    readonly type: NotificationType,
    readonly updatedAt: string,
    readonly data: {
      details?: NotificationDetails,
      icon?: NotificationIcon,
      title?: NotificationTitle,
    }
  ) {
  }

  static fromDomain(properties: Notification) {
    const {
      createdAt,
      deletedAt,
      notifiableId,
      notifiableType,
      readAt,
      status,
      type,
      updatedAt,
      data,
    } = properties.properties;
    return new NotificationView(
      createdAt,
      deletedAt,
      notifiableId,
      notifiableType,
      readAt,
      status,
      type,
      updatedAt,
      data,
    );
  }
}

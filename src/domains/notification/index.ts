import {NotificationProperties} from "./types";
import {
  NotifiableType,
  NotificationDetails,
  NotificationIcon,
  NotificationStatus,
  NotificationTitle,
  NotificationType
} from "@/domains/notification/enum";

export class Notification {
  private constructor(
    private readonly createdAt: string,
    private readonly deletedAt: string,
    private readonly notifiableId: string,
    private readonly notifiableType: NotifiableType,
    private readonly readAt: string,
    private readonly status: NotificationStatus,
    private readonly type: NotificationType,
    private readonly updatedAt: string,
    private readonly data: {
      details?: NotificationDetails,
      icon?: NotificationIcon,
      title?: NotificationTitle,
    }
  ) {
  }

  static fromProperties(properties: NotificationProperties) {
    const {
      createdAt = "",
      deletedAt = "",
      notifiableId = "",
      notifiableType = "",
      readAt = "",
      status = 1,
      type = 1,
      updatedAt = "",
      data = null
    } = properties;

    return new Notification(
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

  get properties()
    :
    NotificationProperties {
    return {
      createdAt: this.createdAt,
      deletedAt: this.deletedAt,
      notifiableId: this.notifiableId,
      notifiableType: this.notifiableType,
      readAt: this.readAt,
      status: this.status,
      type: this.type,
      updatedAt: this.updatedAt,
      data: this.data,
    };
  }
}

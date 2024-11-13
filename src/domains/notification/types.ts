import {
  NotifiableType,
  NotificationDetails,
  NotificationIcon,
  NotificationStatus,
  NotificationTitle,
  NotificationType
} from "@/domains/notification/enum";

export type NotificationId = string;

export type NotificationProperties = {
  id?: string,
  createdAt: string;
  deletedAt: string;
  notifiableId: string;
  notifiableType: NotifiableType;
  readAt: string;
  status: NotificationStatus;
  type: NotificationType;
  updatedAt: string;
  data: {
    details?: NotificationDetails;
    icon?: NotificationIcon;
    title?: NotificationTitle;
  }
}

export type NotificationToSave = Omit<NotificationProperties, "id">
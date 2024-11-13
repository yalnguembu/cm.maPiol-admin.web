import {Notification} from "../../notification";
import {NotificationToSave} from "../../notification/types";

export interface NotificationRepository {
  create(form: NotificationToSave): Promise<string>;

  getMines(notificationId: string): Promise<string>;

  read(notificationId: string): Promise<void>;
}

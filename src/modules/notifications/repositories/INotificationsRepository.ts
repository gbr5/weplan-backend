import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

export default interface INotifications {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}

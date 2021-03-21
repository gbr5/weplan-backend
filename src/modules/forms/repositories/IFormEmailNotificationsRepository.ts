import FormEmailNotification from '@modules/forms/infra/typeorm/entities/FormEmailNotification';
import ICreateFormEmailNotificationDTO from '@modules/forms/dtos/ICreateFormEmailNotificationDTO';

export default interface IFormEmailNotificationsRepository {
  create(data: ICreateFormEmailNotificationDTO): Promise<FormEmailNotification>;
  findById(id: string): Promise<FormEmailNotification | undefined>;
  findByFormId(form_id: string): Promise<FormEmailNotification[]>;
  save(form: FormEmailNotification): Promise<FormEmailNotification>;
  delete(form_id: string): Promise<void>;
}

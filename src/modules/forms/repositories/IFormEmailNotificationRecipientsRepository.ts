import FormEmailNotificationRecipient from '@modules/forms/infra/typeorm/entities/FormEmailNotificationRecipient';
import ICreateFormEmailNotificationRecipientDTO from '@modules/forms/dtos/ICreateFormEmailNotificationRecipientDTO';

export default interface IFormEmailNotificationRecipientsRepository {
  create(
    data: ICreateFormEmailNotificationRecipientDTO,
  ): Promise<FormEmailNotificationRecipient>;
  findById(id: string): Promise<FormEmailNotificationRecipient | undefined>;
  findByEmailNotificationId(
    email_notification_id: string,
  ): Promise<FormEmailNotificationRecipient[]>;
  save(
    form: FormEmailNotificationRecipient,
  ): Promise<FormEmailNotificationRecipient>;
  delete(id: string): Promise<void>;
}

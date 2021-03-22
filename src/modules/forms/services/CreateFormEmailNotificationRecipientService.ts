import { injectable, inject } from 'tsyringe';

import FormEmailNotificationRecipient from '@modules/forms/infra/typeorm/entities/FormEmailNotificationRecipient';
import IFormEmailNotificationRecipientsRepository from '@modules/forms/repositories/IFormEmailNotificationRecipientsRepository';
import AppError from '@shared/errors/AppError';
import ICreateFormEmailNotificationRecipientDTO from '../dtos/ICreateFormEmailNotificationRecipientDTO';
import IFormEmailNotificationsRepository from '../repositories/IFormEmailNotificationsRepository';

@injectable()
class CreateFormEmailNotificationRecipientService {
  constructor(
    @inject('FormEmailNotificationRecipientsRepository')
    private formEmailNotificationRecipientsRepository: IFormEmailNotificationRecipientsRepository,

    @inject('FormEmailNotificationsRepository')
    private formEmailNotificationsRepository: IFormEmailNotificationsRepository,
  ) {}

  public async execute({
    email_notification_id,
    sending_type,
    email,
  }: ICreateFormEmailNotificationRecipientDTO): Promise<
    FormEmailNotificationRecipient
  > {
    const formEmailNotification = await this.formEmailNotificationsRepository.findById(
      email_notification_id,
    );

    if (!formEmailNotification) {
      throw new AppError('Form email notification not found.');
    }

    const findEmailAlreadyRegistered = formEmailNotification.recipients.find(
      notification => notification.email === email,
    );

    if (findEmailAlreadyRegistered) {
      throw new AppError(
        'This email is already registered for this notification.',
      );
    }

    const newEmailNotificationRecipient = await this.formEmailNotificationRecipientsRepository.create(
      {
        email_notification_id,
        sending_type,
        email,
      },
    );

    return newEmailNotificationRecipient;
  }
}

export default CreateFormEmailNotificationRecipientService;

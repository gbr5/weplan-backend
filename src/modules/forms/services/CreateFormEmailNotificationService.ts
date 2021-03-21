import { injectable, inject } from 'tsyringe';

import FormEmailNotification from '@modules/forms/infra/typeorm/entities/FormEmailNotification';
import IFormEmailNotificationsRepository from '@modules/forms/repositories/IFormEmailNotificationsRepository';
import AppError from '@shared/errors/AppError';
import ICreateFormEmailNotificationDTO from '../dtos/ICreateFormEmailNotificationDTO';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

@injectable()
class CreateFormEmailNotificationService {
  constructor(
    @inject('FormEmailNotificationsRepository')
    private formEmailNotificationsRepository: IFormEmailNotificationsRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute({
    form_id,
    notification_type,
    subject,
    message,
  }: ICreateFormEmailNotificationDTO): Promise<FormEmailNotification> {
    const form = await this.userFormsRepository.findById(form_id);

    if (!form) {
      throw new AppError('Form not found.');
    }

    const findThisTypeNotification = form.emailNotifications.find(
      email => email.notification_type === notification_type,
    );

    if (findThisTypeNotification) {
      throw new AppError(
        'This form already have an email notification for this type of notification.',
      );
    }

    const newEmailNotification = await this.formEmailNotificationsRepository.create(
      {
        form_id,
        notification_type,
        subject,
        message,
      },
    );

    return newEmailNotification;
  }
}

export default CreateFormEmailNotificationService;

import { injectable, inject } from 'tsyringe';

import FormEmailNotification from '@modules/forms/infra/typeorm/entities/FormEmailNotification';
import IFormEmailNotificationsRepository from '@modules/forms/repositories/IFormEmailNotificationsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  subject: string;
  message: string;
}

@injectable()
class UpdateFormEmailNotificationService {
  constructor(
    @inject('FormEmailNotificationsRepository')
    private formEmailNotificationsRepository: IFormEmailNotificationsRepository,
  ) {}

  public async execute({
    id,
    subject,
    message,
  }: IRequest): Promise<FormEmailNotification> {
    const formEmailNotification = await this.formEmailNotificationsRepository.findById(
      id,
    );

    if (!formEmailNotification) {
      throw new AppError('Form email notification not found.');
    }
    formEmailNotification.subject = subject;
    formEmailNotification.message = message;

    const updatedForm = await this.formEmailNotificationsRepository.save(
      formEmailNotification,
    );

    return updatedForm;
  }
}

export default UpdateFormEmailNotificationService;

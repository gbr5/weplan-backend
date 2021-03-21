import { injectable, inject } from 'tsyringe';

import IFormEmailNotificationsRepository from '@modules/forms/repositories/IFormEmailNotificationsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteFormEmailNotificationService {
  constructor(
    @inject('FormEmailNotificationsRepository')
    private formEmailNotificationsRepository: IFormEmailNotificationsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const formEmailNotification = await this.formEmailNotificationsRepository.findById(
      id,
    );

    if (!formEmailNotification) {
      throw new AppError('Contact page not found.');
    }

    await this.formEmailNotificationsRepository.delete(id);
  }
}

export default DeleteFormEmailNotificationService;

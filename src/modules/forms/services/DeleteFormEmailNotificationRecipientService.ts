import { injectable, inject } from 'tsyringe';

import IFormEmailNotificationRecipientsRepository from '@modules/forms/repositories/IFormEmailNotificationRecipientsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteFormEmailNotificationRecipientService {
  constructor(
    @inject('FormEmailNotificationRecipientsRepository')
    private formEmailNotificationRecipientsRepository: IFormEmailNotificationRecipientsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const formEmailNotificationRecipient = await this.formEmailNotificationRecipientsRepository.findById(
      id,
    );

    if (!formEmailNotificationRecipient) {
      throw new AppError('Email recipient not found.');
    }

    await this.formEmailNotificationRecipientsRepository.delete(id);
  }
}

export default DeleteFormEmailNotificationRecipientService;

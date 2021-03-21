import { injectable, inject } from 'tsyringe';

import FormEmailNotificationRecipient from '@modules/forms/infra/typeorm/entities/FormEmailNotificationRecipient';
import IFormEmailNotificationRecipientsRepository from '@modules/forms/repositories/IFormEmailNotificationRecipientsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  sending_type: string;
  email: string;
}

@injectable()
class UpdateFormEmailNotificationRecipientService {
  constructor(
    @inject('FormEmailNotificationRecipientsRepository')
    private formEmailNotificationRecipientsRepository: IFormEmailNotificationRecipientsRepository,
  ) {}

  public async execute({
    id,
    sending_type,
    email,
  }: IRequest): Promise<FormEmailNotificationRecipient> {
    const formEmailNotificationRecipient = await this.formEmailNotificationRecipientsRepository.findById(
      id,
    );

    if (!formEmailNotificationRecipient) {
      throw new AppError('Form email notification recipient not found.');
    }
    formEmailNotificationRecipient.sending_type = sending_type;
    formEmailNotificationRecipient.email = email;

    const updatedForm = await this.formEmailNotificationRecipientsRepository.save(
      formEmailNotificationRecipient,
    );

    return updatedForm;
  }
}

export default UpdateFormEmailNotificationRecipientService;

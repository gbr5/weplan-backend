import { getRepository, Repository } from 'typeorm';
import IFormEmailNotificationRecipientsRepository from '@modules/forms/repositories/IFormEmailNotificationRecipientsRepository';
import ICreateFormEmailNotificationRecipientDTO from '@modules/forms/dtos/ICreateFormEmailNotificationRecipientDTO';
import FormEmailNotificationRecipient from '../entities/FormEmailNotificationRecipient';

class FormEmailNotificationRecipientsRepository
  implements IFormEmailNotificationRecipientsRepository {
  private ormRepository: Repository<FormEmailNotificationRecipient>;

  constructor() {
    this.ormRepository = getRepository(FormEmailNotificationRecipient);
  }

  public async findById(
    id: string,
  ): Promise<FormEmailNotificationRecipient | undefined> {
    const findFormEmailNotificationRecipient = await this.ormRepository.findOne(
      id,
    );

    return findFormEmailNotificationRecipient;
  }

  public async findByEmailNotificationId(
    email_notification_id: string,
  ): Promise<FormEmailNotificationRecipient[]> {
    const findFormEmailNotificationRecipient = await this.ormRepository.find({
      where: { email_notification_id },
    });

    return findFormEmailNotificationRecipient;
  }

  public async create(
    data: ICreateFormEmailNotificationRecipientDTO,
  ): Promise<FormEmailNotificationRecipient> {
    const form = this.ormRepository.create(data);

    await this.ormRepository.save(form);

    return form;
  }

  public async save(
    form: FormEmailNotificationRecipient,
  ): Promise<FormEmailNotificationRecipient> {
    return this.ormRepository.save(form);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FormEmailNotificationRecipientsRepository;

import { getRepository, Repository } from 'typeorm';
import IFormEmailNotificationsRepository from '@modules/forms/repositories/IFormEmailNotificationsRepository';
import ICreateFormEmailNotificationDTO from '@modules/forms/dtos/ICreateFormEmailNotificationDTO';
import FormEmailNotification from '../entities/FormEmailNotification';

class FormEmailNotificationsRepository
  implements IFormEmailNotificationsRepository {
  private ormRepository: Repository<FormEmailNotification>;

  constructor() {
    this.ormRepository = getRepository(FormEmailNotification);
  }

  public async findById(
    id: string,
  ): Promise<FormEmailNotification | undefined> {
    const findFormEmailNotification = await this.ormRepository.findOne(id);

    return findFormEmailNotification;
  }

  public async findByFormId(form_id: string): Promise<FormEmailNotification[]> {
    const findFormEmailNotification = await this.ormRepository.find({
      where: { form_id },
    });

    return findFormEmailNotification;
  }

  public async create(
    data: ICreateFormEmailNotificationDTO,
  ): Promise<FormEmailNotification> {
    const form = this.ormRepository.create(data);

    await this.ormRepository.save(form);

    return form;
  }

  public async save(
    form: FormEmailNotification,
  ): Promise<FormEmailNotification> {
    return this.ormRepository.save(form);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FormEmailNotificationsRepository;

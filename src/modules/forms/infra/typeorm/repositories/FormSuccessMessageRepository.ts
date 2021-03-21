import { getRepository, Repository } from 'typeorm';
import IFormSuccessMessageRepository from '@modules/forms/repositories/IFormSuccessMessageRepository';
import ICreateFormSuccessMessageDTO from '@modules/forms/dtos/ICreateFormSuccessMessageDTO';
import FormSuccessMessage from '../entities/FormSuccessMessage';

class FormSuccessMessageRepository implements IFormSuccessMessageRepository {
  private ormRepository: Repository<FormSuccessMessage>;

  constructor() {
    this.ormRepository = getRepository(FormSuccessMessage);
  }

  public async findById(id: string): Promise<FormSuccessMessage | undefined> {
    const findFormSuccessMessage = await this.ormRepository.findOne(id);

    return findFormSuccessMessage;
  }

  public async findByFormId(
    form_id: string,
  ): Promise<FormSuccessMessage | undefined> {
    const findFormSuccessMessage = await this.ormRepository.findOne({
      where: { form_id },
    });

    return findFormSuccessMessage;
  }

  public async create(
    data: ICreateFormSuccessMessageDTO,
  ): Promise<FormSuccessMessage> {
    const form = this.ormRepository.create(data);

    await this.ormRepository.save(form);

    return form;
  }

  public async save(form: FormSuccessMessage): Promise<FormSuccessMessage> {
    return this.ormRepository.save(form);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FormSuccessMessageRepository;

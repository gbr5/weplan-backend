import { getRepository, Repository } from 'typeorm';
import IFormStylesRepository from '@modules/forms/repositories/IFormStylesRepository';
import ICreateFormStylesDTO from '@modules/forms/dtos/ICreateFormStylesDTO';
import FormStyles from '../entities/FormStyles';

class FormStylesRepository implements IFormStylesRepository {
  private ormRepository: Repository<FormStyles>;

  constructor() {
    this.ormRepository = getRepository(FormStyles);
  }

  public async findById(id: string): Promise<FormStyles | undefined> {
    const findFormStyles = await this.ormRepository.findOne(id);

    return findFormStyles;
  }

  public async findByFormId(form_id: string): Promise<FormStyles | undefined> {
    const findFormStyles = await this.ormRepository.findOne({
      where: { form_id },
    });

    return findFormStyles;
  }

  public async create(data: ICreateFormStylesDTO): Promise<FormStyles> {
    const form = this.ormRepository.create(data);

    await this.ormRepository.save(form);

    return form;
  }

  public async save(form: FormStyles): Promise<FormStyles> {
    return this.ormRepository.save(form);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FormStylesRepository;

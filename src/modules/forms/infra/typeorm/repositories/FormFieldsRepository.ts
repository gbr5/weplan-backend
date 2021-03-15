import { getRepository, Repository } from 'typeorm';
import IFormFieldsRepository from '@modules/forms/repositories/IFormFieldsRepository';
import ICreateFormFieldDTO from '@modules/forms/dtos/ICreateFormFieldDTO';
import IFindByFormIdAndPositionDTO from '@modules/forms/dtos/IFindByFormIdAndPositionDTO';
import IFindByFormIdAndNameDTO from '@modules/forms/dtos/IFindByFormIdAndNameDTO';
import FormField from '../entities/FormField';

class FormFieldsRepository implements IFormFieldsRepository {
  private ormRepository: Repository<FormField>;

  constructor() {
    this.ormRepository = getRepository(FormField);
  }

  public async findById(id: string): Promise<FormField | undefined> {
    const findFormField = await this.ormRepository.findOne(id);

    return findFormField;
  }

  public async findByFormIdAndPosition({
    form_id,
    position,
  }: IFindByFormIdAndPositionDTO): Promise<FormField | undefined> {
    const findFormField = await this.ormRepository.findOne({
      where: { form_id, position },
    });

    return findFormField;
  }

  public async findByFormIdAndName({
    form_id,
    name,
  }: IFindByFormIdAndNameDTO): Promise<FormField | undefined> {
    const findFormField = await this.ormRepository.findOne({
      where: { form_id, name },
    });

    return findFormField;
  }

  public async findByFormId(form_id: string): Promise<FormField[]> {
    const findFormField = await this.ormRepository.find({
      where: { form_id },
    });

    return findFormField;
  }

  public async create(data: ICreateFormFieldDTO): Promise<FormField> {
    const form = this.ormRepository.create(data);

    await this.ormRepository.save(form);

    return form;
  }

  public async save(form: FormField): Promise<FormField> {
    return this.ormRepository.save(form);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FormFieldsRepository;

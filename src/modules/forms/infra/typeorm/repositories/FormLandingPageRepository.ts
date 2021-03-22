import { getRepository, Repository } from 'typeorm';
import IFormLandingPageRepository from '@modules/forms/repositories/IFormLandingPageRepository';
import ICreateFormLandingPageDTO from '@modules/forms/dtos/ICreateFormLandingPageDTO';
import FormLandingPage from '../entities/FormLandingPage';

class FormLandingPageRepository implements IFormLandingPageRepository {
  private ormRepository: Repository<FormLandingPage>;

  constructor() {
    this.ormRepository = getRepository(FormLandingPage);
  }

  public async findById(id: string): Promise<FormLandingPage | undefined> {
    const findFormLandingPage = await this.ormRepository.findOne(id);

    return findFormLandingPage;
  }

  public async findByFormId(
    form_id: string,
  ): Promise<FormLandingPage | undefined> {
    const findFormLandingPage = await this.ormRepository.findOne({
      where: { form_id },
    });

    return findFormLandingPage;
  }

  public async create(
    data: ICreateFormLandingPageDTO,
  ): Promise<FormLandingPage> {
    const form = this.ormRepository.create(data);

    await this.ormRepository.save(form);

    return form;
  }

  public async save(form: FormLandingPage): Promise<FormLandingPage> {
    return this.ormRepository.save(form);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FormLandingPageRepository;

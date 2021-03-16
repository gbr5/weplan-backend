import { getRepository, Repository } from 'typeorm';
import IContactPageFormsRepository from '@modules/contactPages/repositories/IContactPageFormsRepository';
import ICreateContactPageFormDTO from '@modules/contactPages/dtos/ICreateContactPageFormDTO';
import ContactPageForm from '../entities/ContactPageForm';

class ContactPageFormsRepository implements IContactPageFormsRepository {
  private ormRepository: Repository<ContactPageForm>;

  constructor() {
    this.ormRepository = getRepository(ContactPageForm);
  }

  public async findById(id: string): Promise<ContactPageForm | undefined> {
    const findContactPageForm = await this.ormRepository.findOne(id);

    return findContactPageForm;
  }

  public async findByContactPageId(
    contact_page_id: string,
  ): Promise<ContactPageForm[]> {
    const findContactPageForm = await this.ormRepository.find({
      where: { contact_page_id },
    });

    return findContactPageForm;
  }

  public async create(
    data: ICreateContactPageFormDTO,
  ): Promise<ContactPageForm> {
    const contactPage = this.ormRepository.create(data);

    await this.ormRepository.save(contactPage);

    return contactPage;
  }

  public async save(contactPage: ContactPageForm): Promise<ContactPageForm> {
    return this.ormRepository.save(contactPage);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ContactPageFormsRepository;

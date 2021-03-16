import { getRepository, Repository } from 'typeorm';
import IContactPageSEORepository from '@modules/contactPages/repositories/IContactPageSEORepository';
import ICreateContactPageSEO from '@modules/contactPages/dtos/ICreateContactPageSEO';
import ContactPageSEO from '../entities/ContactPageSEO';

class ContactPageSEORepository implements IContactPageSEORepository {
  private ormRepository: Repository<ContactPageSEO>;

  constructor() {
    this.ormRepository = getRepository(ContactPageSEO);
  }

  public async findById(id: string): Promise<ContactPageSEO | undefined> {
    const findContactPageSEO = await this.ormRepository.findOne(id);

    return findContactPageSEO;
  }

  public async create(data: ICreateContactPageSEO): Promise<ContactPageSEO> {
    const seo = this.ormRepository.create(data);

    await this.ormRepository.save(seo);

    return seo;
  }

  public async save(seo: ContactPageSEO): Promise<ContactPageSEO> {
    return this.ormRepository.save(seo);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ContactPageSEORepository;

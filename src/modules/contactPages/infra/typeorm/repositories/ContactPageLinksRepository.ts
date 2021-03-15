import { getRepository, Repository } from 'typeorm';
import IContactPageLinksRepository from '@modules/contactPages/repositories/IContactPageLinksRepository';
import ICreateContactPageLinkDTO from '@modules/contactPages/dtos/ICreateContactPageLinkDTO';
import ContactPageLink from '../entities/ContactPageLink';

class ContactPageLinksRepository implements IContactPageLinksRepository {
  private ormRepository: Repository<ContactPageLink>;

  constructor() {
    this.ormRepository = getRepository(ContactPageLink);
  }

  public async findById(id: string): Promise<ContactPageLink | undefined> {
    const findContactPageLink = await this.ormRepository.findOne(id);

    return findContactPageLink;
  }

  public async findByContactPageId(
    contact_page_id: string,
  ): Promise<ContactPageLink[]> {
    const findContactPageLink = await this.ormRepository.find({
      where: { contact_page_id },
    });

    return findContactPageLink;
  }

  public async create(
    data: ICreateContactPageLinkDTO,
  ): Promise<ContactPageLink> {
    const contactPage = this.ormRepository.create(data);

    await this.ormRepository.save(contactPage);

    return contactPage;
  }

  public async save(contactPage: ContactPageLink): Promise<ContactPageLink> {
    return this.ormRepository.save(contactPage);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ContactPageLinksRepository;

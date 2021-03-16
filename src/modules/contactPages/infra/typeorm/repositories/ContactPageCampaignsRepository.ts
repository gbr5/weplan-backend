import { getRepository, Repository } from 'typeorm';
import IContactPageCampaignsRepository from '@modules/contactPages/repositories/IContactPageCampaignsRepository';
import ICreateContactPageCampaignDTO from '@modules/contactPages/dtos/ICreateContactPageCampaignDTO';
import ContactPageCampaign from '../entities/ContactPageCampaign';

class ContactPageCampaignsRepository
  implements IContactPageCampaignsRepository {
  private ormRepository: Repository<ContactPageCampaign>;

  constructor() {
    this.ormRepository = getRepository(ContactPageCampaign);
  }

  public async findById(id: string): Promise<ContactPageCampaign | undefined> {
    const findContactPageCampaign = await this.ormRepository.findOne(id);

    return findContactPageCampaign;
  }

  public async findByContactPageId(
    contact_page_id: string,
  ): Promise<ContactPageCampaign[]> {
    const findContactPageCampaign = await this.ormRepository.find({
      where: { contact_page_id },
    });

    return findContactPageCampaign;
  }

  public async create(
    data: ICreateContactPageCampaignDTO,
  ): Promise<ContactPageCampaign> {
    const contactPage = this.ormRepository.create(data);

    await this.ormRepository.save(contactPage);

    return contactPage;
  }

  public async save(
    contactPage: ContactPageCampaign,
  ): Promise<ContactPageCampaign> {
    return this.ormRepository.save(contactPage);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ContactPageCampaignsRepository;

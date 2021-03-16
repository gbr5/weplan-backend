import ContactPageCampaign from '@modules/contactPages/infra/typeorm/entities/ContactPageCampaign';
import ICreateContactPageCampaignDTO from '@modules/contactPages/dtos/ICreateContactPageCampaignDTO';

export default interface IContactPageCampaignsRepository {
  create(data: ICreateContactPageCampaignDTO): Promise<ContactPageCampaign>;
  findById(id: string): Promise<ContactPageCampaign | undefined>;
  findByContactPageId(contact_page_id: string): Promise<ContactPageCampaign[]>;
  save(contactPage: ContactPageCampaign): Promise<ContactPageCampaign>;
  delete(id: string): Promise<void>;
}

import ContactPageLink from '@modules/contactPages/infra/typeorm/entities/ContactPageLink';
import ICreateContactPageLinkDTO from '@modules/contactPages/dtos/ICreateContactPageLinkDTO';

export default interface IContactPageLinksRepository {
  create(data: ICreateContactPageLinkDTO): Promise<ContactPageLink>;
  findById(id: string): Promise<ContactPageLink | undefined>;
  findByContactPageId(contact_page_id: string): Promise<ContactPageLink[]>;
  save(contactPage: ContactPageLink): Promise<ContactPageLink>;
  delete(id: string): Promise<void>;
}

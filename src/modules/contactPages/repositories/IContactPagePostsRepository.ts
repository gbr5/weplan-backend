import ContactPagePost from '@modules/contactPages/infra/typeorm/entities/ContactPagePost';
import ICreateContactPagePostDTO from '@modules/contactPages/dtos/ICreateContactPagePostDTO';

export default interface IContactPagePostsRepository {
  create(data: ICreateContactPagePostDTO): Promise<ContactPagePost>;
  findById(id: string): Promise<ContactPagePost | undefined>;
  findByContactPageId(contact_page_id: string): Promise<ContactPagePost[]>;
  save(contactPage: ContactPagePost): Promise<ContactPagePost>;
  delete(id: string): Promise<void>;
}

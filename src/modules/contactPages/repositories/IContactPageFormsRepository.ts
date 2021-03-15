import ContactPageForm from '@modules/contactPages/infra/typeorm/entities/ContactPageForm';
import ICreateContactPageFormDTO from '@modules/contactPages/dtos/ICreateContactPageFormDTO';

export default interface IContactPageFormsRepository {
  create(data: ICreateContactPageFormDTO): Promise<ContactPageForm>;
  findById(id: string): Promise<ContactPageForm | undefined>;
  findByContactPageId(contact_page_id: string): Promise<ContactPageForm[]>;
  save(contactPage: ContactPageForm): Promise<ContactPageForm>;
  delete(id: string): Promise<void>;
}

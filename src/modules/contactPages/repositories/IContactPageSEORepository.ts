import ContactPageSEO from '@modules/contactPages/infra/typeorm/entities/ContactPageSEO';
import ICreateContactPageSEODTO from '@modules/contactPages/dtos/ICreateContactPageSEO';

export default interface IContactPageSEOsRepository {
  create(data: ICreateContactPageSEODTO): Promise<ContactPageSEO>;
  findById(id: string): Promise<ContactPageSEO | undefined>;
  save(contactPage: ContactPageSEO): Promise<ContactPageSEO>;
  delete(id: string): Promise<void>;
}

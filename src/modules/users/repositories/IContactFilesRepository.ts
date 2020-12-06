import ContactFile from '@modules/users/infra/typeorm/entities/ContactFile';
import ICreateContactFileDTO from '@modules/users/dtos/ICreateContactFileDTO';

export default interface IContactFilesRepository {
  create(data: ICreateContactFileDTO): Promise<ContactFile>;
  findByContactId(contact_id: string): Promise<ContactFile[]>;
  findById(id: string): Promise<ContactFile | undefined>;
  save(data: ContactFile): Promise<ContactFile>;
  delete(data: ContactFile): Promise<void>;
}

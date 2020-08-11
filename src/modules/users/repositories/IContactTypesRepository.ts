import ContactType from '@modules/users/infra/typeorm/entities/ContactType';
import ICreateContactTypeDTO from '@modules/users/dtos/ICreateContactTypeDTO';

export default interface IContactTypeRepository {
  findByName(name: string): Promise<ContactType | undefined>;
  findAll(): Promise<ContactType[]>;
  create(data: ICreateContactTypeDTO): Promise<ContactType>;
  save(contactType: ContactType): Promise<ContactType>;
  delete(contactType: ContactType): Promise<void>;
}

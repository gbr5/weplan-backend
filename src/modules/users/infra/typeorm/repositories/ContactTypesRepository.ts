import { getRepository, Repository } from 'typeorm';

import IContactTypesRepository from '@modules/users/repositories/IContactTypesRepository';
import ICreateContactTypeDTO from '@modules/users/dtos/ICreateContactTypeDTO';

import ContactType from '@modules/users/infra/typeorm/entities/ContactType';

class ContactTypesRepository implements IContactTypesRepository {
  private ormRepository: Repository<ContactType>;

  constructor() {
    this.ormRepository = getRepository(ContactType);
  }

  public async findAll(): Promise<ContactType[]> {
    const contactTypes = await this.ormRepository.find();

    return contactTypes;
  }

  public async findByName(name: string): Promise<ContactType | undefined> {
    const contactType = await this.ormRepository.findOne({
      where: { name },
    });

    return contactType;
  }

  public async create(data: ICreateContactTypeDTO): Promise<ContactType> {
    const contactType = this.ormRepository.create(data);

    await this.ormRepository.save(contactType);

    return contactType;
  }

  public async save(contactType: ContactType): Promise<ContactType> {
    return this.ormRepository.save(contactType);
  }

  public async delete({ name }: ContactType): Promise<void> {
    await this.ormRepository.delete({ name });
  }
}

export default ContactTypesRepository;

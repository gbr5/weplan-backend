import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ContactType from '@modules/users/infra/typeorm/entities/ContactType';
import IContactTypesRepository from '@modules/users/repositories/IContactTypesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListContactTypesService {
  constructor(
    @inject('ContactTypesRepository')
    private contactTypesRepository: IContactTypesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(): Promise<ContactType[]> {
    const ContactTypes = await this.contactTypesRepository.findAll();

    return ContactTypes;
  }
}

export default ListContactTypesService;

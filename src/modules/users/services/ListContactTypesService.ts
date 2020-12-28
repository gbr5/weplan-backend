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
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<ContactType[]> {
    const cacheKey = `contact-types`;

    let contactTypes = await this.cacheProvider.recover<ContactType[]>(
      cacheKey,
    );

    if (!contactTypes) {
      contactTypes = await this.contactTypesRepository.findAll();

      await this.cacheProvider.save(cacheKey, contactTypes);
    }

    return contactTypes;
  }
}

export default ListContactTypesService;

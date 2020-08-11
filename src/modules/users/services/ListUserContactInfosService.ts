import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import UserContactInfo from '@modules/users/infra/typeorm/entities/UserContactInfo';
import IUserContactInfosRepository from '@modules/users/repositories/IUserContactInfosRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserContactInfosService {
  constructor(
    @inject('UserContactInfosRepository')
    private contactTypesRepository: IUserContactInfosRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<UserContactInfo[]> {
    const UserContactInfos = await this.contactTypesRepository.findByUserId(
      user_id,
    );

    return UserContactInfos;
  }
}

export default ListUserContactInfosService;

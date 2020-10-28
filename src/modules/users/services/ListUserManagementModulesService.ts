import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import UserManagementModule from '@modules/users/infra/typeorm/entities/UserManagementModule';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserManagementModulesService {
  constructor(
    @inject('UserManagementModulesRepository')
    private userManagementModulesRepository: IUserManagementModulesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<UserManagementModule[]> {
    const userManagementModule = await this.userManagementModulesRepository.findByUserId(
      user_id,
    );

    return userManagementModule;
  }
}

export default ListUserManagementModulesService;

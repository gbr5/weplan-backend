import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import UserManagementModule from '@modules/users/infra/typeorm/entities/UserManagementModule';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEmployeeManagementModulesService {
  constructor(
    @inject('UserManagementModulesRepository')
    private userManagementModulesRepository: IUserManagementModulesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(employee_id: string): Promise<UserManagementModule[]> {
    const employeeManagementModule = await this.userManagementModulesRepository.findByUserId(
      employee_id,
    );

    return employeeManagementModule;
  }
}

export default ListEmployeeManagementModulesService;

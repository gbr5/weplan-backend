import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import UserManagementModule from '@modules/users/infra/typeorm/entities/UserManagementModule';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';

interface IRequest {
  user_id: string;
  management_module: string;
  access_level: number;
}

@injectable()
class CreateUserManagementModule {
  constructor(
    @inject('UserManagementModulesRepository')
    private userMAnagementModules: IUserManagementModulesRepository,
  ) {}

  public async execute({
    user_id,
    management_module,
    access_level,
  }: IRequest): Promise<UserManagementModule> {
    try {
      const userManagementModule = await this.userMAnagementModules.create({
        user_id,
        management_module,
        access_level,
      });

      return userManagementModule;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateUserManagementModule;

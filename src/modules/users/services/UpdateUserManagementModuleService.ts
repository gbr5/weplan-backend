import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';

import UserManagementModule from '@modules/users/infra/typeorm/entities/UserManagementModule';

interface IRequest {
  id: string;
  access_level: number;
}

@injectable()
class UpdateUserManagementModuleService {
  constructor(
    @inject('UserManagementModulesRepository')
    private userManagementModulesRepository: IUserManagementModulesRepository,
  ) {}

  public async execute({
    id,
    access_level,
  }: IRequest): Promise<UserManagementModule> {
    const userManagementModule = await this.userManagementModulesRepository.findById(
      id,
    );

    if (!userManagementModule) {
      throw new AppError('UserManagementModule not found.');
    }
    userManagementModule.access_level = access_level;

    const updatedUserManagementModule = await this.userManagementModulesRepository.save(
      userManagementModule,
    );

    return updatedUserManagementModule;
  }
}

export default UpdateUserManagementModuleService;

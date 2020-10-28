import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';

@injectable()
class DeleteUserManagementModuleService {
  constructor(
    @inject('UserManagementModulesRepository')
    private userManagementModulesRepository: IUserManagementModulesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userManagementModule = await this.userManagementModulesRepository.findById(
      id,
    );

    if (!userManagementModule) {
      throw new AppError('No confirmation found.');
    }

    await this.userManagementModulesRepository.delete(userManagementModule);
  }
}

export default DeleteUserManagementModuleService;

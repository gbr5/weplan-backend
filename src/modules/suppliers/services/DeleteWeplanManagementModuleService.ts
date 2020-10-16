import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWeplanManagementModulesRepository from '@modules/suppliers/repositories/IWeplanManagementModulesRepository';

@injectable()
class DeleteWeplanManagementModuleService {
  constructor(
    @inject('WeplanManagementModulesRepository')
    private weplanManagementModulesRepository: IWeplanManagementModulesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventCardRelation = await this.weplanManagementModulesRepository.findById(
      id,
    );

    if (!eventCardRelation) {
      throw new AppError('Event card relation not found.');
    }

    await this.weplanManagementModulesRepository.delete(id);
  }
}

export default DeleteWeplanManagementModuleService;

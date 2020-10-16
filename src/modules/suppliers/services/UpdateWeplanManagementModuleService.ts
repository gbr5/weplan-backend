import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWeplanManagementModulesRepository from '@modules/suppliers/repositories/IWeplanManagementModulesRepository';

import WeplanManagementModule from '@modules/suppliers/infra/typeorm/entities/WeplanManagementModule';

interface IRequest {
  id: string;
  name: string;
}
@injectable()
class UpdateWeplanManagementModulesService {
  constructor(
    @inject('WeplanManagementModulesRepository')
    private weplanManagementModulesRepository: IWeplanManagementModulesRepository,
  ) {}

  public async execute({
    id,
    name,
  }: IRequest): Promise<WeplanManagementModule> {
    const module = await this.weplanManagementModulesRepository.findById(id);

    if (!module) {
      throw new AppError('WeplanManagementModules not found.');
    }
    const moduleName = await this.weplanManagementModulesRepository.findByName(
      name,
    );
    if (moduleName) {
      throw new AppError('Module already exists.');
    }

    module.name = name;

    const updatedWeplanManagementModule = await this.weplanManagementModulesRepository.save(
      module,
    );

    return updatedWeplanManagementModule;
  }
}

export default UpdateWeplanManagementModulesService;

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import WeplanManagementModule from '@modules/suppliers/infra/typeorm/entities/WeplanManagementModule';
import IWeplanManagementModulesRepository from '@modules/suppliers/repositories/IWeplanManagementModulesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserWeplanManagementModulesService {
  constructor(
    @inject('WeplanManagementModulesRepository')
    private weplanManagementModuleRepository: IWeplanManagementModulesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(): Promise<WeplanManagementModule[]> {
    const modules = await this.weplanManagementModuleRepository.findAll();

    return modules;
  }
}

export default ListUserWeplanManagementModulesService;

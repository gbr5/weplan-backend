import { getRepository, Repository } from 'typeorm';

import IWeplanManagementModulesRepository from '@modules/weplan/repositories/IWeplanManagementModulesRepository';
import ICreateWeplanManagementModuleDTO from '@modules/weplan/dtos/ICreateWeplanManagementModuleDTO';

import WeplanManagementModule from '@modules/weplan/infra/typeorm/entities/WeplanManagementModule';
import AppError from '@shared/errors/AppError';

interface IFindModules {
  id: string;
}

class WeplanManagementModulesRepository
  implements IWeplanManagementModulesRepository {
  private ormRepository: Repository<WeplanManagementModule>;

  constructor() {
    this.ormRepository = getRepository(WeplanManagementModule);
  }

  public async findById(
    id: string,
  ): Promise<WeplanManagementModule | undefined> {
    const findWeplanManagementModule = await this.ormRepository.findOne(id);

    return findWeplanManagementModule;
  }

  public async findAllById(
    modules: IFindModules[],
  ): Promise<WeplanManagementModule[]> {
    const findWeplanManagementModule = await this.ormRepository.findByIds(
      modules,
    );

    return findWeplanManagementModule;
  }

  public async findByName(
    name: string,
  ): Promise<WeplanManagementModule | undefined> {
    const findWeplanManagementModule = await this.ormRepository.findOne({
      where: { name },
    });

    return findWeplanManagementModule;
  }

  public async findAll(): Promise<WeplanManagementModule[]> {
    const findWeplanManagementModules = await this.ormRepository.find();

    return findWeplanManagementModules;
  }

  public async create(
    data: ICreateWeplanManagementModuleDTO,
  ): Promise<WeplanManagementModule> {
    const funnelType = this.ormRepository.create(data);

    await this.ormRepository.save(funnelType);

    return funnelType;
  }

  public async save(
    weplanManagementModule: WeplanManagementModule,
  ): Promise<WeplanManagementModule> {
    return this.ormRepository.save(weplanManagementModule);
  }

  public async delete(id: string): Promise<void> {
    const module = await this.findById(id);
    if (!module) {
      throw new AppError('Management module not found.');
    }
    await this.ormRepository.delete(module.id);
  }
}

export default WeplanManagementModulesRepository;

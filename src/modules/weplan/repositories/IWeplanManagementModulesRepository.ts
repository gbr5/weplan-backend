import WeplanManagementModule from '@modules/weplan/infra/typeorm/entities/WeplanManagementModule';
import ICreateWeplanManagementModuleDTO from '@modules/weplan/dtos/ICreateWeplanManagementModuleDTO';

interface IFindModules {
  id: string;
}

export default interface IWeplanManagementModulesRepository {
  create(
    data: ICreateWeplanManagementModuleDTO,
  ): Promise<WeplanManagementModule>;
  findById(id: string): Promise<WeplanManagementModule | undefined>;
  findAllById(modules: IFindModules[]): Promise<WeplanManagementModule[]>;
  findByName(name: string): Promise<WeplanManagementModule | undefined>;
  findAll(): Promise<WeplanManagementModule[]>;
  save(
    weplanManagementModule: WeplanManagementModule,
  ): Promise<WeplanManagementModule>;
  delete(id: string): Promise<void>;
}

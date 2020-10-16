import WeplanManagementModule from '@modules/suppliers/infra/typeorm/entities/WeplanManagementModule';
import ICreateWeplanManagementModuleDTO from '@modules/suppliers/dtos/ICreateWeplanManagementModuleDTO';

export default interface IWeplanManagementModulesRepository {
  create(
    data: ICreateWeplanManagementModuleDTO,
  ): Promise<WeplanManagementModule>;
  findById(id: string): Promise<WeplanManagementModule | undefined>;
  findByName(name: string): Promise<WeplanManagementModule | undefined>;
  findAll(): Promise<WeplanManagementModule[]>;
  save(
    weplanManagementModule: WeplanManagementModule,
  ): Promise<WeplanManagementModule>;
  delete(id: string): Promise<void>;
}

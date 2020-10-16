import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import WeplanContractOrder from '@modules/weplan/infra/typeorm/entities/WeplanContractOrder';
import IWeplanContractOrdersRepository from '@modules/weplan/repositories/IWeplanContractOrdersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserWeplanContractOrdersService {
  constructor(
    @inject('WeplanContractOrdersRepository')
    private weplanManagementModuleRepository: IWeplanContractOrdersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<WeplanContractOrder[]> {
    const products = await this.weplanManagementModuleRepository.findByUserId(
      user_id,
    );

    return products;
  }
}

export default ListUserWeplanContractOrdersService;

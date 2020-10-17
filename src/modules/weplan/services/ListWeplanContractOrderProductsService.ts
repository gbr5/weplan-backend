import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import WeplanContractOrderProduct from '@modules/weplan/infra/typeorm/entities/WeplanContractOrderProduct';
import IWeplanContractOrderProductsRepository from '@modules/weplan/repositories/IWeplanContractOrderProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserWeplanContractOrderProductsService {
  constructor(
    @inject('WeplanContractOrderProductsRepository')
    private weplanManagementModuleRepository: IWeplanContractOrderProductsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(
    contract_order_id: string,
  ): Promise<WeplanContractOrderProduct[]> {
    const products = await this.weplanManagementModuleRepository.findByContractOrderId(
      contract_order_id,
    );

    return products;
  }
}

export default ListUserWeplanContractOrderProductsService;

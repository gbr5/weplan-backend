import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import WeplanProduct from '@modules/weplan/infra/typeorm/entities/WeplanProduct';
import IWeplanProductsRepository from '@modules/weplan/repositories/IWeplanProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserWeplanProductsService {
  constructor(
    @inject('WeplanProductsRepository')
    private weplanManagementModuleRepository: IWeplanProductsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(): Promise<WeplanProduct[]> {
    const products = await this.weplanManagementModuleRepository.findAll();

    return products;
  }
}

export default ListUserWeplanProductsService;

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import SupplierCategory from '@modules/suppliers/infra/typeorm/entities/SupplierCategory';
import ISupplierCategoriesRepository from '@modules/suppliers/repositories/ISupplierCategoriesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserSupplierCategoriesService {
  constructor(
    @inject('SupplierCategoriesRepository')
    private supplierCategoriesRepository: ISupplierCategoriesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(): Promise<SupplierCategory[]> {
    const supplierCategories = await this.supplierCategoriesRepository.findAll();

    return supplierCategories;
  }
}

export default ListUserSupplierCategoriesService;

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import SupplierSubCategory from '@modules/suppliers/infra/typeorm/entities/SupplierSubCategory';
import ISupplierSubCategoriesRepository from '@modules/suppliers/repositories/ISupplierSubCategoriesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserSupplierSubCategoriesService {
  constructor(
    @inject('SupplierSubCategoriesRepository')
    private supplierSubCategoriesRepository: ISupplierSubCategoriesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(category_name: string): Promise<SupplierSubCategory[]> {
    const supplierSubCategories = await this.supplierSubCategoriesRepository.findByCategoryName(
      category_name,
    );

    return supplierSubCategories;
  }
}

export default ListUserSupplierSubCategoriesService;

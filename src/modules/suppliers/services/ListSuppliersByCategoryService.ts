import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import UserSupplierCategory from '@modules/suppliers/infra/typeorm/entities/UserSupplierCategory';
import IUserSupplierCategoriesRepository from '@modules/suppliers/repositories/IUserSupplierCategoriesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserUserSupplierCategoryService {
  constructor(
    @inject('UserSupplierCategoriesRepository')
    private UserSupplierCategoriesRepository: IUserSupplierCategoriesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(
    sub_category_name: string,
  ): Promise<UserSupplierCategory[]> {
    const userSupplierCategory = await this.UserSupplierCategoriesRepository.findByCategory(
      sub_category_name,
    );

    return userSupplierCategory;
  }
}

export default ListUserUserSupplierCategoryService;

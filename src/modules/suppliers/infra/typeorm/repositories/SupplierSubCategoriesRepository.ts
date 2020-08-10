import { getRepository, Repository } from 'typeorm';

import ISupplierSubCategoriesRepository from '@modules/suppliers/repositories/ISupplierSubCategoriesRepository';
import ICreateSupplierSubCategoryDTO from '@modules/suppliers/dtos/ICreateSupplierSubCategoryDTO';

import SupplierSubCategory from '@modules/suppliers/infra/typeorm/entities/SupplierSubCategory';

class SupplierSubCategoriesRepository
  implements ISupplierSubCategoriesRepository {
  private ormRepository: Repository<SupplierSubCategory>;

  constructor() {
    this.ormRepository = getRepository(SupplierSubCategory);
  }

  public async findBySubCategoryName(
    sub_category: string,
  ): Promise<SupplierSubCategory | undefined> {
    const findSupplierSubCategory = await this.ormRepository.findOne({
      where: { sub_category },
    });

    return findSupplierSubCategory;
  }

  public async findAll(): Promise<SupplierSubCategory[]> {
    const findSupplierSubCategories = await this.ormRepository.find();

    return findSupplierSubCategories;
  }

  public async create({
    sub_category,
    category,
  }: ICreateSupplierSubCategoryDTO): Promise<SupplierSubCategory> {
    const supplierSubCategory = this.ormRepository.create({
      sub_category,
      category_name: category,
    });

    await this.ormRepository.save(supplierSubCategory);

    return supplierSubCategory;
  }

  public async save(
    supplierSubCategory: SupplierSubCategory,
  ): Promise<SupplierSubCategory> {
    return this.ormRepository.save(supplierSubCategory);
  }
}

export default SupplierSubCategoriesRepository;

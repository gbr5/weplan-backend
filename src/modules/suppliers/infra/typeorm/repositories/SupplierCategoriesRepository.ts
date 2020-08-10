import { getRepository, Repository } from 'typeorm';

import ISupplierCategoriesRepository from '@modules/suppliers/repositories/ISupplierCategoriesRepository';
import ICreateSupplierCategoryDTO from '@modules/suppliers/dtos/ICreateSupplierCategoryDTO';

import SupplierCategory from '@modules/suppliers/infra/typeorm/entities/SupplierCategory';

class SupplierCategoriesRepository implements ISupplierCategoriesRepository {
  private ormRepository: Repository<SupplierCategory>;

  constructor() {
    this.ormRepository = getRepository(SupplierCategory);
  }

  public async findByCategoryName(
    category: string,
  ): Promise<SupplierCategory | undefined> {
    const findSupplierCategory = await this.ormRepository.findOne({
      where: { category },
    });

    return findSupplierCategory;
  }

  public async findAll(): Promise<SupplierCategory[]> {
    const findSupplierCategories = await this.ormRepository.find();

    return findSupplierCategories;
  }

  public async create(
    userData: ICreateSupplierCategoryDTO,
  ): Promise<SupplierCategory> {
    const supplierCategory = this.ormRepository.create(userData);

    await this.ormRepository.save(supplierCategory);

    return supplierCategory;
  }

  public async save(
    supplierCategory: SupplierCategory,
  ): Promise<SupplierCategory> {
    return this.ormRepository.save(supplierCategory);
  }
}

export default SupplierCategoriesRepository;

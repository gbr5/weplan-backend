import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISupplierCategoriesRepository from '@modules/suppliers/repositories/ISupplierCategoriesRepository';

import SupplierCategory from '@modules/suppliers/infra/typeorm/entities/SupplierCategory';

interface IRequest {
  oldCategoryName: string;
  category: string;
}

@injectable()
class UpdateSupplierCategoriesService {
  constructor(
    @inject('SupplierCategoriesRepository')
    private SupplierCategoriesRepository: ISupplierCategoriesRepository,
  ) {}

  public async execute({
    oldCategoryName,
    category,
  }: IRequest): Promise<SupplierCategory> {
    const supplierCategories = await this.SupplierCategoriesRepository.findByCategoryName(
      oldCategoryName,
    );

    if (!supplierCategories) {
      throw new AppError('SupplierCategories not found.');
    }
    supplierCategories.category = category;

    const updatedSupplierCategories = await this.SupplierCategoriesRepository.save(
      supplierCategories,
    );

    return updatedSupplierCategories;
  }
}

export default UpdateSupplierCategoriesService;

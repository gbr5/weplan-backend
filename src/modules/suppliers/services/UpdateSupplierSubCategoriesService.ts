import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISupplierSubCategoriesRepository from '@modules/suppliers/repositories/ISupplierSubCategoriesRepository';

import SupplierSubCategory from '@modules/suppliers/infra/typeorm/entities/SupplierSubCategory';

interface IRequest {
  oldSubCategoryName: string;
  sub_category: string;
}

@injectable()
class UpdateSupplierSubCategoriesService {
  constructor(
    @inject('SupplierSubCategoriesRepository')
    private SupplierSubCategoriesRepository: ISupplierSubCategoriesRepository,
  ) {}

  public async execute({
    oldSubCategoryName,
    sub_category,
  }: IRequest): Promise<SupplierSubCategory> {
    const supplierSubCategories = await this.SupplierSubCategoriesRepository.findBySubCategoryName(
      oldSubCategoryName,
    );

    if (!supplierSubCategories) {
      throw new AppError('SupplierSubCategories not found.');
    }
    supplierSubCategories.sub_category = sub_category;

    const updatedSupplierSubCategories = await this.SupplierSubCategoriesRepository.save(
      supplierSubCategories,
    );

    return updatedSupplierSubCategories;
  }
}

export default UpdateSupplierSubCategoriesService;

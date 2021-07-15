import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISupplierSubCategoriesRepository from '@modules/suppliers/repositories/ISupplierSubCategoriesRepository';

@injectable()
class DeleteSubCategorieService {
  constructor(
    @inject('SupplierSubCategoriesRepository')
    private supplierSubCategoriesRepository: ISupplierSubCategoriesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const supplierSubCategory = await this.supplierSubCategoriesRepository.findById(
      id,
    );

    if (!supplierSubCategory) {
      throw new AppError('Selected supplier not found.');
    }

    await this.supplierSubCategoriesRepository.delete(supplierSubCategory);
  }
}

export default DeleteSubCategorieService;

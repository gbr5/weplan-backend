import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserSupplierCategoriesRepository from '@modules/suppliers/repositories/IUserSupplierCategoriesRepository';

import UserSupplierCategory from '@modules/suppliers/infra/typeorm/entities/UserSupplierCategory';

@injectable()
class ShowUserSupplierCategoryService {
  constructor(
    @inject('UserSupplierCategoriesRepository')
    private userSupplierCategoriesRepository: IUserSupplierCategoriesRepository,
  ) {}

  public async execute(supplier_id: string): Promise<UserSupplierCategory[]> {
    const supplier = await this.userSupplierCategoriesRepository.findById(
      supplier_id,
    );

    if (!supplier) {
      throw new AppError('Event not found.');
    }

    return supplier;
  }
}

export default ShowUserSupplierCategoryService;

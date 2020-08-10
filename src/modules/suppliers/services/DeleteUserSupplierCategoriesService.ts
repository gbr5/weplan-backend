import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserSupplierCategoriesRepository from '@modules/suppliers/repositories/IUserSupplierCategoriesRepository';

interface IRequest {
  user_id: string;
  sub_category_name: string;
}
@injectable()
class UpdateUserSupplierCategoryService {
  constructor(
    @inject('UserSupplierCategoriesRepository')
    private userSupplierCategoriesRepository: IUserSupplierCategoriesRepository,
  ) {}

  public async execute({
    user_id,
    sub_category_name,
  }: IRequest): Promise<void> {
    const userSupplierCategory = await this.userSupplierCategoriesRepository.findByIdAndCategory(
      user_id,
      sub_category_name,
    );

    if (!userSupplierCategory) {
      throw new AppError('No supplier found, within this category.');
    }

    await this.userSupplierCategoriesRepository.delete(userSupplierCategory);
  }
}

export default UpdateUserSupplierCategoryService;

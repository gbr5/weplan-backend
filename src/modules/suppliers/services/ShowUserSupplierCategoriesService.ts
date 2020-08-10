import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserSupplierCategoriesRepository from '@modules/suppliers/repositories/IUserSupplierCategoriesRepository';

import UserSupplierCategory from '@modules/suppliers/infra/typeorm/entities/UserSupplierCategory';

interface IRequest {
  user_id: string;
  sub_category_name: string;
}

@injectable()
class ShowUserSupplierCategoryService {
  constructor(
    @inject('UserSupplierCategoriesRepository')
    private userSupplierCategoriesRepository: IUserSupplierCategoriesRepository,
  ) {}

  public async execute({
    user_id,
    sub_category_name,
  }: IRequest): Promise<UserSupplierCategory> {
    const event = await this.userSupplierCategoriesRepository.findByIdAndCategory(
      user_id,
      sub_category_name,
    );

    if (!event) {
      throw new AppError('Event not found.');
    }

    return event;
  }
}

export default ShowUserSupplierCategoryService;

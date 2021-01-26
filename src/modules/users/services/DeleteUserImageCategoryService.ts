import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserImageCategoriesRepository from '@modules/users/repositories/IUserImageCategoriesRepository';

@injectable()
class DeleteUserImageCategoryService {
  constructor(
    @inject('UserImageCategoriesRepository')
    private userImageCategoriesRepository: IUserImageCategoriesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userImageCategory = await this.userImageCategoriesRepository.findById(
      id,
    );

    if (!userImageCategory) {
      throw new AppError('No confirmation found.');
    }

    await this.userImageCategoriesRepository.delete(userImageCategory);
  }
}

export default DeleteUserImageCategoryService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFileCategoriesRepository from '@modules/users/repositories/IUserFileCategoriesRepository';

@injectable()
class DeleteUserFileCategoryService {
  constructor(
    @inject('UserFileCategoriesRepository')
    private userFileCategoriesRepository: IUserFileCategoriesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userFileCategory = await this.userFileCategoriesRepository.findById(
      id,
    );

    if (!userFileCategory) {
      throw new AppError('No confirmation found.');
    }

    await this.userFileCategoriesRepository.delete(userFileCategory);
  }
}

export default DeleteUserFileCategoryService;

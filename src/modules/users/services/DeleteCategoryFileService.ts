import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryFilesRepository from '@modules/users/repositories/ICategoryFilesRepository';

@injectable()
class DeleteCategoryFileService {
  constructor(
    @inject('CategoryFilesRepository')
    private categoryFilesRepository: ICategoryFilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const categoryFile = await this.categoryFilesRepository.findById(id);

    if (!categoryFile) {
      throw new AppError('No confirmation found.');
    }

    await this.categoryFilesRepository.delete(categoryFile);
  }
}

export default DeleteCategoryFileService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryImagesRepository from '@modules/users/repositories/ICategoryImagesRepository';

@injectable()
class DeleteCategoryImageService {
  constructor(
    @inject('CategoryImagesRepository')
    private categoryImagesRepository: ICategoryImagesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const categoryImage = await this.categoryImagesRepository.findById(id);

    if (!categoryImage) {
      throw new AppError('No confirmation found.');
    }

    await this.categoryImagesRepository.delete(categoryImage);
  }
}

export default DeleteCategoryImageService;

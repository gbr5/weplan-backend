import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICategoryImagesRepository from '@modules/users/repositories/ICategoryImagesRepository';
import CategoryImage from '../infra/typeorm/entities/CategoryImage';

@injectable()
class ListCategoryImageService {
  constructor(
    @inject('CategoryImagesRepository')
    private categoryImagesRepository: ICategoryImagesRepository,
  ) {}

  public async execute(category_id: string): Promise<CategoryImage[]> {
    const categoryImages = this.categoryImagesRepository.findByCategoryId(
      category_id,
    );

    return categoryImages;
  }
}

export default ListCategoryImageService;

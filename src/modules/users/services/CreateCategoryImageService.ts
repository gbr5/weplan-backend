import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryImagesRepository from '@modules/users/repositories/ICategoryImagesRepository';
import CategoryImage from '@modules/users/infra/typeorm/entities/CategoryImage';
import ICreateCategoryImageDTO from '../dtos/ICreateCategoryImageDTO';
import IUserImageCategoriesRepository from '../repositories/IUserImageCategoriesRepository';
import IUserImagesRepository from '../repositories/IUserImagesRepository';

@injectable()
class CreateCategoryImageService {
  constructor(
    @inject('CategoryImagesRepository')
    private categoryImagesRepository: ICategoryImagesRepository,

    @inject('UserImageCategoriesRepository')
    private userImageCategoriesRepository: IUserImageCategoriesRepository,

    @inject('UserImagesRepository')
    private userImagesRepository: IUserImagesRepository,
  ) {}

  public async execute({
    category_id,
    image_id,
  }: ICreateCategoryImageDTO): Promise<CategoryImage> {
    const categoryExists = await this.userImageCategoriesRepository.findById(
      category_id,
    );

    if (!categoryExists) {
      throw new AppError('Category not found!');
    }

    const imageExists = await this.userImagesRepository.findById(image_id);

    if (!imageExists) {
      throw new AppError('Image not found!');
    }

    const image = await this.categoryImagesRepository.create({
      category_id,
      image_id,
    });

    return image;
  }
}

export default CreateCategoryImageService;

import { getRepository, Repository } from 'typeorm';

import ICategoryImagesRepository from '@modules/users/repositories/ICategoryImagesRepository';
import ICreateCategoryImageDTO from '@modules/users/dtos/ICreateCategoryImageDTO';

import CategoryImage from '@modules/users/infra/typeorm/entities/CategoryImage';
import AppError from '@shared/errors/AppError';

class CategoryImagesRepository implements ICategoryImagesRepository {
  private ormRepository: Repository<CategoryImage>;

  constructor() {
    this.ormRepository = getRepository(CategoryImage);
  }

  public async findByCategoryId(category_id: string): Promise<CategoryImage[]> {
    const findCategoryImage = await this.ormRepository.find({
      where: { category_id },
    });

    return findCategoryImage;
  }

  public async findById(id: string): Promise<CategoryImage | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(data: ICreateCategoryImageDTO): Promise<CategoryImage> {
    try {
      const userConfirmation = this.ormRepository.create(data);

      await this.ormRepository.save(userConfirmation);

      return userConfirmation;
    } catch (err) {
      throw new AppError('Algo deu errado, CategoryImagesRepository.create');
    }
  }

  public async save(data: CategoryImage): Promise<CategoryImage> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, CategoryImagesRepository.save');
    }
  }

  public async delete(data: CategoryImage): Promise<void> {
    try {
      await this.ormRepository.delete(data.id);
    } catch (err) {
      throw new AppError('Algo deu errado, CategoryImagesRepository.delete');
    }
  }
}

export default CategoryImagesRepository;

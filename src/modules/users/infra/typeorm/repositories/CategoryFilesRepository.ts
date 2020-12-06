import { getRepository, Repository } from 'typeorm';

import ICategoryFilesRepository from '@modules/users/repositories/ICategoryFilesRepository';
import ICreateCategoryFileDTO from '@modules/users/dtos/ICreateCategoryFileDTO';

import CategoryFile from '@modules/users/infra/typeorm/entities/CategoryFile';
import AppError from '@shared/errors/AppError';

class CategoryFilesRepository implements ICategoryFilesRepository {
  private ormRepository: Repository<CategoryFile>;

  constructor() {
    this.ormRepository = getRepository(CategoryFile);
  }

  public async findByCategoryId(category_id: string): Promise<CategoryFile[]> {
    const findCategoryFile = await this.ormRepository.find({
      where: { category_id },
    });

    return findCategoryFile;
  }

  public async findById(id: string): Promise<CategoryFile | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(data: ICreateCategoryFileDTO): Promise<CategoryFile> {
    try {
      const userConfirmation = this.ormRepository.create(data);

      await this.ormRepository.save(userConfirmation);

      return userConfirmation;
    } catch (err) {
      throw new AppError('Algo deu errado, CategoryFilesRepository.create');
    }
  }

  public async save(data: CategoryFile): Promise<CategoryFile> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, CategoryFilesRepository.save');
    }
  }

  public async delete(data: CategoryFile): Promise<void> {
    try {
      await this.ormRepository.delete(data.id);
    } catch (err) {
      throw new AppError('Algo deu errado, CategoryFilesRepository.delete');
    }
  }
}

export default CategoryFilesRepository;

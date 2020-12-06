import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryFilesRepository from '@modules/users/repositories/ICategoryFilesRepository';
import CategoryFile from '@modules/users/infra/typeorm/entities/CategoryFile';
import ICreateCategoryFileDTO from '../dtos/ICreateCategoryFileDTO';
import IUserFileCategoriesRepository from '../repositories/IUserFileCategoriesRepository';
import IUserFilesRepository from '../repositories/IUserFilesRepository';

@injectable()
class CreateCategoryFileService {
  constructor(
    @inject('CategoryFilesRepository')
    private categoryFilesRepository: ICategoryFilesRepository,

    @inject('UserFileCategoriesRepository')
    private userFileCategoriesRepository: IUserFileCategoriesRepository,

    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,
  ) {}

  public async execute({
    category_id,
    file_id,
  }: ICreateCategoryFileDTO): Promise<CategoryFile> {
    const categoryExists = await this.userFileCategoriesRepository.findById(
      category_id,
    );

    if (!categoryExists) {
      throw new AppError('Category not found!');
    }

    const fileExists = await this.userFilesRepository.findById(file_id);

    if (!fileExists) {
      throw new AppError('File not found!');
    }

    const file = await this.categoryFilesRepository.create({
      category_id,
      file_id,
    });

    return file;
  }
}

export default CreateCategoryFileService;

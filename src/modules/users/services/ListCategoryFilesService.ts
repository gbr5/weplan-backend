import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICategoryFilesRepository from '@modules/users/repositories/ICategoryFilesRepository';
import CategoryFile from '../infra/typeorm/entities/CategoryFile';

@injectable()
class ListCategoryFileService {
  constructor(
    @inject('CategoryFilesRepository')
    private categoryFilesRepository: ICategoryFilesRepository,
  ) {}

  public async execute(category_id: string): Promise<CategoryFile[]> {
    const categoryFiles = this.categoryFilesRepository.findByCategoryId(
      category_id,
    );

    return categoryFiles;
  }
}

export default ListCategoryFileService;

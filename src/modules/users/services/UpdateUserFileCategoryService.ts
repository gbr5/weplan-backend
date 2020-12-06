import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFileCategoriesRepository from '@modules/users/repositories/IUserFileCategoriesRepository';

import UserFileCategory from '@modules/users/infra/typeorm/entities/UserFileCategory';

interface IRequest {
  id: string;
  name: string;
  description: string;
  color: string;
}
@injectable()
class UpdateUserFileCategoryService {
  constructor(
    @inject('UserFileCategoriesRepository')
    private userFilesRepository: IUserFileCategoriesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    color,
  }: IRequest): Promise<UserFileCategory> {
    const userfile = await this.userFilesRepository.findById(id);

    if (!userfile) {
      throw new AppError('File not found.');
    }

    userfile.name = name;
    userfile.description = description;
    userfile.color = color;

    const updatedUserFileCategory = await this.userFilesRepository.save(
      userfile,
    );

    return updatedUserFileCategory;
  }
}

export default UpdateUserFileCategoryService;

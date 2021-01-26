import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserImageCategoriesRepository from '@modules/users/repositories/IUserImageCategoriesRepository';

import UserImageCategory from '@modules/users/infra/typeorm/entities/UserImageCategory';

interface IRequest {
  id: string;
  name: string;
  description: string;
  color: string;
}
@injectable()
class UpdateUserImageCategoryService {
  constructor(
    @inject('UserImageCategoriesRepository')
    private userImagesRepository: IUserImageCategoriesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    color,
  }: IRequest): Promise<UserImageCategory> {
    const userfile = await this.userImagesRepository.findById(id);

    if (!userfile) {
      throw new AppError('Image not found.');
    }

    userfile.name = name;
    userfile.description = description;
    userfile.color = color;

    const updatedUserImageCategory = await this.userImagesRepository.save(
      userfile,
    );

    return updatedUserImageCategory;
  }
}

export default UpdateUserImageCategoryService;

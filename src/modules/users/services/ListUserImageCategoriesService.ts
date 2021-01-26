import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserImageCategoriesRepository from '@modules/users/repositories/IUserImageCategoriesRepository';
import UserImageCategory from '../infra/typeorm/entities/UserImageCategory';

@injectable()
class ListUserImageCategoriesService {
  constructor(
    @inject('UserImageCategoriesRepository')
    private userImageCategoriesRepository: IUserImageCategoriesRepository,
  ) {}

  public async execute(user_id: string): Promise<UserImageCategory[]> {
    const userImageCategories = this.userImageCategoriesRepository.findByUserId(
      user_id,
    );

    return userImageCategories;
  }
}

export default ListUserImageCategoriesService;

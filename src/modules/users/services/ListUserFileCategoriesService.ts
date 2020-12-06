import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserFileCategoriesRepository from '@modules/users/repositories/IUserFileCategoriesRepository';
import UserFileCategory from '../infra/typeorm/entities/UserFileCategory';

@injectable()
class ListUserFileCategoriesService {
  constructor(
    @inject('UserFileCategoriesRepository')
    private userFileCategoriesRepository: IUserFileCategoriesRepository,
  ) {}

  public async execute(user_id: string): Promise<UserFileCategory[]> {
    const userFileCategories = this.userFileCategoriesRepository.findByUserId(
      user_id,
    );

    return userFileCategories;
  }
}

export default ListUserFileCategoriesService;

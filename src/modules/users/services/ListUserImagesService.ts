import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserImagesRepository from '@modules/users/repositories/IUserImagesRepository';
import UserImage from '../infra/typeorm/entities/UserImage';

@injectable()
class ListUserImageService {
  constructor(
    @inject('UserImagesRepository')
    private userImagesRepository: IUserImagesRepository,
  ) {}

  public async execute(user_id: string): Promise<UserImage[]> {
    const userImages = this.userImagesRepository.findByUserId(user_id);

    return userImages;
  }
}

export default ListUserImageService;

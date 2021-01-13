import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserImagesRepository from '@modules/users/repositories/IUserImagesRepository';
import UserImage from '@modules/users/infra/typeorm/entities/UserImage';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICreateUserImageDTO from '../dtos/ICreateUserImageDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserImageService {
  constructor(
    @inject('UserImagesRepository')
    private userImagesRepository: IUserImagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    description,
    image_name,
    name,
  }: ICreateUserImageDTO): Promise<UserImage> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User not found!');
    }

    const imageExists = await this.userImagesRepository.findByUserIdAndImageName(
      user_id,
      name,
    );

    if (imageExists) {
      throw new AppError('This image name is already beeing used!');
    }

    const imageName = await this.storageProvider.saveFile(image_name);

    const image = await this.userImagesRepository.create({
      user_id,
      name,
      image_name: imageName,
      description,
    });

    return image;
  }
}

export default CreateUserImageService;

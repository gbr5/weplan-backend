import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserImagesRepository from '@modules/users/repositories/IUserImagesRepository';

import UserImage from '@modules/users/infra/typeorm/entities/UserImage';

interface IRequest {
  id: string;
  name: string;
  description: string;
}
@injectable()
class UpdateUserImageService {
  constructor(
    @inject('UserImagesRepository')
    private userImagesRepository: IUserImagesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
  }: IRequest): Promise<UserImage> {
    const userfile = await this.userImagesRepository.findById(id);

    if (!userfile) {
      throw new AppError('Image not found.');
    }

    userfile.name = name;
    userfile.description = description;

    const updatedUserImage = await this.userImagesRepository.save(userfile);

    return updatedUserImage;
  }
}

export default UpdateUserImageService;

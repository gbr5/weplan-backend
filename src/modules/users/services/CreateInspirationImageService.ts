import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInspirationImagesRepository from '@modules/users/repositories/IInspirationImagesRepository';
import InspirationImage from '@modules/users/infra/typeorm/entities/InspirationImage';
import ICreateInspirationImageDTO from '../dtos/ICreateInspirationImageDTO';
import IUserImagesRepository from '../repositories/IUserImagesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateInspirationImageService {
  constructor(
    @inject('InspirationImagesRepository')
    private inspirationImagesRepository: IInspirationImagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserImagesRepository')
    private userImagesRepository: IUserImagesRepository,
  ) {}

  public async execute({
    user_id,
    image_id,
    description,
  }: ICreateInspirationImageDTO): Promise<InspirationImage> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('Inspiration not found!');
    }

    const imageExists = await this.userImagesRepository.findById(image_id);

    if (!imageExists) {
      throw new AppError('Image not found!');
    }

    const image = await this.inspirationImagesRepository.create({
      user_id,
      image_id,
      description,
    });

    return image;
  }
}

export default CreateInspirationImageService;

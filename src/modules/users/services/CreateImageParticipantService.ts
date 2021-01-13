import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IImageParticipantsRepository from '@modules/users/repositories/IImageParticipantsRepository';
import ImageParticipant from '@modules/users/infra/typeorm/entities/ImageParticipant';
import ICreateImageParticipantDTO from '../dtos/ICreateImageParticipantDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserImagesRepository from '../repositories/IUserImagesRepository';

@injectable()
class CreateImageParticipantService {
  constructor(
    @inject('ImageParticipantsRepository')
    private imageParticipantsRepository: IImageParticipantsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserImagesRepository')
    private userImagesRepository: IUserImagesRepository,
  ) {}

  public async execute({
    user_id,
    image_id,
  }: ICreateImageParticipantDTO): Promise<ImageParticipant> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User not found!');
    }

    const imageExists = await this.userImagesRepository.findById(image_id);

    if (!imageExists) {
      throw new AppError('Image not found!');
    }

    const image = await this.imageParticipantsRepository.create({
      user_id,
      image_id,
    });

    return image;
  }
}

export default CreateImageParticipantService;

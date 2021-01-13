import { getRepository, Repository } from 'typeorm';

import IImageParticipantsRepository from '@modules/users/repositories/IImageParticipantsRepository';
import ICreateImageParticipantDTO from '@modules/users/dtos/ICreateImageParticipantDTO';

import ImageParticipant from '@modules/users/infra/typeorm/entities/ImageParticipant';
import AppError from '@shared/errors/AppError';

class ImageParticipantsRepository implements IImageParticipantsRepository {
  private ormRepository: Repository<ImageParticipant>;

  constructor() {
    this.ormRepository = getRepository(ImageParticipant);
  }

  public async findByUserId(user_id: string): Promise<ImageParticipant[]> {
    const findImageParticipant = await this.ormRepository.find({
      where: { user_id },
    });

    return findImageParticipant;
  }

  public async findByImageId(image_id: string): Promise<ImageParticipant[]> {
    const findImageParticipant = await this.ormRepository.find({
      where: { image_id },
    });

    return findImageParticipant;
  }

  public async findById(id: string): Promise<ImageParticipant | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(
    data: ICreateImageParticipantDTO,
  ): Promise<ImageParticipant> {
    try {
      const userConfirmation = this.ormRepository.create(data);

      await this.ormRepository.save(userConfirmation);

      return userConfirmation;
    } catch (err) {
      throw new AppError('Algo deu errado, ImageParticipantsRepository.create');
    }
  }

  public async save(data: ImageParticipant): Promise<ImageParticipant> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, ImageParticipantsRepository.save');
    }
  }

  public async delete(data: ImageParticipant): Promise<void> {
    await this.ormRepository.delete(data.id);
  }
}

export default ImageParticipantsRepository;

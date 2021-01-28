import { getRepository, Repository } from 'typeorm';

import IInspirationImagesRepository from '@modules/users/repositories/IInspirationImagesRepository';
import ICreateInspirationImageDTO from '@modules/users/dtos/ICreateInspirationImageDTO';

import InspirationImage from '@modules/users/infra/typeorm/entities/InspirationImage';
import AppError from '@shared/errors/AppError';

class InspirationImagesRepository implements IInspirationImagesRepository {
  private ormRepository: Repository<InspirationImage>;

  constructor() {
    this.ormRepository = getRepository(InspirationImage);
  }

  public async findByUserId(user_id: string): Promise<InspirationImage[]> {
    const findInspirationImage = await this.ormRepository.find({
      where: { user_id },
    });

    return findInspirationImage;
  }

  public async findById(id: string): Promise<InspirationImage | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(
    data: ICreateInspirationImageDTO,
  ): Promise<InspirationImage> {
    try {
      const userConfirmation = this.ormRepository.create(data);

      await this.ormRepository.save(userConfirmation);

      return userConfirmation;
    } catch (err) {
      throw new AppError('Algo deu errado, InspirationImagesRepository.create');
    }
  }

  public async save(data: InspirationImage): Promise<InspirationImage> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, InspirationImagesRepository.save');
    }
  }

  public async delete(data: InspirationImage): Promise<void> {
    try {
      await this.ormRepository.delete(data.id);
    } catch (err) {
      throw new AppError('Algo deu errado, InspirationImagesRepository.delete');
    }
  }
}

export default InspirationImagesRepository;

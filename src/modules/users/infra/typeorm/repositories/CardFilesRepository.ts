import { getRepository, Repository } from 'typeorm';

import ICardFilesRepository from '@modules/users/repositories/ICardFilesRepository';
import ICreateCardFileDTO from '@modules/users/dtos/ICreateCardFileDTO';

import CardFile from '@modules/users/infra/typeorm/entities/CardFile';
import AppError from '@shared/errors/AppError';

class CardFilesRepository implements ICardFilesRepository {
  private ormRepository: Repository<CardFile>;

  constructor() {
    this.ormRepository = getRepository(CardFile);
  }

  public async findByCard(card_unique_name: string): Promise<CardFile[]> {
    const findCardFile = await this.ormRepository.find({
      where: { card_unique_name },
    });

    return findCardFile;
  }

  public async findById(id: string): Promise<CardFile | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(data: ICreateCardFileDTO): Promise<CardFile> {
    try {
      const cardFile = this.ormRepository.create(data);

      await this.ormRepository.save(cardFile);

      return cardFile;
    } catch (err) {
      throw new AppError('Algo deu errado, CardFilesRepository.create');
    }
  }

  public async save(data: CardFile): Promise<CardFile> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, CardFilesRepository.save');
    }
  }

  public async delete(data: CardFile): Promise<void> {
    try {
      await this.ormRepository.delete(data.id);
    } catch (err) {
      throw new AppError('Algo deu errado, CardFilesRepository.delete');
    }
  }
}

export default CardFilesRepository;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardFilesRepository from '@modules/users/repositories/ICardFilesRepository';
import CardFile from '@modules/users/infra/typeorm/entities/CardFile';
import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';
import ICreateCardFileDTO from '../dtos/ICreateCardFileDTO';
import IUserFilesRepository from '../repositories/IUserFilesRepository';

@injectable()
class CreateCardFileService {
  constructor(
    @inject('CardFilesRepository')
    private cardFilesRepository: ICardFilesRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,

    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,
  ) {}

  public async execute({
    card_unique_name,
    file_id,
  }: ICreateCardFileDTO): Promise<CardFile> {
    const cardExists = await this.stageCardsRepository.findByUniqueName(
      card_unique_name,
    );

    if (!cardExists) {
      throw new AppError('Card not found!');
    }

    const fileExists = await this.userFilesRepository.findById(file_id);

    if (!fileExists) {
      throw new AppError('File not found!');
    }

    const file = await this.cardFilesRepository.create({
      card_unique_name,
      file_id,
    });

    return file;
  }
}

export default CreateCardFileService;

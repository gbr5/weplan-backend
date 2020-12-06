import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICardFilesRepository from '@modules/users/repositories/ICardFilesRepository';
import CardFile from '../infra/typeorm/entities/CardFile';

@injectable()
class ListCardFileService {
  constructor(
    @inject('CardFilesRepository')
    private cardFilesRepository: ICardFilesRepository,
  ) {}

  public async execute(card_id: string): Promise<CardFile[]> {
    const cardFiles = this.cardFilesRepository.findByCard(card_id);

    return cardFiles;
  }
}

export default ListCardFileService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardCheckListsRepository from '../repositories/ICardCheckListsRepository';

@injectable()
class DeleteCardCheckListService {
  constructor(
    @inject('CardCheckListsRepository')
    private cardCheckListsRepository: ICardCheckListsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cardCheckList = await this.cardCheckListsRepository.findById(id);

    if (!cardCheckList) {
      throw new AppError('No card check list found.');
    }

    await this.cardCheckListsRepository.delete(cardCheckList);
  }
}

export default DeleteCardCheckListService;

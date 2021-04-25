import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';

import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';

@injectable()
class ShowStageCardService {
  constructor(
    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute(id: string): Promise<StageCard> {
    const card = await this.stageCardsRepository.findById(id);

    if (!card) {
      throw new AppError('Card not found.');
    }

    return card;
  }
}

export default ShowStageCardService;

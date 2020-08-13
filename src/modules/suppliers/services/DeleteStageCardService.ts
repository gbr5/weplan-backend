import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';

@injectable()
class DeleteStageCardService {
  constructor(
    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const stageCard = await this.stageCardsRepository.findById(id);

    if (!stageCard) {
      throw new AppError('Selected stage stage not found.');
    }

    await this.stageCardsRepository.delete(stageCard);
  }
}

export default DeleteStageCardService;

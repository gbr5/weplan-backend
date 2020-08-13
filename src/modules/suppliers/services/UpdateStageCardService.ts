import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';

import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import CreateStageCardService from './CreateStageCardService';
import DeleteStageCardService from './DeleteStageCardService';

@injectable()
class UpdateStageCardService {
  constructor(
    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute(
    id: string,
    weplanEvent: boolean,
    name: string,
    isActive: boolean,
    new_stage_id: string,
    new_card_owner: string,
  ): Promise<StageCard> {
    const stageCard = await this.stageCardsRepository.findById(id);
    const createStageCard = container.resolve(CreateStageCardService);
    const deleteStageCard = container.resolve(DeleteStageCardService);

    if (!stageCard) {
      throw new AppError('Card not found.');
    }

    if (
      new_stage_id !== stageCard.stage_id ||
      new_card_owner !== stageCard.card_owner
    ) {
      await deleteStageCard.execute(id);
      const updatedStageCard = await createStageCard.execute({
        weplanEvent,
        name,
        unique_name: stageCard.unique_name,
        isActive,
        stage_id: new_stage_id,
        card_owner: new_card_owner,
      });
      return updatedStageCard;
    }

    stageCard.name = name;
    stageCard.weplanEvent = weplanEvent;
    stageCard.isActive = isActive;

    const updatedStageCard = await this.stageCardsRepository.save(stageCard);

    return updatedStageCard;
  }
}

export default UpdateStageCardService;

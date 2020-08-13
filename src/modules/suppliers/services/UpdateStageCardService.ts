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
    name: string,
    id: string,
    stage_id: string,
    new_stage_id: string,
    card_owner: string,
  ): Promise<StageCard> {
    const stageCard = await this.stageCardsRepository.findById(id);
    const createStageCard = container.resolve(CreateStageCardService);
    const deleteStageCard = container.resolve(DeleteStageCardService);

    if (!stageCard) {
      throw new AppError('Card not found.');
    }
    console.log(new_stage_id, ' essa ', id);

    if (new_stage_id !== stage_id) {
      await deleteStageCard.execute(id);
      const updatedStageCard = await createStageCard.execute({
        name,
        stage_id: new_stage_id,
        card_owner,
      });
      return updatedStageCard;
    }

    stageCard.name = name;
    stageCard.stage_id = stage_id;
    stageCard.card_owner = card_owner;
    console.log('stageCard.stage_id', stageCard.stage_id, 'stage_id', stage_id);

    const updatedStageCard = await this.stageCardsRepository.save(stageCard);

    console.log(updatedStageCard.stage_id, stage_id);
    return updatedStageCard;
  }
}

export default UpdateStageCardService;

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';

@injectable()
class ListUserStageCardsService {
  constructor(
    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute(stage_id: string): Promise<StageCard[]> {
    const stageCards = await this.stageCardsRepository.findByStageId(stage_id);

    return stageCards;
  }
}

export default ListUserStageCardsService;

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';

@injectable()
class ListOwnerCardsService {
  constructor(
    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute(card_owner: string): Promise<StageCard[]> {
    const stageCards = await this.stageCardsRepository.findByCardOwner(
      card_owner,
    );

    return stageCards;
  }
}

export default ListOwnerCardsService;

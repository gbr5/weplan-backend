import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFunnelsRepository from '../repositories/IFunnelsRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import StageCard from '../infra/typeorm/entities/StageCard';

@injectable()
class ListInactiveComercialCardsService {
  constructor(
    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,

    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,
  ) {}

  public async execute(funnel_id: string): Promise<StageCard[]> {
    const funnel = await this.funnelsRepository.findById(funnel_id);

    if (!funnel) {
      throw new AppError('Cards not found!');
    }

    const stagesIds = funnel.stages.map(stage => stage.id);
    const cards: StageCard[] = [];

    await this.stageCardsRepository
      .findNotActiveByStageId(stagesIds[0])
      .then(response => {
        response.map(card => cards.push(card));
      });
    await this.stageCardsRepository
      .findNotActiveByStageId(stagesIds[1])
      .then(response => {
        response.map(card => cards.push(card));
      });
    await this.stageCardsRepository
      .findNotActiveByStageId(stagesIds[2])
      .then(response => {
        response.map(card => cards.push(card));
      });
    await this.stageCardsRepository
      .findNotActiveByStageId(stagesIds[3])
      .then(response => {
        response.map(card => cards.push(card));
      });
    await this.stageCardsRepository
      .findNotActiveByStageId(stagesIds[4])
      .then(response => {
        response.map(card => cards.push(card));
      });

    return cards;
  }
}

export default ListInactiveComercialCardsService;

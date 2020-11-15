import { getRepository, Repository } from 'typeorm';

import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';

import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import ICreateStageCardDTO from '@modules/suppliers/dtos/ICreateStageCardDTO';

class StageCardsRepository implements IStageCardsRepository {
  private ormRepository: Repository<StageCard>;

  constructor() {
    this.ormRepository = getRepository(StageCard);
  }

  public async findById(id: string): Promise<StageCard | undefined> {
    const stageCard = await this.ormRepository.findOne({ id });

    return stageCard;
  }

  public async findByUniqueName(
    unique_name: string,
  ): Promise<StageCard | undefined> {
    const stageCard = await this.ormRepository.findOne({
      where: { unique_name },
    });

    return stageCard;
  }

  public async findByStageId(stage_id: string): Promise<StageCard[]> {
    const stageCards = await this.ormRepository.find({
      where: { stage_id },
      order: {
        updated_at: 'ASC',
      },
    });

    return stageCards;
  }

  public async create(data: ICreateStageCardDTO): Promise<StageCard> {
    const stageCard = await this.ormRepository.create(data);

    await this.ormRepository.save(stageCard);

    return stageCard;
  }

  public async save(stageCard: StageCard): Promise<StageCard> {
    return this.ormRepository.save(stageCard);
  }

  public async delete({ id, stage_id }: StageCard): Promise<void> {
    await this.ormRepository.delete({ id, stage_id });
  }
}

export default StageCardsRepository;

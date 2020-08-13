import { getRepository, Repository } from 'typeorm';

import IFunnelStagesRepository from '@modules/suppliers/repositories/IFunnelStagesRepository';

import FunnelStage from '@modules/suppliers/infra/typeorm/entities/FunnelStage';
import ICreateFunnelStageDTO from '@modules/suppliers/dtos/ICreateFunnelStageDTO';

class FunnelStagesRepository implements IFunnelStagesRepository {
  private ormRepository: Repository<FunnelStage>;

  constructor() {
    this.ormRepository = getRepository(FunnelStage);
  }

  public async findById(id: string): Promise<FunnelStage | undefined> {
    const funnelStage = await this.ormRepository.findOne({ id });

    return funnelStage;
  }

  public async findByFunnelId(funnel_id: string): Promise<FunnelStage[]> {
    const funnelStages = await this.ormRepository.find({
      where: { funnel_id },
      order: {
        funnel_order: 'ASC',
      },
    });

    return funnelStages;
  }

  public async findByFunnelIdAndOrder(
    funnel_id: string,
    funnel_order: number,
  ): Promise<FunnelStage | undefined> {
    const funnelStage = await this.ormRepository.findOne({
      where: { funnel_id, funnel_order },
    });

    return funnelStage;
  }

  public async create(data: ICreateFunnelStageDTO): Promise<FunnelStage> {
    const funnelStage = await this.ormRepository.create(data);

    await this.ormRepository.save(funnelStage);

    return funnelStage;
  }

  public async save(funnelStage: FunnelStage): Promise<FunnelStage> {
    return this.ormRepository.save(funnelStage);
  }

  public async delete({ id, funnel_id }: FunnelStage): Promise<void> {
    await this.ormRepository.delete({ id, funnel_id });
  }
}

export default FunnelStagesRepository;

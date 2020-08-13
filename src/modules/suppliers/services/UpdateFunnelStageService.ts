import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFunnelStagesRepository from '@modules/suppliers/repositories/IFunnelStagesRepository';

import FunnelStage from '@modules/suppliers/infra/typeorm/entities/FunnelStage';

@injectable()
class UpdateFunnelStageService {
  constructor(
    @inject('FunnelStagesRepository')
    private funnelStagesRepository: IFunnelStagesRepository,
  ) {}

  public async execute(
    name: string,
    id: string,
    funnel_id: string,
    funnel_order: number,
  ): Promise<FunnelStage> {
    const funnelStage = await this.funnelStagesRepository.findById(id);

    if (!funnelStage) {
      throw new AppError('FunnelStage not found.');
    }

    const funnelStageExists = await this.funnelStagesRepository.findByFunnelIdAndOrder(
      funnel_id,
      funnel_order,
    );

    if (funnelStageExists) {
      throw new AppError('There is already a stage at that position.');
    }

    funnelStage.name = name;
    funnelStage.funnel_order = funnel_order;

    const updatedFunnelStage = await this.funnelStagesRepository.save(
      funnelStage,
    );

    return updatedFunnelStage;
  }
}

export default UpdateFunnelStageService;

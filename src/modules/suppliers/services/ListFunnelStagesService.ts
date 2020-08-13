import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import FunnelStage from '@modules/suppliers/infra/typeorm/entities/FunnelStage';
import IFunnelStagesRepository from '@modules/suppliers/repositories/IFunnelStagesRepository';

@injectable()
class ListUserFunnelStagesService {
  constructor(
    @inject('FunnelStagesRepository')
    private funnelStagesRepository: IFunnelStagesRepository,
  ) {}

  public async execute(funnel_id: string): Promise<FunnelStage[]> {
    const funnelStages = await this.funnelStagesRepository.findByFunnelId(
      funnel_id,
    );

    return funnelStages;
  }
}

export default ListUserFunnelStagesService;

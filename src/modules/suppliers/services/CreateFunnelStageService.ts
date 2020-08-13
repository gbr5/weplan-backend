import { injectable, inject } from 'tsyringe';

import FunnelStage from '@modules/suppliers/infra/typeorm/entities/FunnelStage';
import IFunnelStagesRepository from '@modules/suppliers/repositories/IFunnelStagesRepository';
import ICreateFunnelStageDTO from '@modules/suppliers/dtos/ICreateFunnelStageDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateFunnelStageService {
  constructor(
    @inject('FunnelStagesRepository')
    private funnelStagesRepository: IFunnelStagesRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    funnel_id,
    funnel_order,
  }: ICreateFunnelStageDTO): Promise<FunnelStage> {
    const funnelStageExists = await this.funnelStagesRepository.findByFunnelIdAndOrder(
      funnel_id,
      funnel_order,
    );

    if (funnelStageExists) {
      throw new AppError('There is already a stage at that position.');
    }

    const funnelStage = await this.funnelStagesRepository.create({
      name,
      funnel_id,
      funnel_order,
    });

    return funnelStage;
  }
}

export default CreateFunnelStageService;

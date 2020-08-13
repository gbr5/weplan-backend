import { injectable, inject } from 'tsyringe';

import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';
import ICreateStageCardDTO from '@modules/suppliers/dtos/ICreateStageCardDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

@injectable()
class CreateStageCardService {
  constructor(
    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    weplanEvent,
    name,
    unique_name,
    isActive,
    stage_id,
    card_owner,
  }: ICreateStageCardDTO): Promise<StageCard> {
    const stageCard = await this.stageCardsRepository.create({
      weplanEvent,
      name,
      unique_name,
      isActive,
      stage_id,
      card_owner,
    });

    return stageCard;
  }
}

export default CreateStageCardService;

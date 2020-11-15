import { injectable, inject } from 'tsyringe';

import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';
import ICreateStageCardDTO from '@modules/suppliers/dtos/ICreateStageCardDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICheckListsRepository from '@modules/checklists/repositories/ICheckListsRepository';
import ICardCheckListsRepository from '@modules/checklists/repositories/ICardCheckListsRepository';
import AppError from '@shared/errors/AppError';
import IFunnelStagesRepository from '../repositories/IFunnelStagesRepository';
import IFunnelsRepository from '../repositories/IFunnelsRepository';

@injectable()
class CreateStageCardService {
  constructor(
    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,

    @inject('CheckListsRepository')
    private checkListsRepository: ICheckListsRepository,

    @inject('CardCheckListsRepository')
    private cardCheckListsRepository: ICardCheckListsRepository,

    @inject('FunnelStagesRepository')
    private funnelStagesRepository: IFunnelStagesRepository,

    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,

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
    const stage = await this.funnelStagesRepository.findById(stage_id);

    if (stage === undefined) {
      throw new AppError('Stage not found');
    }

    const funnel = await this.funnelsRepository.findById(stage.funnel_id);

    if (funnel === undefined) {
      throw new AppError('Stage not found');
    }
    const stageCard = await this.stageCardsRepository.create({
      weplanEvent,
      name,
      unique_name,
      isActive,
      stage_id,
      card_owner,
    });

    const firstCheckList = await this.checkListsRepository.create({
      name: `Tarefas | ${funnel.name}`,
      color: 'transparent',
      due_date: `${new Date()}`,
      isActive: true,
      priority: 'low',
      user_id: funnel.supplier_id,
    });
    await this.cardCheckListsRepository.create({
      card_id: stageCard.id,
      card_unique_name: stageCard.unique_name,
      check_list_id: firstCheckList.id,
    });

    return stageCard;
  }
}

export default CreateStageCardService;

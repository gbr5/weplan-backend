import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventPlanner from '@modules/events/infra/typeorm/entities/EventPlanner';
import IEventPlannersRepository from '@modules/events/repositories/IEventPlannersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  user_id: string;
  event_id: string;
  planner_id: string;
}

@injectable()
class CreateEventPlannerService {
  constructor(
    @inject('EventPlannersRepository')
    private plannersRepository: IEventPlannersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    event_id,
    planner_id,
  }: IRequest): Promise<EventPlanner> {
    const plannerExists = await this.plannersRepository.findByEventAndPlannerId(
      event_id,
      planner_id,
    );

    if (plannerExists) {
      throw new AppError('The planner that you have chosen, already exists.');
    }

    const planner = await this.plannersRepository.create({
      event_id,
      planner_id,
    });

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: 'Cerimonialista adicionado com sucesso.',
    });

    return planner;
  }
}

export default CreateEventPlannerService;

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventBudgetRepository from '@modules/events/repositories/IEventBudgetRepository';
import AppError from '@shared/errors/AppError';
import EventBudget from '../infra/typeorm/entities/EventBudget';

@injectable()
class ShowEventBudgetService {
  constructor(
    @inject('EventBudgetRepository')
    private eventBudgetRepository: IEventBudgetRepository,
  ) {}

  public async execute(event_id: string): Promise<EventBudget> {
    const eventBudget = await this.eventBudgetRepository.findByEventId(
      event_id,
    );

    if (!eventBudget) {
      throw new AppError('Event budget not found!');
    }

    return eventBudget;
  }
}

export default ShowEventBudgetService;

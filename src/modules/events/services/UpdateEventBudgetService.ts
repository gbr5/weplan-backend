import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventBudgetRepository from '@modules/events/repositories/IEventBudgetRepository';

import EventBudget from '@modules/events/infra/typeorm/entities/EventBudget';

interface IRequest {
  id: string;
  budget: number;
}
@injectable()
class UpdateEventBudgetService {
  constructor(
    @inject('EventBudgetRepository')
    private eventBudgetRepository: IEventBudgetRepository,
  ) {}

  public async execute({ id, budget }: IRequest): Promise<EventBudget> {
    const eventBudget = await this.eventBudgetRepository.findById(id);

    if (!eventBudget) {
      throw new AppError('Event budget not found.');
    }

    eventBudget.budget = budget;

    const updatedEventBudget = await this.eventBudgetRepository.save(
      eventBudget,
    );

    return updatedEventBudget;
  }
}

export default UpdateEventBudgetService;

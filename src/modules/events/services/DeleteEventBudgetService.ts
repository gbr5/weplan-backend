import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventBudgetRepository from '@modules/events/repositories/IEventBudgetRepository';

@injectable()
class DeleteEventDateService {
  constructor(
    @inject('EventBudgetRepository')
    private eventBudgetRepository: IEventBudgetRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventBudget = await this.eventBudgetRepository.findById(id);

    if (!eventBudget) {
      throw new AppError('Event date not found.');
    }

    await this.eventBudgetRepository.delete(id);
  }
}

export default DeleteEventDateService;

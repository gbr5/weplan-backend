import { getRepository, Repository } from 'typeorm';

import IEventBudgetRepository from '@modules/events/repositories/IEventBudgetRepository';

import EventBudget from '@modules/events/infra/typeorm/entities/EventBudget';
import ICreateEventBudgetDTO from '@modules/events/dtos/ICreateEventBudgetDTO';

class EventBudgetsRepository implements IEventBudgetRepository {
  private ormRepository: Repository<EventBudget>;

  constructor() {
    this.ormRepository = getRepository(EventBudget);
  }

  public async findById(id: string): Promise<EventBudget | undefined> {
    const findEventBudget = await this.ormRepository.findOne(id);

    return findEventBudget;
  }

  public async findByEventId(
    event_id: string,
  ): Promise<EventBudget | undefined> {
    const findEventBudget = await this.ormRepository.findOne({
      where: { event_id },
    });

    return findEventBudget;
  }

  public async create(data: ICreateEventBudgetDTO): Promise<EventBudget> {
    const event = this.ormRepository.create(data);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: EventBudget): Promise<EventBudget> {
    return this.ormRepository.save(event);
  }

  public async delete(event_id: string): Promise<void> {
    await this.ormRepository.delete(event_id);
  }
}

export default EventBudgetsRepository;

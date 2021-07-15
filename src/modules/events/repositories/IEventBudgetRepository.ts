import EventBudget from '@modules/events/infra/typeorm/entities/EventBudget';
import ICreateEventBudgetDTO from '@modules/events/dtos/ICreateEventBudgetDTO';

export default interface IEventBudgetsRepository {
  create(data: ICreateEventBudgetDTO): Promise<EventBudget>;
  findById(event_id: string): Promise<EventBudget | undefined>;
  findByEventId(event_id: string): Promise<EventBudget | undefined>;
  save(event: EventBudget): Promise<EventBudget>;
  delete(event_id: string): Promise<void>;
}

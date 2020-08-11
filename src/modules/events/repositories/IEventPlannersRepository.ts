import EventPlanner from '@modules/events/infra/typeorm/entities/EventPlanner';
import ICreateEventPlannerDTO from '@modules/events/dtos/ICreateEventPlannerDTO';

export default interface IEventPlannersRepository {
  create(data: ICreateEventPlannerDTO): Promise<EventPlanner>;
  findByEventAndPlannerId(
    event_name: string,
    planner_id: string,
  ): Promise<EventPlanner | undefined>;
  findByEvent(event_name: string): Promise<EventPlanner[]>;
  save(planner: EventPlanner): Promise<EventPlanner>;
  delete(planner: EventPlanner): Promise<void>;
}

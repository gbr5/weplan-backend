import { getRepository, Repository } from 'typeorm';

import IEventPlannersRepository from '@modules/events/repositories/IEventPlannersRepository';
import ICreateEventPlannerDTO from '@modules/events/dtos/ICreateEventPlannerDTO';
import EventPlanner from '@modules/events/infra/typeorm/entities/EventPlanner';

class EventPlannerRepository implements IEventPlannersRepository {
  private ormRepository: Repository<EventPlanner>;

  constructor() {
    this.ormRepository = getRepository(EventPlanner);
  }

  public async findByEventAndPlannerId(
    event_name: string,
    planner_id: string,
  ): Promise<EventPlanner | undefined> {
    const findEventPlanner = await this.ormRepository.findOne({
      where: { event_name, planner_id },
    });

    return findEventPlanner;
  }

  public async findByEvent(event_name: string): Promise<EventPlanner[]> {
    const findEventPlanner = await this.ormRepository.find({
      where: { event_name },
    });

    return findEventPlanner;
  }

  public async create({
    event_name,
    planner_id,
  }: ICreateEventPlannerDTO): Promise<EventPlanner> {
    const planner = this.ormRepository.create({
      event_name,
      planner_id,
    });

    await this.ormRepository.save(planner);

    return planner;
  }

  public async save(planner: EventPlanner): Promise<EventPlanner> {
    return this.ormRepository.save(planner);
  }

  public async delete({ event_name, planner_id }: EventPlanner): Promise<void> {
    await this.ormRepository.delete({
      event_name,
      planner_id,
    });
  }
}

export default EventPlannerRepository;

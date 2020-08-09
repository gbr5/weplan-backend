import { getRepository, Repository } from 'typeorm';

import IEventTypeSuppliersRepository from '@modules/events/repositories/IEventTypeSuppliersRepository';
import ICreateEventTypeSupplierDTO from '@modules/events/dtos/ICreateEventTypeSupplierDTO';

import EventTypeSupplier from '@modules/events/infra/typeorm/entities/EventTypeSupplier';

interface IRequest {
  user_id: string;
  event_type: string;
}

class EventTypeSupplierRepository implements IEventTypeSuppliersRepository {
  private ormRepository: Repository<EventTypeSupplier>;

  constructor() {
    this.ormRepository = getRepository(EventTypeSupplier);
  }

  public async findByEventType(
    event_type: string,
  ): Promise<EventTypeSupplier[]> {
    const findEventTypeSupplier = await this.ormRepository.find({
      where: { event_type },
    });

    return findEventTypeSupplier;
  }

  public async findByIdAndEventType({
    user_id,
    event_type,
  }: IRequest): Promise<EventTypeSupplier | undefined> {
    const findEventTypeSupplier = await this.ormRepository.findOne({
      where: {
        user_id,
        event_type,
      },
    });

    return findEventTypeSupplier;
  }

  public async create(
    userData: ICreateEventTypeSupplierDTO,
  ): Promise<EventTypeSupplier> {
    console.log('EventTypeSupplierRepository', userData);
    const event = this.ormRepository.create(userData);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: EventTypeSupplier): Promise<EventTypeSupplier> {
    return this.ormRepository.save(event);
  }

  public async delete({ user_id, event_type }: IRequest): Promise<void> {
    await this.ormRepository.delete({
      user_id,
      event_type,
    });
  }
}

export default EventTypeSupplierRepository;

import { getRepository, Repository } from 'typeorm';

import IEventTypeSuppliersRepository from '@modules/events/repositories/IEventTypeSuppliersRepository';
import ICreateEventTypeSupplierDTO from '@modules/events/dtos/ICreateEventTypeSupplierDTO';

import EventTypeSupplier from '@modules/events/infra/typeorm/entities/EventTypeSupplier';
import AppError from '@shared/errors/AppError';

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

  public async findByIdAndEventType(
    user_id: string,
    event_type: string,
  ): Promise<EventTypeSupplier | undefined> {
    try {
      const findEventTypeSupplier = await this.ormRepository.findOne({
        where: {
          user_id,
          event_type,
        },
      });
      return findEventTypeSupplier;
    } catch (err) {
      return undefined; // throw new AppError(
      //   'Algo deu errado, EventTypeSupplierRepository.findById',
      // );
    }
  }

  public async create({
    user_id,
    event_type,
  }: ICreateEventTypeSupplierDTO): Promise<EventTypeSupplier> {
    try {
      const eventTypeSupplier = this.ormRepository.create({
        user_id,
        event_type,
      });

      await this.ormRepository.save(eventTypeSupplier);

      return eventTypeSupplier;
    } catch (err) {
      throw new AppError('Algo deu errado, EventTypeSupplierRepository.create');
    }
  }

  public async save(event: EventTypeSupplier): Promise<EventTypeSupplier> {
    try {
      return this.ormRepository.save(event);
    } catch (err) {
      throw new AppError('Algo deu errado, EventTypeSupplierRepository.save');
    }
  }

  public async delete({ user_id, event_type }: IRequest): Promise<void> {
    try {
      await this.ormRepository.delete({
        user_id,
        event_type,
      });
    } catch (err) {
      throw new AppError('Algo deu errado, EventTypeSupplierRepository.delete');
    }
  }
}

export default EventTypeSupplierRepository;

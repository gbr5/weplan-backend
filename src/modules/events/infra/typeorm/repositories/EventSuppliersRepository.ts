import { getRepository, Repository } from 'typeorm';

import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import ICreateEventSupplierDTO from '@modules/events/dtos/ICreateEventSupplierDTO';
import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';

interface IRequest {
  name: string;
  event_id: string;
}

class EventSuppliersRepository implements IEventSuppliersRepository {
  private ormRepository: Repository<EventSupplier>;

  constructor() {
    this.ormRepository = getRepository(EventSupplier);
  }

  public async findById(id: string): Promise<EventSupplier | undefined> {
    const findEventSupplier = await this.ormRepository.findOne(id);

    return findEventSupplier;
  }

  public async findByNameAndEvent(
    name: string,
    event_id: string,
  ): Promise<EventSupplier | undefined> {
    const findEventSupplier = await this.ormRepository.findOne({
      where: { name, event_id },
    });

    return findEventSupplier;
  }

  public async findByEvent(event_id: string): Promise<EventSupplier[]> {
    const findEventSupplier = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventSupplier;
  }

  public async create(
    userData: ICreateEventSupplierDTO,
  ): Promise<EventSupplier> {
    const eventSupplier = this.ormRepository.create(userData);

    await this.ormRepository.save(eventSupplier);

    return eventSupplier;
  }

  public async save(eventSupplier: EventSupplier): Promise<EventSupplier> {
    return this.ormRepository.save(eventSupplier);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default EventSuppliersRepository;
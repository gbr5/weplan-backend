import { getRepository, Repository } from 'typeorm';

import IEventWeplanSuppliersRepository from '@modules/events/repositories/IEventWeplanSuppliersRepository';
import ICreateEventWeplanSupplierDTO from '@modules/events/dtos/ICreateEventWeplanSupplierDTO';
import EventWeplanSupplier from '@modules/events/infra/typeorm/entities/EventWeplanSupplier';

interface IRequest {
  name: string;
  event_id: string;
}

class EventWeplanSuppliersRepository
  implements IEventWeplanSuppliersRepository {
  private ormRepository: Repository<EventWeplanSupplier>;

  constructor() {
    this.ormRepository = getRepository(EventWeplanSupplier);
  }

  public async findByEventAndEventSupplierId(
    event_id: string,
    event_supplier_id: string,
  ): Promise<EventWeplanSupplier | undefined> {
    const findEventWeplanSupplier = await this.ormRepository.findOne({
      where: { event_id, event_supplier_id },
    });

    return findEventWeplanSupplier;
  }

  public async findById(id: string): Promise<EventWeplanSupplier | undefined> {
    const findEventWeplanSupplier = await this.ormRepository.findOne(id);

    return findEventWeplanSupplier;
  }

  public async findByEventId(event_id: string): Promise<EventWeplanSupplier[]> {
    const findEventWeplanSupplier = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventWeplanSupplier;
  }

  public async create(
    userData: ICreateEventWeplanSupplierDTO,
  ): Promise<EventWeplanSupplier> {
    const eventSupplier = this.ormRepository.create(userData);

    await this.ormRepository.save(eventSupplier);

    return eventSupplier;
  }

  public async save(
    eventSupplier: EventWeplanSupplier,
  ): Promise<EventWeplanSupplier> {
    return this.ormRepository.save(eventSupplier);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default EventWeplanSuppliersRepository;

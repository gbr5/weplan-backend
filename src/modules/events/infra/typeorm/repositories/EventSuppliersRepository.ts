import { getRepository, Repository } from 'typeorm';

import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import ICreateEventSupplierDTO from '@modules/events/dtos/ICreateEventSupplierDTO';

import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';

interface IRequest {
  supplier_id: string;
  event_name: string;
}

class EventSupplierRepository implements IEventSuppliersRepository {
  private ormRepository: Repository<EventSupplier>;

  constructor() {
    this.ormRepository = getRepository(EventSupplier);
  }

  public async findByEvent(name: string): Promise<EventSupplier[]> {
    const findEventSupplier = await this.ormRepository.find({
      where: { name },
    });

    return findEventSupplier;
  }

  public async findByIdAndEvent({
    supplier_id,
    event_name,
  }: IRequest): Promise<EventSupplier | undefined> {
    const findEventSupplier = await this.ormRepository.findOne({
      where: { supplier_id, event_name },
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

  public async delete({ supplier_id, event_name }: IRequest): Promise<void> {
    await this.ormRepository.delete({
      supplier_id,
      event_name,
    });
  }
}

export default EventSupplierRepository;

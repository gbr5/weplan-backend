import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventTypeSupplier from '@modules/events/infra/typeorm/entities/EventTypeSupplier';
import IEventTypeSuppliersRepository from '@modules/events/repositories/IEventTypeSuppliersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  event_type: string;
}

@injectable()
class ListUserEventTypeSupplierService {
  constructor(
    @inject('EventTypeSuppliersRepository')
    private eventTypeSuppliersRepository: IEventTypeSuppliersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute({ event_type }: IRequest): Promise<EventTypeSupplier[]> {
    const eventTypeSupplier = await this.eventTypeSuppliersRepository.findByEventType(
      event_type,
    );

    return eventTypeSupplier;
  }
}

export default ListUserEventTypeSupplierService;

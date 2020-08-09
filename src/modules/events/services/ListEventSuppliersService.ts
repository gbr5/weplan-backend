import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserEventSupplierService {
  constructor(
    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSuppliersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(name: string): Promise<EventSupplier[]> {
    const eventSupplier = await this.eventSuppliersRepository.findByEvent(name);

    return eventSupplier;
  }
}

export default ListUserEventSupplierService;

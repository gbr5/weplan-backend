import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import EventSupplier from '../infra/typeorm/entities/EventSupplier';

@injectable()
class ListHiredSuppliersService {
  constructor(
    @inject('EventSuppliersRepository')
    private hiredSuppliersRepository: IEventSuppliersRepository,
  ) {}

  public async execute(event_id: string): Promise<EventSupplier[]> {
    const hiredSuppliers = await this.hiredSuppliersRepository.findByEventAndIsHired(
      event_id,
    );

    return hiredSuppliers;
  }
}

export default ListHiredSuppliersService;

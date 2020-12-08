import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventWeplanSuppliersRepository from '@modules/events/repositories/IEventWeplanSuppliersRepository';
import IEventWeplanSupplierDTO from '@modules/events/dtos/ICreateEventWeplanSupplierDTO';

@injectable()
class ShowEventWeplanSuppliersService {
  constructor(
    @inject('EventWeplanSuppliersRepository')
    private eventWeplanSuppliersRepository: IEventWeplanSuppliersRepository,
  ) {}

  public async execute(
    event_id: string,
    event_supplier_id: string,
  ): Promise<IEventWeplanSupplierDTO | undefined> {
    const selectedSuppliers = await this.eventWeplanSuppliersRepository.findByEventAndEventSupplierId(
      event_id,
      event_supplier_id,
    );

    return selectedSuppliers;
  }
}

export default ShowEventWeplanSuppliersService;

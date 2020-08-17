import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import NonUserAppointmentGuest from '@modules/appointments/infra/typeorm/entities/NonUserAppointmentGuest';
import INonUserAppointmentGuestsRepository from '@modules/appointments/repositories/INonUserAppointmentGuestsRepository';

@injectable()
class ListSupplierNonUserAppointmentGuestService {
  constructor(
    @inject('NonUserAppointmentGuestsRepository')
    private nonUserAppointmentGuestsRepository: INonUserAppointmentGuestsRepository,
  ) {}

  public async execute(
    supplier_id: string,
  ): Promise<NonUserAppointmentGuest[]> {
    const supplierNonUserAppointmentGuests = await this.nonUserAppointmentGuestsRepository.findBySupplierId(
      supplier_id,
    );

    return supplierNonUserAppointmentGuests;
  }
}

export default ListSupplierNonUserAppointmentGuestService;

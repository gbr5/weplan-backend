import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import WeplanAppointmentGuest from '@modules/appointments/infra/typeorm/entities/WeplanAppointmentGuest';
import IWeplanAppointmentGuestsRepository from '@modules/appointments/repositories/IWeplanAppointmentGuestsRepository';

@injectable()
class ListWeplanAppointmentGuestService {
  constructor(
    @inject('WeplanAppointmentGuestsRepository')
    private weplanAppointmentGuestsRepository: IWeplanAppointmentGuestsRepository,
  ) {}

  public async execute(supplier_id: string): Promise<WeplanAppointmentGuest[]> {
    const weplanAppointmentGuests = await this.weplanAppointmentGuestsRepository.findByUserId(
      supplier_id,
    );

    return weplanAppointmentGuests;
  }
}

export default ListWeplanAppointmentGuestService;

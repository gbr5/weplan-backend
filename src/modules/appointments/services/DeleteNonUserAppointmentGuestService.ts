import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INonUserAppointmentGuestRepository from '@modules/appointments/repositories/INonUserAppointmentGuestsRepository';

@injectable()
class DeleteNonUserAppointmentGuestService {
  constructor(
    @inject('SupplierNonUserAppointmentGuestsRepository')
    private nonUserNonUserAppointmentGuestsRepository: INonUserAppointmentGuestRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findNonUserAppointmentGuest = await this.nonUserNonUserAppointmentGuestsRepository.findById(
      id,
    );

    if (!findNonUserAppointmentGuest) {
      throw new AppError('Appointment guest not found.');
    }

    await this.nonUserNonUserAppointmentGuestsRepository.delete(
      findNonUserAppointmentGuest,
    );
  }
}

export default DeleteNonUserAppointmentGuestService;

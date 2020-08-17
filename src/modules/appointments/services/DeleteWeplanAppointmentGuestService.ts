import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IWeplanAppointmentGuestRepository from '@modules/appointments/repositories/IWeplanAppointmentGuestsRepository';

@injectable()
class DeleteWeplanAppointmentGuestService {
  constructor(
    @inject('WeplanAppointmentGuestsRepository')
    private appointmentGuestsRepository: IWeplanAppointmentGuestRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findWeplanAppointmentGuest = await this.appointmentGuestsRepository.findById(
      id,
    );

    if (!findWeplanAppointmentGuest) {
      throw new AppError('Appointment guest found.');
    }

    await this.appointmentGuestsRepository.delete(findWeplanAppointmentGuest);
  }
}

export default DeleteWeplanAppointmentGuestService;

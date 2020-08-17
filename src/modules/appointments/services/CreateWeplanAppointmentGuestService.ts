import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import WeplanAppointmentGuest from '@modules/appointments/infra/typeorm/entities/WeplanAppointmentGuest';
import ICreateWeplanAppointmentGuestDTO from '@modules/appointments/dtos/ICreateWeplanAppointmentGuestDTO';
import IWeplanAppointmentGuestsRepository from '@modules/appointments/repositories/IWeplanAppointmentGuestsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateWeplanAppointmentGuestService {
  constructor(
    @inject('WeplanAppointmentGuestsRepository')
    private weplanAppointmentGuestsRepository: IWeplanAppointmentGuestsRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    guest_id,
    appointment_id,
    host_id,
  }: ICreateWeplanAppointmentGuestDTO): Promise<WeplanAppointmentGuest> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );
    const supplier = await this.usersRepository.findById(host_id);
    const guest = await this.usersRepository.findById(guest_id);

    if (!appointment) {
      throw new AppError('Appointment not found.');
    }
    if (!supplier) {
      throw new AppError('Host not found.');
    }
    if (!guest) {
      throw new AppError('Guest not found.');
    }

    const weplanAppointmentGuest = await this.weplanAppointmentGuestsRepository.create(
      {
        guest_id,
        appointment_id,
        host_id,
      },
    );

    return weplanAppointmentGuest;
  }
}

export default CreateWeplanAppointmentGuestService;

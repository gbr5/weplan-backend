import { startOfHour, isBefore } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import WeplanAppointmentGuest from '@modules/appointments/infra/typeorm/entities/WeplanAppointmentGuest';
import ICreateWeplanUsersAppointmentDTO from '@modules/appointments/dtos/ICreateWeplanUsersAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IWeplanAppointmentGuestsRepository from '@modules/appointments/repositories/IWeplanAppointmentGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('WeplanAppointmentGuestsRepository')
    private weplanAppointmentGuestsRepository: IWeplanAppointmentGuestsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    subject,
    date,
    address,
    host_id,
    appointment_type,
    weplanGuest,
    guest_id,
  }: ICreateWeplanUsersAppointmentDTO): Promise<{
    id: string;
    subject: string;
    date: Date;
    address: string;
    appointment_type: string;
    host: User;
    guest: WeplanAppointmentGuest;
  }> {
    const findHost = await this.usersRepository.findById(host_id);
    if (!findHost) {
      throw new AppError('User not found.');
    }
    const findGuest = await this.usersRepository.findById(guest_id);
    if (!findGuest) {
      throw new AppError('User not found.');
    }

    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    const findHostAppointment = await this.appointmentsRepository.findByDateAndUsers(
      date,
      host_id,
    );
    if (findHostAppointment) {
      throw new AppError(
        'This host already have an appointment for this date.',
      );
    }
    const findGuestAppointment = await this.appointmentsRepository.findByDateAndUsers(
      date,
      guest_id,
    );
    if (findGuestAppointment) {
      throw new AppError(
        'This guest already have an appointment for this date.',
      );
    }

    const appointment = await this.appointmentsRepository.create({
      subject,
      date,
      address,
      appointment_type,
      weplanGuest,
      host_id,
    });

    const guest = await this.weplanAppointmentGuestsRepository.create({
      appointment_id: appointment.id,
      guest_id,
      host_id,
    });

    return {
      id: appointment.id,
      subject: appointment.subject,
      date: appointment.date,
      address: appointment.address,
      appointment_type: appointment.appointment_type,
      host: appointment.Host,
      guest,
    };
  }
}

export default CreateAppointmentService;

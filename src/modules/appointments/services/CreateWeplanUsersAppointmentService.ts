import { startOfHour, isBefore } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateWeplanUsersAppointmentDTO from '@modules/appointments/dtos/ICreateWeplanUsersAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IWeplanAppointmentGuestsRepository from '@modules/appointments/repositories/IWeplanAppointmentGuestsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentDurationsRepository from '../repositories/IAppointmentDurationsRepository';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('WeplanAppointmentGuestsRepository')
    private weplanAppointmentGuestsRepository: IWeplanAppointmentGuestsRepository,

    @inject('AppointmentDurationsRepository')
    private appointmentDurationsRepository: IAppointmentDurationsRepository,

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
    duration_minutes,
  }: ICreateWeplanUsersAppointmentDTO): Promise<{
    id: string;
    subject: string;
    date: Date;
    address: string;
    duration_minutes: number;
    appointment_type: string;
    host: User;
    guest: User;
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

    const findAppointmentDurations = await this.appointmentDurationsRepository.findByAppointmentId(
      appointment.id,
    );

    const findAppointmentDuration = findAppointmentDurations.filter(
      duration => duration.appointment_id,
    );

    console.log(findAppointmentDuration);

    if (findAppointmentDuration === []) {
      throw new AppError(
        'The duration for this appointment is already defined.',
      );
    }

    const guest = await this.weplanAppointmentGuestsRepository.create({
      appointment_id: appointment.id,
      guest_id,
      host_id,
    });

    const minutes = duration_minutes;
    const duration = await this.appointmentDurationsRepository.create({
      minutes,
      appointment_id: appointment.id,
    });
    console.log(duration_minutes, minutes, appointment.date);

    return {
      id: appointment.id,
      subject: appointment.subject,
      date: appointment.date,
      duration_minutes: duration.minutes,
      address: appointment.address,
      appointment_type: appointment.appointment_type,
      host: appointment.Host,
      guest: guest.Guest,
    };
  }
}

export default CreateAppointmentService;

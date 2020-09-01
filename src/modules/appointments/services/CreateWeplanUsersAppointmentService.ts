import { isBefore, startOfMinute } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateWeplanUsersAppointmentDTO from '@modules/appointments/dtos/ICreateWeplanUsersAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IWeplanAppointmentGuestsRepository from '@modules/appointments/repositories/IWeplanAppointmentGuestsRepository';
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
    const formattedDuration = duration_minutes - 1;
    const endOfAppointment = startOfMinute(date).setMinutes(
      date.getMinutes(),
      formattedDuration * 60,
    );

    if (isBefore(date, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const findAppointments = await this.appointmentsRepository.findAllInDayFromSupplier(
      {
        year,
        month,
        day,
        host_id,
      },
    );

    findAppointments.map(oldAppointment => {
      const endOfNewAppointment = new Date(endOfAppointment);
      const startOfOldAppointment = startOfMinute(oldAppointment.date);
      const endAppointment = startOfMinute(oldAppointment.date).setMinutes(
        startOfOldAppointment.getMinutes(),
        oldAppointment.duration_minutes * 60,
      );
      const endOfOldAppointment = new Date(endAppointment);

      if (
        !(
          (date < startOfOldAppointment &&
            date < endOfOldAppointment &&
            endOfNewAppointment < startOfOldAppointment &&
            endOfNewAppointment < endOfOldAppointment) ||
          (date > startOfOldAppointment &&
            date > endOfOldAppointment &&
            endOfNewAppointment > startOfOldAppointment &&
            endOfNewAppointment > endOfOldAppointment)
        )
      ) {
        const startHour = startOfOldAppointment.getHours();
        const startMinutes = startOfOldAppointment.getMinutes();
        const endHour = endOfOldAppointment.getHours();
        const endMinutes = endOfOldAppointment.getMinutes();
        throw new AppError(
          `You already have an appointment at this date, ${startHour}:${startMinutes}-${endHour}:${endMinutes}`,
        );
      }
      return true;
    });

    const findGuestAppointments = await this.appointmentsRepository.findAllInDayFromSupplier(
      {
        year,
        month,
        day,
        host_id: guest_id,
      },
    );

    findGuestAppointments.map(oldAppointment => {
      const endOfNewAppointment = new Date(endOfAppointment);
      const startOfOldAppointment = startOfMinute(oldAppointment.date);
      const endAppointment = startOfMinute(oldAppointment.date).setMinutes(
        startOfOldAppointment.getMinutes(),
        oldAppointment.duration_minutes * 60,
      );
      const endOfOldAppointment = new Date(endAppointment);

      if (
        !(
          (date < startOfOldAppointment &&
            date < endOfOldAppointment &&
            endOfNewAppointment < startOfOldAppointment &&
            endOfNewAppointment < endOfOldAppointment) ||
          (date > startOfOldAppointment &&
            date > endOfOldAppointment &&
            endOfNewAppointment > startOfOldAppointment &&
            endOfNewAppointment > endOfOldAppointment)
        )
      ) {
        const startHour = startOfOldAppointment.getHours();
        const startMinutes = startOfOldAppointment.getMinutes();
        const endHour = endOfOldAppointment.getHours();
        const endMinutes = endOfOldAppointment.getMinutes();
        throw new AppError(
          `The guest already have an appointment at this date, ${startHour}:${startMinutes}-${endHour}:${endMinutes}`,
        );
      }
      return true;
    });

    const appointment = await this.appointmentsRepository.create({
      subject,
      date,
      address,
      appointment_type,
      weplanGuest,
      host_id,
      duration_minutes,
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
      duration_minutes: appointment.duration_minutes,
      address: appointment.address,
      appointment_type: appointment.appointment_type,
      host: appointment.Host,
      guest: guest.Guest,
    };
  }
}

export default CreateAppointmentService;

import { isBefore, startOfMinute } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import NonUserAppointmentGuest from '@modules/appointments/infra/typeorm/entities/NonUserAppointmentGuest';
import ICreateSupplierNonUserAppointmentDTO from '@modules/appointments/dtos/ICreateSupplierNonUserAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INonUserAppointmentGuestsRepository from '@modules/appointments/repositories/INonUserAppointmentGuestsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NonUserAppointmentGuestsRepository')
    private nonUserAppointmentGuestsRepository: INonUserAppointmentGuestsRepository,

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
    name,
    email,
    phone,
    description,
    duration_minutes,
  }: ICreateSupplierNonUserAppointmentDTO): Promise<{
    appointment_type: string;
    host: User;
    guest: NonUserAppointmentGuest;
    subject: string;
    date: Date;
    duration_minutes: number;
    address: string;
    id: string;
  }> {
    const host = await this.usersRepository.findById(host_id);

    if (!host) {
      throw new AppError('User not found.');
    }
    const endOfAppointment = startOfMinute(date).setMinutes(
      date.getMinutes(),
      duration_minutes * 60,
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
          `There is already an appointment at this time, ${startHour}:${startMinutes}-${endHour}:${endMinutes}`,
        );
      }
      return true;
    });
    // if (findAppointments === []) {
    //   throw new AppError(
    //     'This host already have an appointment for this date.',
    //   );
    // }

    const appointment = await this.appointmentsRepository.create({
      subject,
      date,
      address,
      appointment_type,
      weplanGuest,
      host_id,
      duration_minutes,
    });

    const guest = await this.nonUserAppointmentGuestsRepository.create({
      name,
      email,
      phone,
      description,
      appointment_id: appointment.id,
      supplier_id: host_id,
    });

    return {
      id: appointment.id,
      subject: appointment.subject,
      date: appointment.date,
      duration_minutes: appointment.duration_minutes,
      address: appointment.address,
      appointment_type: appointment.appointment_type,
      host: appointment.Host,
      guest,
    };
  }
}

export default CreateAppointmentService;

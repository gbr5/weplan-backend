import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { isSameDay } from 'date-fns';
import IWeplanAppointmentGuestsRepository from '../repositories/IWeplanAppointmentGuestsRepository';

interface IRequest {
  user_id: string;
  day: string;
  month: string;
  year: string;
}

@injectable()
class ListAllUserAppointmentsByDateService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('WeplanAppointmentGuestsRepository')
    private weplanAppointmentGuestsRepository: IWeplanAppointmentGuestsRepository,
  ) {}

  public async execute({
    user_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const userAppointments = await this.appointmentsRepository.findByHostId(
      user_id,
    );

    const userAsGuestAppointments = await this.weplanAppointmentGuestsRepository.findByUserId(
      user_id,
    );

    const guestAppointmentIds = userAsGuestAppointments.map(appointment => {
      return {
        id: appointment.appointment_id,
      };
    });

    const guestAppointments = await this.appointmentsRepository.findByIds(
      guestAppointmentIds,
    );
    const appointments: Appointment[] = [];
    const thisDate = new Date(`${Number(month)}/${day}/${year}`);

    guestAppointments.map(appointment => {
      if (isSameDay(appointment.date, thisDate)) {
        appointments.push(appointment);
      }
      return appointment;
    });

    userAppointments.map(appointment => {
      if (isSameDay(appointment.date, thisDate)) {
        appointments.push(appointment);
      }
      return appointment;
    });

    return appointments;
  }
}

export default ListAllUserAppointmentsByDateService;
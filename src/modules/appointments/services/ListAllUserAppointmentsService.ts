import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IWeplanAppointmentGuestsRepository from '../repositories/IWeplanAppointmentGuestsRepository';

@injectable()
class ListAllUserAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('WeplanAppointmentGuestsRepository')
    private weplanAppointmentGuestsRepository: IWeplanAppointmentGuestsRepository,
  ) {}

  public async execute(user_id: string): Promise<Appointment[]> {
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

    guestAppointments.map(appointment => {
      appointments.push(appointment);
      return appointment;
    });

    userAppointments.map(appointment => {
      appointments.push(appointment);
      return appointment;
    });

    return appointments;
  }
}

export default ListAllUserAppointmentsService;

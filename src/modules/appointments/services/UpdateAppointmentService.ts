import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

@injectable()
class UpdateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute(
    id: string,
    subject: string,
    date: Date,
    duration_minutes: number,
    address: string,
    appointment_type: string,
    weplanGuest: boolean,
  ): Promise<Appointment> {
    const findAppointment = await this.appointmentsRepository.findById(id);

    if (!findAppointment) {
      throw new AppError('Appointment day interval not found.');
    }

    findAppointment.subject = subject;
    findAppointment.date = date;
    findAppointment.duration_minutes = duration_minutes;
    findAppointment.address = address;
    findAppointment.appointment_type = appointment_type;
    findAppointment.weplanGuest = weplanGuest;

    const updatedAppointment = await this.appointmentsRepository.save(
      findAppointment,
    );

    return updatedAppointment;
  }
}

export default UpdateAppointmentService;

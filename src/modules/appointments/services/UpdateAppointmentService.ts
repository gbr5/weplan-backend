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
    date: Date,
    duration_minutes: number,
    subject: string,
    appointment_type: string,
    weplanGuest: boolean,
    address: string,
  ): Promise<Appointment> {
    const findAppointment = await this.appointmentsRepository.findById(id);

    if (!findAppointment) {
      throw new AppError('Appointment day interval not found.');
    }

    findAppointment.weplanGuest = weplanGuest;
    findAppointment.address = address;
    findAppointment.duration_minutes = duration_minutes;
    findAppointment.subject = subject;
    findAppointment.appointment_type = appointment_type;
    findAppointment.date = date;

    const updatedAppointment = await this.appointmentsRepository.save(
      findAppointment,
    );

    return updatedAppointment;
  }
}

export default UpdateAppointmentService;

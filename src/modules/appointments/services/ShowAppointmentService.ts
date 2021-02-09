import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

@injectable()
class ShowAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(id: string): Promise<Appointment | undefined> {
    const appointment = await this.appointmentsRepository.findById(id);

    return appointment;
  }
}

export default ShowAppointmentService;

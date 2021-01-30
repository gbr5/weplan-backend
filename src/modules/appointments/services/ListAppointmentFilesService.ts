import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppointmentFile from '@modules/appointments/infra/typeorm/entities/AppointmentFile';
import IAppointmentFilesRepository from '@modules/appointments/repositories/IAppointmentFilesRepository';

@injectable()
class ListAppointmentFileService {
  constructor(
    @inject('AppointmentFilesRepository')
    private appointmentFilesRepository: IAppointmentFilesRepository,
  ) {}

  public async execute(appointment_id: string): Promise<AppointmentFile[]> {
    const AppointmentFiles = await this.appointmentFilesRepository.findByAppointment(
      appointment_id,
    );

    return AppointmentFiles;
  }
}

export default ListAppointmentFileService;

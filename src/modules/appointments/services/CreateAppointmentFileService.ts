import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import AppointmentFile from '@modules/appointments/infra/typeorm/entities/AppointmentFile';
import ICreateAppointmentFileDTO from '@modules/appointments/dtos/ICreateAppointmentFileDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentFilesRepository from '../repositories/IAppointmentFilesRepository';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('AppointmentFilesRepository')
    private appointmentFilesRepository: IAppointmentFilesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    appointment_id,
    file_id,
  }: ICreateAppointmentFileDTO): Promise<AppointmentFile> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Appointment not found.');
    }

    const findAppointmentFile = await this.appointmentFilesRepository.findByFileAndAppointment(
      {
        file_id,
        appointment_id,
      },
    );

    if (findAppointmentFile) {
      throw new AppError('This file is already attached to this appointment.');
    }

    const appointmentFile = await this.appointmentFilesRepository.create({
      file_id,
      appointment_id,
    });

    return appointmentFile;
  }
}

export default CreateAppointmentService;

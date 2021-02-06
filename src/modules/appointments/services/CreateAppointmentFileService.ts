import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import AppointmentFile from '@modules/appointments/infra/typeorm/entities/AppointmentFile';
import ICreateAppointmentFilesDTO from '@modules/appointments/dtos/ICreateAppointmentFilesDTO';
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
    files,
  }: ICreateAppointmentFilesDTO): Promise<AppointmentFile[]> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Appointment not found.');
    }

    const appointmentFiles = Promise.all([
      files.map(async file => {
        return this.appointmentFilesRepository.create({
          file_id: file.id,
          appointment_id,
        });
      }),
    ]);
    const xFiles: AppointmentFile[] = [];
    (await appointmentFiles).map(file => {
      file.map(async xFile => {
        xFiles.push(await xFile);
        return xFile;
      });
      return file;
    });

    return xFiles;
  }
}

export default CreateAppointmentService;

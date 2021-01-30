import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentFileRepository from '@modules/appointments/repositories/IAppointmentFilesRepository';

@injectable()
class DeleteAppointmentFileService {
  constructor(
    @inject('AppointmentFilesRepository')
    private appointmentFilesRepository: IAppointmentFileRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findAppointmentFile = await this.appointmentFilesRepository.findById(
      id,
    );

    if (!findAppointmentFile) {
      throw new AppError('AppointmentFile not found.');
    }

    await this.appointmentFilesRepository.delete(findAppointmentFile);
  }
}

export default DeleteAppointmentFileService;

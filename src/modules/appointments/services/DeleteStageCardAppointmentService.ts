import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStageCardAppointmentRepository from '@modules/appointments/repositories/IStageCardAppointmentsRepository';

@injectable()
class DeleteStageCardAppointmentService {
  constructor(
    @inject('SupplierStageCardAppointmentsRepository')
    private stageCardAppointmentsRepository: IStageCardAppointmentRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findStageCardAppointment = await this.stageCardAppointmentsRepository.findById(
      id,
    );

    if (!findStageCardAppointment) {
      throw new AppError('Appointment not found.');
    }

    await this.stageCardAppointmentsRepository.delete(findStageCardAppointment);
  }
}

export default DeleteStageCardAppointmentService;

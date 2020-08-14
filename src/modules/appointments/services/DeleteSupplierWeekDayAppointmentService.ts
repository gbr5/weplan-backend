import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISupplierWeekDayAppointmentRepository from '@modules/appointments/repositories/ISupplierWeekDayAppointmentsRepository';

@injectable()
class DeleteSupplierWeekDayAppointmentService {
  constructor(
    @inject('SupplierWeekDayAppointmentsRepository')
    private appointmentsRepository: ISupplierWeekDayAppointmentRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findSupplierWeekDayAppointment = await this.appointmentsRepository.findByWeekDayId(
      id,
    );

    if (!findSupplierWeekDayAppointment) {
      throw new AppError('Week day appointment not found.');
    }

    console.log(findSupplierWeekDayAppointment);

    await this.appointmentsRepository.delete(findSupplierWeekDayAppointment);
  }
}

export default DeleteSupplierWeekDayAppointmentService;

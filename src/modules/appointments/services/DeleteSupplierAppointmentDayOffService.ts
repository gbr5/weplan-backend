import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISupplierAppointmentDayOffRepository from '@modules/appointments/repositories/ISupplierAppointmentDaysOffRepository';

@injectable()
class DeleteSupplierAppointmentDayOffService {
  constructor(
    @inject('SupplierAppointmentDaysOffRepository')
    private appointmentsRepository: ISupplierAppointmentDayOffRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findSupplierAppointmentDayOff = await this.appointmentsRepository.findByWeekDayId(
      id,
    );

    if (!findSupplierAppointmentDayOff) {
      throw new AppError('Week day appointment not found.');
    }

    await this.appointmentsRepository.delete(findSupplierAppointmentDayOff);
  }
}

export default DeleteSupplierAppointmentDayOffService;

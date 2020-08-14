import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import SupplierWeekDayAppointment from '@modules/appointments/infra/typeorm/entities/SupplierWeekDayAppointment';
import ISupplierWeekDayAppointmentRepository from '@modules/appointments/repositories/ISupplierWeekDayAppointmentsRepository';

interface IRequest {
  supplier_id: string;
  week_day: string;
}

// Dependency Inversion (SOLID principles)
@injectable()
class CreateSupplierWeekDayAppointmentService {
  constructor(
    @inject('SupplierWeekDayAppointmentsRepository')
    private appointmentsRepository: ISupplierWeekDayAppointmentRepository,
  ) {}

  public async execute({
    supplier_id,
    week_day,
  }: IRequest): Promise<SupplierWeekDayAppointment> {
    const findSupplierWeekDayAppointments = await this.appointmentsRepository.findBySupplierId(
      supplier_id,
    );

    const findSupplierWeekDayAppointment = findSupplierWeekDayAppointments.filter(
      weekDay => weekDay.week_day === week_day,
    );

    if (findSupplierWeekDayAppointment) {
      throw new AppError('This supplier already registered this week day.');
    }

    const supplierWeekDayAppointment = await this.appointmentsRepository.create(
      {
        supplier_id,
        week_day,
      },
    );

    return supplierWeekDayAppointment;
  }
}

export default CreateSupplierWeekDayAppointmentService;

import SupplierWeekDayAppointment from '@modules/appointments/infra/typeorm/entities/SupplierWeekDayAppointment';
import ICreateSupplierWeekDayAppointmentDTO from '@modules/appointments/dtos/ICreateSupplierWeekDayAppointmentDTO';

export default interface ISupplierWeekDayAppointmentsRepository {
  create(
    data: ICreateSupplierWeekDayAppointmentDTO,
  ): Promise<SupplierWeekDayAppointment>;
  findByWeekDayId(id: string): Promise<SupplierWeekDayAppointment | undefined>;
  findBySupplierId(supplier_id: string): Promise<SupplierWeekDayAppointment[]>;
  delete(
    supplier_week_day_appointment: SupplierWeekDayAppointment,
  ): Promise<void>;
}

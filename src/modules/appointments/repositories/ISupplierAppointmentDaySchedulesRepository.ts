import SupplierAppointmentDaySchedule from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDaySchedule';
import ICreateSupplierAppointmentDayScheduleDTO from '@modules/appointments/dtos/ICreateSupplierAppointmentDayScheduleDTO';

export default interface ISupplierAppointmentDaySchedulesRepository {
  create(
    data: ICreateSupplierAppointmentDayScheduleDTO,
  ): Promise<SupplierAppointmentDaySchedule>;
  findBySupplierAppointmentDayScheduleId(
    id: string,
  ): Promise<SupplierAppointmentDaySchedule | undefined>;
  findBySupplierId(
    supplier_id: string,
  ): Promise<SupplierAppointmentDaySchedule[]>;
  delete(
    supplier_week_day_appointment: SupplierAppointmentDaySchedule,
  ): Promise<void>;
}

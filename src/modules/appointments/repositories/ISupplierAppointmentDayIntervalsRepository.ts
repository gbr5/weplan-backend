import SupplierAppointmentDayInterval from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayInterval';
import ICreateSupplierAppointmentDayIntervalDTO from '@modules/appointments/dtos/ICreateSupplierAppointmentDayIntervalDTO';

export default interface ISupplierAppointmentDayIntervalsRepository {
  create(
    data: ICreateSupplierAppointmentDayIntervalDTO,
  ): Promise<SupplierAppointmentDayInterval>;
  findBySupplierAppointmentDayIntervalId(
    id: string,
  ): Promise<SupplierAppointmentDayInterval | undefined>;
  findBySupplierId(
    supplier_id: string,
  ): Promise<SupplierAppointmentDayInterval[]>;
  save(
    supplierAppointmentDayInterval: SupplierAppointmentDayInterval,
  ): Promise<SupplierAppointmentDayInterval>;
  delete(
    supplierAppointmentDayInterval: SupplierAppointmentDayInterval,
  ): Promise<void>;
}

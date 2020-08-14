import SupplierAppointmentDayOff from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayOff';
import ICreateSupplierAppointmentDayOffDTO from '@modules/appointments/dtos/ICreateSupplierAppointmentDayOffDTO';

export default interface ISupplierAppointmentDayOffsRepository {
  create(
    data: ICreateSupplierAppointmentDayOffDTO,
  ): Promise<SupplierAppointmentDayOff>;
  findByWeekDayId(id: string): Promise<SupplierAppointmentDayOff | undefined>;
  findBySupplierId(supplier_id: string): Promise<SupplierAppointmentDayOff[]>;
  delete(supplierAppointmentDayOff: SupplierAppointmentDayOff): Promise<void>;
}

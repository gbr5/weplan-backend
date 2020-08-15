export default interface ICreatSupplierAppointmentDayScheduleDTO {
  start_hour: number;
  end_hour: number;
  duration_minutes: number;
  interval: boolean;
  supplier_id: string;
  week_day_id: string;
}

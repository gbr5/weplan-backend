import StageCardAppointment from '@modules/appointments/infra/typeorm/entities/StageCardAppointment';
import ICreateStageCardAppointmentDTO from '@modules/appointments/dtos/ICreateStageCardAppointmentDTO';

export default interface IStageCardAppointmentsRepository {
  create(data: ICreateStageCardAppointmentDTO): Promise<StageCardAppointment>;
  // findByDateAndSupplier(
  //   date: Date,
  //   guest_id: string,
  //   host_id: string,
  // ): Promise<StageCardAppointment | undefined>;
  findByStageCardId(card_id: string): Promise<StageCardAppointment[]>;
  findById(id: string): Promise<StageCardAppointment | undefined>;
  delete(data: ICreateStageCardAppointmentDTO): Promise<void>;
}

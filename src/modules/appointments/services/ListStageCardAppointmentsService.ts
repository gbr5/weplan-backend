import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import StageCardAppointment from '@modules/appointments/infra/typeorm/entities/StageCardAppointment';
import IStageCardAppointmentsRepository from '@modules/appointments/repositories/IStageCardAppointmentsRepository';

@injectable()
class ListSupplierStageCardAppointmentService {
  constructor(
    @inject('StageCardAppointmentsRepository')
    private stageCardAppointmentsRepository: IStageCardAppointmentsRepository,
  ) {}

  public async execute(card_id: string): Promise<StageCardAppointment[]> {
    const stageCardAppointments = await this.stageCardAppointmentsRepository.findByStageCardId(
      card_id,
    );

    return stageCardAppointments;
  }
}

export default ListSupplierStageCardAppointmentService;

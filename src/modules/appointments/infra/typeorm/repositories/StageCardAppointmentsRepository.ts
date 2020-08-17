import { getRepository, Repository } from 'typeorm';

import IStageCardAppointmentsRepository from '@modules/appointments/repositories/IStageCardAppointmentsRepository';
import ICreateStageCardAppointmentDTO from '@modules/appointments/dtos/ICreateStageCardAppointmentDTO';

import StageCardAppointment from '@modules/appointments/infra/typeorm/entities/StageCardAppointment';

class StageCardAppointmentsRepository
  implements IStageCardAppointmentsRepository {
  private ormRepository: Repository<StageCardAppointment>;

  constructor() {
    this.ormRepository = getRepository(StageCardAppointment);
  }

  public async findById(id: string): Promise<StageCardAppointment | undefined> {
    const findStageCardAppointment = await this.ormRepository.findOne({ id });

    return findStageCardAppointment;
  }

  public async findByStageCardId(
    stagecard_id: string,
  ): Promise<StageCardAppointment[]> {
    const findStageCardAppointment = await this.ormRepository.find({
      where: { stagecard_id },
    });

    return findStageCardAppointment;
  }

  public async create({
    appointment_id,
    card_id,
  }: ICreateStageCardAppointmentDTO): Promise<StageCardAppointment> {
    const stagecardAppointment = this.ormRepository.create({
      appointment_id,
      card_id,
    });

    await this.ormRepository.save(stagecardAppointment);

    return stagecardAppointment;
  }

  public async delete({ id }: StageCardAppointment): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default StageCardAppointmentsRepository;

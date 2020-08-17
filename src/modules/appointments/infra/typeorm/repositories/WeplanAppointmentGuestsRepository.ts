import { getRepository, Repository } from 'typeorm';

import IWeplanAppointmentGuestsRepository from '@modules/appointments/repositories/IWeplanAppointmentGuestsRepository';
import ICreateWeplanAppointmentGuestDTO from '@modules/appointments/dtos/ICreateWeplanAppointmentGuestDTO';

import WeplanAppointmentGuest from '@modules/appointments/infra/typeorm/entities/WeplanAppointmentGuest';

class WeplanAppointmentGuestsRepository
  implements IWeplanAppointmentGuestsRepository {
  private ormRepository: Repository<WeplanAppointmentGuest>;

  constructor() {
    this.ormRepository = getRepository(WeplanAppointmentGuest);
  }

  public async findById(
    id: string,
  ): Promise<WeplanAppointmentGuest | undefined> {
    const findWeplanAppointmentGuest = await this.ormRepository.findOne({ id });

    return findWeplanAppointmentGuest;
  }

  public async findByHostId(
    host_id: string,
  ): Promise<WeplanAppointmentGuest[]> {
    const findWeplanAppointmentGuest = await this.ormRepository.find({
      where: { host_id },
    });

    return findWeplanAppointmentGuest;
  }

  public async create({
    appointment_id,
    host_id,
    guest_id,
  }: ICreateWeplanAppointmentGuestDTO): Promise<WeplanAppointmentGuest> {
    const weplanAppointmentGuest = this.ormRepository.create({
      appointment_id,
      host_id,
      guest_id,
    });

    await this.ormRepository.save(weplanAppointmentGuest);

    return weplanAppointmentGuest;
  }

  public async delete({ id }: WeplanAppointmentGuest): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default WeplanAppointmentGuestsRepository;

import { getRepository, Repository } from 'typeorm';

import INonUserAppointmentGuestsRepository from '@modules/appointments/repositories/INonUserAppointmentGuestsRepository';
import ICreateNonUserAppointmentGuestDTO from '@modules/appointments/dtos/ICreateNonUserAppointmentGuestDTO';

import NonUserAppointmentGuest from '@modules/appointments/infra/typeorm/entities/NonUserAppointmentGuest';

class NonUserAppointmentGuestsRepository
  implements INonUserAppointmentGuestsRepository {
  private ormRepository: Repository<NonUserAppointmentGuest>;

  constructor() {
    this.ormRepository = getRepository(NonUserAppointmentGuest);
  }

  public async findById(
    id: string,
  ): Promise<NonUserAppointmentGuest | undefined> {
    const findNonUserAppointmentGuest = await this.ormRepository.findOne({
      id,
    });

    return findNonUserAppointmentGuest;
  }

  public async findBySupplierId(
    supplier_id: string,
  ): Promise<NonUserAppointmentGuest[]> {
    const findNonUserAppointmentGuest = await this.ormRepository.find({
      where: { supplier_id },
    });

    return findNonUserAppointmentGuest;
  }

  public async create({
    name,
    phone,
    email,
    description,
    appointment_id,
    supplier_id,
  }: ICreateNonUserAppointmentGuestDTO): Promise<NonUserAppointmentGuest> {
    const nonUserAppointmentGuest = this.ormRepository.create({
      name,
      phone,
      email,
      description,
      appointment_id,
      supplier_id,
    });

    await this.ormRepository.save(nonUserAppointmentGuest);

    return nonUserAppointmentGuest;
  }

  public async delete({ id }: NonUserAppointmentGuest): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default NonUserAppointmentGuestsRepository;

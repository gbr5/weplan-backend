import { getRepository, Repository } from 'typeorm';

import IAppointmentTypesRepository from '@modules/appointments/repositories/IAppointmentTypesRepository';

import AppointmentType from '@modules/appointments/infra/typeorm/entities/AppointmentType';

class AppointmentTypesRepository implements IAppointmentTypesRepository {
  private ormRepository: Repository<AppointmentType>;

  constructor() {
    this.ormRepository = getRepository(AppointmentType);
  }

  public async findByName(name: string): Promise<AppointmentType | undefined> {
    const findAppointmentType = await this.ormRepository.findOne({ name });

    return findAppointmentType;
  }

  public async create(name: string): Promise<AppointmentType> {
    const appointmentType = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(appointmentType);

    return appointmentType;
  }
}

export default AppointmentTypesRepository;

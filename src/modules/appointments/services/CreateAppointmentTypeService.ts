import { injectable, inject } from 'tsyringe';

import AppointmentType from '@modules/appointments/infra/typeorm/entities/AppointmentType';
import IAppointmentTypeRepository from '@modules/appointments/repositories/IAppointmentTypesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateAppointmentTypeService {
  constructor(
    @inject('AppointmentTypesRepository')
    private appointmentsRepository: IAppointmentTypeRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(name: string): Promise<AppointmentType> {
    const appointmentTypeExists = await this.appointmentsRepository.findByName(
      name,
    );

    if (appointmentTypeExists) {
      throw new AppError('This type of appointment already exists.');
    }

    const appointmentType = await this.appointmentsRepository.create(name);

    return appointmentType;
  }
}

export default CreateAppointmentTypeService;

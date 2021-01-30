import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppointmentType from '@modules/appointments/infra/typeorm/entities/AppointmentType';
import IAppointmentTypesRepository from '@modules/appointments/repositories/IAppointmentTypesRepository';

@injectable()
class ListSupplierAppointmentTypeService {
  constructor(
    @inject('AppointmentTypesRepository')
    private appointmentTypesRepository: IAppointmentTypesRepository,
  ) {}

  public async execute(): Promise<AppointmentType[]> {
    const AppointmentTypes = await this.appointmentTypesRepository.find();

    return AppointmentTypes;
  }
}

export default ListSupplierAppointmentTypeService;

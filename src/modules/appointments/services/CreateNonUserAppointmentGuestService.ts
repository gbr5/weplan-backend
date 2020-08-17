import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import NonUserAppointmentGuest from '@modules/appointments/infra/typeorm/entities/NonUserAppointmentGuest';
import ICreateNonUserAppointmentGuestDTO from '@modules/appointments/dtos/ICreateNonUserAppointmentGuestDTO';
import INonUserAppointmentGuestsRepository from '@modules/appointments/repositories/INonUserAppointmentGuestsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateNonUserAppointmentGuestService {
  constructor(
    @inject('NonUserAppointmentGuestsRepository')
    private nonUserAppointmentGuestsRepository: INonUserAppointmentGuestsRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    phone,
    email,
    description,
    appointment_id,
    supplier_id,
  }: ICreateNonUserAppointmentGuestDTO): Promise<NonUserAppointmentGuest> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );
    if (!appointment) {
      throw new AppError('Appointment not found.');
    }
    const supplier = await this.usersRepository.findById(supplier_id);
    if (!supplier) {
      throw new AppError('Supplier not found.');
    }

    const nonUserAppointmentGuest = await this.nonUserAppointmentGuestsRepository.create(
      {
        name,
        phone,
        email,
        description,
        appointment_id,
        supplier_id,
      },
    );

    return nonUserAppointmentGuest;
  }
}

export default CreateNonUserAppointmentGuestService;

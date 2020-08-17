import { startOfHour, isBefore, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    subject,
    date,
    address,
    host_id,
    appointment_type,
    weplanGuest,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDateAndUsers(
      appointmentDate,
      host_id,
    );

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (findAppointmentInSameDate) {
      throw new AppError('This appointments is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      subject,
      date,
      address,
      appointment_type,
      weplanGuest,
      host_id,
    });

    const host = await this.usersRepository.findById(host_id);

    if (!host) {
      throw new AppError('User not found.');
    }

    await this.cacheProvider.invalidate(
      `host-appointments:${host_id}:${format(appointmentDate, 'yyyy-M-d')}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;

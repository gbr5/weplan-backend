import { startOfHour, isBefore } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import NonUserAppointmentGuest from '@modules/appointments/infra/typeorm/entities/NonUserAppointmentGuest';
import ICreateSupplierNonUserAppointmentDTO from '@modules/appointments/dtos/ICreateSupplierNonUserAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INonUserAppointmentGuestsRepository from '@modules/appointments/repositories/INonUserAppointmentGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NonUserAppointmentGuestsRepository')
    private nonUserAppointmentGuestsRepository: INonUserAppointmentGuestsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

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
    name,
    email,
    phone,
    description,
  }: ICreateSupplierNonUserAppointmentDTO): Promise<{
    id: string;
    subject: string;
    date: Date;
    address: string;
    appointment_type: string;
    host: User;
    guest: NonUserAppointmentGuest;
  }> {
    const host = await this.usersRepository.findById(host_id);

    if (!host) {
      throw new AppError('User not found.');
    }

    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }
    const findAppointment = await this.appointmentsRepository.findByDateAndUsers(
      appointmentDate,
      host_id,
    );

    if (findAppointment) {
      throw new AppError(
        'This host already have an appointment for this date.',
      );
    }

    const appointment = await this.appointmentsRepository.create({
      subject,
      date,
      address,
      appointment_type,
      weplanGuest,
      host_id,
    });

    const guest = await this.nonUserAppointmentGuestsRepository.create({
      name,
      email,
      phone,
      description,
      appointment_id: appointment.id,
      supplier_id: host_id,
    });

    return {
      id: appointment.id,
      subject: appointment.subject,
      date: appointment.date,
      address: appointment.address,
      appointment_type: appointment.appointment_type,
      host: appointment.Host,
      guest,
    };
  }
}

export default CreateAppointmentService;

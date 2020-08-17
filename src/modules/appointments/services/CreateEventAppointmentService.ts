import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventAppointment from '@modules/appointments/infra/typeorm/entities/EventAppointment';
import ICreateEventAppointmentDTO from '@modules/appointments/dtos/ICreateEventAppointmentDTO';
import IEventAppointmentsRepository from '@modules/appointments/repositories/IEventAppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateEventAppointmentService {
  constructor(
    @inject('EventAppointmentsRepository')
    private eventAppointmentsRepository: IEventAppointmentsRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    appointment_id,
    event_id,
  }: ICreateEventAppointmentDTO): Promise<EventAppointment> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );
    const event = await this.usersRepository.findById(event_id);

    if (!appointment) {
      throw new AppError('Appointment not found.');
    }
    if (!event) {
      throw new AppError('Event not found.');
    }

    const eventAppointment = await this.eventAppointmentsRepository.create({
      appointment_id,
      event_id,
    });

    return eventAppointment;
  }
}

export default CreateEventAppointmentService;

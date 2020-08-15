import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateSupplierAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

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
    guess_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDateAndUsers(
      appointmentDate,
      host_id,
      guess_id,
    );

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (guess_id === host_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    // Corrigir, Fazer dois services de create, um automático, com definição de parâmetros, autómatico para fornecedores utilizarem em suas redes e site.
    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create an appointment between 8am and 5pm.',
      );
    }

    if (findAppointmentInSameDate) {
      throw new AppError('This appointments is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      subject,
      date,
      address,
      host_id,
      guess_id,
    });

    const user = await this.usersRepository.findById(guess_id);
    let name;

    const dateFormatted = format(
      appointmentDate,
      "dd/MM/yyyy 'às' HH:mm 'horas",
    );

    if (!user) {
      name = 'Cliente';
    } else {
      name = user.name;
    }

    await this.notificationsRepository.create({
      recipient_id: host_id,
      content: `Novo agendamento com ${name} no dia ${dateFormatted}`,
    });

    await this.cacheProvider.invalidate(
      `host-appointments:${host_id}:${format(appointmentDate, 'yyyy-M-d')}`,
    );

    return appointment;
  }
}

export default CreateSupplierAppointmentService;

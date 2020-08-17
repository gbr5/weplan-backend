import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import StageCardAppointment from '@modules/appointments/infra/typeorm/entities/StageCardAppointment';
import ICreateStageCardAppointmentDTO from '@modules/appointments/dtos/ICreateStageCardAppointmentDTO';
import IStageCardAppointmentsRepository from '@modules/appointments/repositories/IStageCardAppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateStageCardAppointmentService {
  constructor(
    @inject('StageCardAppointmentsRepository')
    private stageCardAppointmentsRepository: IStageCardAppointmentsRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute({
    appointment_id,
    card_id,
  }: ICreateStageCardAppointmentDTO): Promise<StageCardAppointment> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );
    const card = await this.stageCardsRepository.findById(card_id);

    if (!appointment) {
      throw new AppError('Appointment not found.');
    }
    if (!card) {
      throw new AppError('StageCard not found.');
    }

    const stageCardAppointment = await this.stageCardAppointmentsRepository.create(
      {
        appointment_id,
        card_id,
      },
    );

    return stageCardAppointment;
  }
}

export default CreateStageCardAppointmentService;

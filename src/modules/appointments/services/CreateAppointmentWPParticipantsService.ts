import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import WeplanAppointmentGuest from '@modules/appointments/infra/typeorm/entities/WeplanAppointmentGuest';
import ICreateAppointmentWPParticipantDTO from '@modules/appointments/dtos/ICreateAppointmentWPParticipantDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IWeplanAppointmentGuestsRepository from '../repositories/IWeplanAppointmentGuestsRepository';

@injectable()
class CreateAppointmentParticipantsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('WeplanAppointmentGuestsRepository')
    private weplanAppointmentGuestsRepository: IWeplanAppointmentGuestsRepository,
  ) {}

  public async execute({
    appointment_id,
    guests,
    host_id,
  }: ICreateAppointmentWPParticipantDTO): Promise<WeplanAppointmentGuest[]> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Appointment not found.');
    }

    const appointmentWPParticipants = Promise.all([
      guests.map(async guest => {
        return this.weplanAppointmentGuestsRepository.create({
          guest_id: guest.id,
          appointment_id,
          host_id,
        });
      }),
    ]);

    const xFiles: WeplanAppointmentGuest[] = [];

    (await appointmentWPParticipants).map(guest => {
      guest.map(async xFile => {
        xFiles.push(await xFile);
        return xFile;
      });
      return guest;
    });

    return xFiles;
  }
}

export default CreateAppointmentParticipantsService;

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentWPParticipantsService from '@modules/appointments/services/CreateAppointmentWPParticipantsService';

export default class CreateAppointmentWPParticipantsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { guests, appointment_id } = req.body;
    const host_id = req.user.id;

    const createAppointmentWPParticipants = container.resolve(
      CreateAppointmentWPParticipantsService,
    );

    const appointmentParticipants = await createAppointmentWPParticipants.execute(
      {
        guests,
        appointment_id,
        host_id,
      },
    );

    return res.json(appointmentParticipants);
  }
}

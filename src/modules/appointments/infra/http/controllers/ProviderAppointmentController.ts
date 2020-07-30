import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';

export default class ProviderAppointmentController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.body;
    const provider_id = req.user.id;

    const listAppointment = container.resolve(ListProviderAppointmentService);

    const appointments = await listAppointment.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(appointments);
  }
}

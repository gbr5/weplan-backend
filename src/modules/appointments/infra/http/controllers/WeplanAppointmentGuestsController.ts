import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWeplanAppointmentGuestService from '@modules/appointments/services/CreateWeplanAppointmentGuestService';
import ListWeplanAppointmentGuestsService from '@modules/appointments/services/ListWeplanAppointmentGuestsService';
import DeleteWeplanAppointmentGuestService from '@modules/appointments/services/DeleteWeplanAppointmentGuestService';

import { classToClass } from 'class-transformer';

export default class WeplanAppointmentGuestsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const host_id = req.user.id;

    const istWeplanAppointmentGuests = container.resolve(
      ListWeplanAppointmentGuestsService,
    );

    const weplanAppointmentGuests = await istWeplanAppointmentGuests.execute(
      host_id,
    );

    return res.json(classToClass(weplanAppointmentGuests));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { guest_id, appointment_id } = req.body;
    const host_id = req.user.id;

    const createWeplanAppointmentGuest = container.resolve(
      CreateWeplanAppointmentGuestService,
    );

    const weplanAppointmentGuest = await createWeplanAppointmentGuest.execute({
      guest_id,
      host_id,
      appointment_id,
    });

    return res.json(classToClass(weplanAppointmentGuest));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteWeplanAppointmentGuestService = container.resolve(
      DeleteWeplanAppointmentGuestService,
    );

    const weplanAppointmentGuest = await deleteWeplanAppointmentGuestService.execute(
      id,
    );

    return res.json(classToClass(weplanAppointmentGuest));
  }
}

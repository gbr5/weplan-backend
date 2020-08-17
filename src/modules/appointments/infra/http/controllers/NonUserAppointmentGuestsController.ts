import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateNonUserAppointmentGuestService from '@modules/appointments/services/CreateNonUserAppointmentGuestService';
import ListNonUserAppointmentGuestsService from '@modules/appointments/services/ListNonUserAppointmentGuestsService';
import DeleteNonUserAppointmentGuestService from '@modules/appointments/services/DeleteNonUserAppointmentGuestService';

import { classToClass } from 'class-transformer';

export default class NonUserAppointmentGuestsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const supplier_id = req.user.id;

    const listNonUserAppointmentGuests = container.resolve(
      ListNonUserAppointmentGuestsService,
    );

    const supplierNonUserAppointmentGuests = await listNonUserAppointmentGuests.execute(
      supplier_id,
    );

    return res.json(classToClass(supplierNonUserAppointmentGuests));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, phone, email, appointment_id, description } = req.body;
    const supplier_id = req.user.id;

    const createNonUserAppointmentGuest = container.resolve(
      CreateNonUserAppointmentGuestService,
    );

    const nonUserAppointmentGuest = await createNonUserAppointmentGuest.execute(
      {
        name,
        email,
        phone,
        supplier_id,
        appointment_id,
        description,
      },
    );

    return res.json(classToClass(nonUserAppointmentGuest));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteNonUserAppointmentGuestService = container.resolve(
      DeleteNonUserAppointmentGuestService,
    );

    const nonUserAppointmentGuest = await deleteNonUserAppointmentGuestService.execute(
      id,
    );

    return res.json(classToClass(nonUserAppointmentGuest));
  }
}

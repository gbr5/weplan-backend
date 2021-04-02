import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateWeplanGuestService from '@modules/events/services/CreateWeplanGuestService';
import ListWeplanGuestsService from '@modules/events/services/ListWeplanGuestsService';
import DeleteWeplanGuestService from '@modules/events/services/DeleteWeplanGuestService';
import ListUserAsWeplanGuestsService from '@modules/events/services/ListUserAsWeplanGuestsService';

export default class WeplanGuestsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_id, guest_id, user_id } = req.body;

    const createGuests = container.resolve(CreateWeplanGuestService);

    const guest = await createGuests.execute({
      event_id,
      guest_id,
      user_id,
    });

    return res.json(classToClass(guest));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const listGuests = container.resolve(ListWeplanGuestsService);

    const guests = await listGuests.execute(event_id);

    return res.json(classToClass(guests));
  }

  public async listUser(req: Request, res: Response): Promise<Response> {
    // const dataParams = req.params;
    // const { user_id } = dataParams;
    const { id } = req.user;

    const listGuests = container.resolve(ListUserAsWeplanGuestsService);

    const guests = await listGuests.execute(id);

    return res.json(classToClass(guests));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteGuest = container.resolve(DeleteWeplanGuestService);

    await deleteGuest.execute(id);

    return res.status(200).send();
  }
}

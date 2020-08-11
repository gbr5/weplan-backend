import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGuestsService from '@modules/events/services/CreateGuestsService';
import UpdateGuestService from '@modules/events/services/UpdateGuestService';
import ShowGuestService from '@modules/events/services/ShowGuestService';
import ListGuestsService from '@modules/events/services/ListGuestsService';
import DeleteGuestService from '@modules/events/services/DeleteGuestService';

export default class GuestsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { first_name, last_name, description, host_id, confirmed } = req.body;
    const user_id = req.user.id;

    const dataParams = req.params;

    const { event_name } = dataParams;

    const createGuests = container.resolve(CreateGuestsService);

    const guest = await createGuests.execute({
      user_id,
      first_name,
      last_name,
      description,
      event_name,
      host_id,
      confirmed,
    });

    return res.json(guest);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_name } = dataParams;

    const listGuests = container.resolve(ListGuestsService);

    const guests = await listGuests.execute(event_name);

    return res.json(guests);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_name, first_name, last_name } = dataParams;

    const showGuest = container.resolve(ShowGuestService);

    const guest = await showGuest.execute(event_name, first_name, last_name);

    return res.json(guest);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_name, first_name, last_name } = dataParams;
    const user_id = req.user.id;

    const {
      new_first_name,
      new_last_name,
      description,
      host_id,
      confirmed,
    } = req.body;

    const updateGuest = container.resolve(UpdateGuestService);

    const event = await updateGuest.execute({
      user_id,
      first_name,
      new_first_name,
      last_name,
      new_last_name,
      description,
      event_name,
      host_id,
      confirmed,
    });

    return res.json(event);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { event_name, first_name, last_name } = dataParams;

    const deleteGuest = container.resolve(DeleteGuestService);

    await deleteGuest.execute({
      event_name,
      first_name,
      last_name,
    });

    return res.status(200).send();
  }
}

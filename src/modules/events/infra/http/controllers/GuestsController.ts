import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateGuestsService from '@modules/events/services/CreateGuestsService';
import UpdateGuestService from '@modules/events/services/UpdateGuestService';
import ShowGuestService from '@modules/events/services/ShowGuestService';
import ListGuestsService from '@modules/events/services/ListGuestsService';
import DeleteGuestService from '@modules/events/services/DeleteGuestService';
import ImportGuestsService from '@modules/events/services/ImportGuestsService';

export default class GuestsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      first_name,
      last_name,
      description,
      confirmed,
      weplanUser,
      user_id,
    } = req.body;

    const host_id = req.user.id;

    const dataParams = req.params;

    const { event_id } = dataParams;

    const createGuests = container.resolve(CreateGuestsService);

    const guest = await createGuests.execute({
      host_id,
      first_name,
      last_name,
      event_id,
      description,
      confirmed,
      weplanUser,
      user_id,
    });

    return res.json(classToClass(guest));
  }

  public async import(req: Request, res: Response): Promise<Response> {
    const host_id = req.user.id;
    const fileguestListFileName = req.file.path;
    const dataParams = req.params;
    const { event_id, number_of_guests_available } = dataParams;

    const importGuests = container.resolve(ImportGuestsService);

    const guests = await importGuests.execute(
      fileguestListFileName,
      event_id,
      host_id,
      Number(number_of_guests_available),
    );

    return res.json(classToClass(guests));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const listGuests = container.resolve(ListGuestsService);

    const guests = await listGuests.execute(event_id);

    return res.json(classToClass(guests));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id, first_name, last_name } = dataParams;

    const showGuest = container.resolve(ShowGuestService);

    const guest = await showGuest.execute(event_id, first_name, last_name);

    return res.json(classToClass(guest));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const host_id = req.user.id;

    const { first_name, last_name, description, confirmed } = req.body;
    const updateGuest = container.resolve(UpdateGuestService);

    const event = await updateGuest.execute({
      first_name,
      last_name,
      description,
      id,
      host_id,
      confirmed,
    });

    return res.json(event);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteGuest = container.resolve(DeleteGuestService);

    await deleteGuest.execute(id);

    return res.status(200).send();
  }
}

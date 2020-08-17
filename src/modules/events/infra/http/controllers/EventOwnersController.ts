import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventOwnerService from '@modules/events/services/CreateEventOwnerService';
import ListEventOwnersService from '@modules/events/services/ListEventOwnersService';
import DeleteEventOwnerService from '@modules/events/services/DeleteEventOwnerService';

export default class EventOwnersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { owner_id } = req.body;
    const user_id = req.user.id;

    const dataParams = req.params;

    const { event_id } = dataParams;

    const createEventOwners = container.resolve(CreateEventOwnerService);

    const owner = await createEventOwners.execute({
      user_id,
      event_id,
      owner_id,
    });

    return res.json(classToClass(owner));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const listEventOwners = container.resolve(ListEventOwnersService);

    const owners = await listEventOwners.execute(event_id);

    return res.json(classToClass(owners));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { event_id, owner_id } = dataParams;

    const deleteEventOwner = container.resolve(DeleteEventOwnerService);

    await deleteEventOwner.execute({
      event_id,
      owner_id,
    });

    return res.status(200).send();
  }
}

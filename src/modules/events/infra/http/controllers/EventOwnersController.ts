import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventOwnerService from '@modules/events/services/CreateEventOwnerService';
import ListEventOwnersService from '@modules/events/services/ListEventOwnersService';
import DeleteEventOwnerService from '@modules/events/services/DeleteEventOwnerService';
import UpdateEventOwnerService from '@modules/events/services/UpdateEventOwnerService';
import ShowEventOwnerService from '@modules/events/services/ShowEventOwnerService';
import ListEventsAsOwnerService from '@modules/events/services/ListEventsAsOwnerService';
import UpdateEventMasterService from '@modules/events/services/UpdateEventMasterService';

export default class EventOwnersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { owner_id, number_of_guests, description } = req.body;
    const user_id = req.user.id;

    const dataParams = req.params;

    const { event_id } = dataParams;

    const createEventOwner = container.resolve(CreateEventOwnerService);

    const owner = await createEventOwner.execute({
      user_id,
      event_id,
      owner_id,
      description,
      number_of_guests,
    });

    return res.json(classToClass(owner));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { number_of_guests, description } = req.body;
    const reqParams = req.params;
    const { event_id, owner_id } = reqParams;

    const updateEventOwner = container.resolve(UpdateEventOwnerService);

    const owner = await updateEventOwner.execute({
      owner_id,
      event_id,
      description,
      number_of_guests,
    });

    return res.json(classToClass(owner));
  }

  public async updateEventMaster(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { number_of_guests, description } = req.body;
    const reqParams = req.params;
    const { event_id } = reqParams;

    const updateEventOwner = container.resolve(UpdateEventMasterService);

    const owner = await updateEventOwner.execute({
      event_id,
      number_of_guests,
      description,
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

  public async listAsOwner(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listEventOwners = container.resolve(ListEventsAsOwnerService);

    const owners = await listEventOwners.execute(user_id);

    return res.json(classToClass(owners));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id, owner_id } = dataParams;

    const showEventOwner = container.resolve(ShowEventOwnerService);

    const owners = await showEventOwner.execute(event_id, owner_id);

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

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventsService from '@modules/events/services/CreateEventsService';
import UpdateEventService from '@modules/events/services/UpdateEventService';
import ShowEventsService from '@modules/events/services/ShowEventService';
import ListUserEventsService from '@modules/events/services/ListUserEventsService';

export default class EventsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, event_type, date } = req.body;
    const user_id = req.user.id;

    const createEvents = container.resolve(CreateEventsService);

    const event = await createEvents.execute({
      name,
      event_type,
      date,
      user_id,
    });

    return res.json(classToClass(event));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listEvents = container.resolve(ListUserEventsService);

    const events = await listEvents.execute({ user_id });

    return res.json(classToClass(events));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const trimmed_name = req.params;

    const showEvents = container.resolve(ShowEventsService);

    const event = await showEvents.execute(trimmed_name.event_name);

    return res.json(classToClass(event));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const trimmed_name = req.params;
    const user_id = req.user.id;
    const { event_type, name, date } = req.body;

    const updateEvent = container.resolve(UpdateEventService);

    const event = await updateEvent.execute({
      event_type,
      name,
      trimmed_name: trimmed_name.event_name,
      date,
      user_id,
    });

    return res.json(classToClass(event));
  }
}

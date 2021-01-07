import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventsService from '@modules/events/services/CreateEventsService';
import UpdateEventService from '@modules/events/services/UpdateEventService';
import ShowEventsService from '@modules/events/services/ShowEventService';
import ListUserEventsService from '@modules/events/services/ListUserEventsService';
import DeleteEventService from '@modules/events/services/DeleteEventService';
import UpdateEventNameService from '@modules/events/services/UpdateEventNameService';

export default class EventsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, event_type, date, isDateDefined } = req.body;
    const user_id = req.user.id;

    const createEvents = container.resolve(CreateEventsService);

    const trimmed_name = name
      .toLowerCase()
      .split(' ')
      // .map((word: string) => {
      //   return word[0].toUpperCase() + word.slice(1);
      // })
      .join('');

    const event = await createEvents.execute({
      name,
      trimmed_name,
      event_type,
      date,
      user_id,
      isDateDefined,
      isPublished: false,
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
    const dataParams = req.params;
    const { event_id } = dataParams;
    const showEvents = container.resolve(ShowEventsService);

    const event = await showEvents.execute(event_id);

    return res.json(classToClass(event));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;
    const user_id = req.user.id;
    const { name, date } = req.body;

    const updateEvent = container.resolve(UpdateEventService);

    const event = await updateEvent.execute({
      name,
      date,
      user_id,
      event_id,
    });

    return res.json(classToClass(event));
  }

  public async updateName(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;
    const { name } = req.body;

    const updateEvent = container.resolve(UpdateEventNameService);

    const event = await updateEvent.execute({
      name,
      event_id,
    });

    return res.json(classToClass(event));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;
    const showEvents = container.resolve(DeleteEventService);

    await showEvents.execute(event_id);

    return res.status(200).send();
  }
}

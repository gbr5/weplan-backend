import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEventTypeService from '@modules/events/services/CreateEventTypeService';
import UpdateEventTypeService from '@modules/events/services/UpdateEventTypeService';
import ListEventTypesService from '@modules/events/services/ListEventTypesService';

export default class EventTypeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createEventType = container.resolve(CreateEventTypeService);

    const eventType = await createEventType.execute({
      name,
    });

    return res.json(eventType);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listEventTypes = container.resolve(ListEventTypesService);

    const eventType = await listEventTypes.execute();

    return res.json(eventType);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const updateEventType = container.resolve(UpdateEventTypeService);

    const eventType = await updateEventType.execute({
      name,
    });

    return res.json(eventType);
  }
}

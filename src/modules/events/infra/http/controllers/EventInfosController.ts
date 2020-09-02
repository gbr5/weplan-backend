import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventInfoService from '@modules/events/services/CreateEventInfoService';
import ShowEventInfoService from '@modules/events/services/ShowEventInfoService';
import UpdateEventInfoService from '@modules/events/services/UpdateEventInfoService';

export default class EventInfosController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      number_of_guests,
      budget,
      description,
      country,
      local_state,
      city,
      duration,
      address,
    } = req.body;
    const dataParams = req.params;
    const { event_id } = dataParams;

    const createEventInfo = container.resolve(CreateEventInfoService);

    const eventInfo = await createEventInfo.execute({
      event_id,
      number_of_guests,
      duration,
      budget,
      description,
      country,
      local_state,
      city,
      address,
    });

    return res.json(classToClass(eventInfo));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { event_id } = dataParams;

    const showEventInfo = container.resolve(ShowEventInfoService);

    const eventInfo = await showEventInfo.execute(event_id);

    return res.json(classToClass(eventInfo));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      number_of_guests,
      duration,
      budget,
      description,
      country,
      local_state,
      city,
      address,
    } = req.body;

    const dataParams = req.params;

    const { event_id } = dataParams;

    const updateEventInfo = container.resolve(UpdateEventInfoService);

    const eventInfo = await updateEventInfo.execute({
      event_id,
      number_of_guests,
      duration,
      budget,
      description,
      country,
      local_state,
      city,
      address,
    });

    return res.json(classToClass(eventInfo));
  }
}

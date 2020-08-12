import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEventInfoService from '@modules/events/services/CreateEventInfoService';
import ShowEventInfoService from '@modules/events/services/ShowEventInfoService';
import UpdateEventInfoService from '@modules/events/services/UpdateEventInfoService';

export default class EventInfosController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      number_of_guests,
      start_hour,
      duration,
      budget,
      description,
      country,
      local_state,
      city,
    } = req.body;
    const dataParams = req.params;
    const { event_name } = dataParams;

    const createEventInfo = container.resolve(CreateEventInfoService);

    const eventInfo = await createEventInfo.execute({
      event_name,
      number_of_guests,
      start_hour,
      duration,
      budget,
      description,
      country,
      local_state,
      city,
    });

    return res.json(eventInfo);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { event_name } = dataParams;

    const showEventInfo = container.resolve(ShowEventInfoService);

    const eventInfo = await showEventInfo.execute(event_name);

    return res.json(eventInfo);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      number_of_guests,
      start_hour,
      duration,
      budget,
      description,
      country,
      local_state,
      city,
    } = req.body;

    const dataParams = req.params;

    const { event_name } = dataParams;

    const updateEventInfo = container.resolve(UpdateEventInfoService);

    const eventInfo = await updateEventInfo.execute({
      event_name,
      number_of_guests,
      start_hour,
      duration,
      budget,
      description,
      country,
      local_state,
      city,
    });

    return res.json(eventInfo);
  }
}

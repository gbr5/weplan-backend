import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventDatesService from '@modules/events/services/CreateEventDatesService';
import UpdateEventDateService from '@modules/events/services/UpdateEventDateService';
import DeleteEventDateService from '@modules/events/services/DeleteEventDateService';

export default class EventDatesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_id, dates } = req.body;
    const createEventDates = container.resolve(CreateEventDatesService);

    const eventDate = await createEventDates.execute({
      event_id,
      dates,
    });

    return res.json(eventDate);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const { date } = req.body;

    const updateEventDate = container.resolve(UpdateEventDateService);

    const eventDate = await updateEventDate.execute({
      date,
      id,
    });

    return res.json(classToClass(eventDate));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showEventDates = container.resolve(DeleteEventDateService);

    await showEventDates.execute(id);

    return res.status(200).send();
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateEventNumberOfGuestsService from '@modules/events/services/UpdateEventNumberOfGuestsService';

export default class EventNumberOfGuestsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;
    const { number_of_guests } = req.body;

    const updateEvent = container.resolve(UpdateEventNumberOfGuestsService);

    const event = await updateEvent.execute(event_id, number_of_guests);

    return res.json(classToClass(event));
  }
}

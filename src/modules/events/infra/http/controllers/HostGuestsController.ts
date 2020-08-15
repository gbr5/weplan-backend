import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListHostGuestsService from '@modules/events/services/ListHostGuestsService';

export default class GuestsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_name, host_id } = dataParams;

    const listHostGuests = container.resolve(ListHostGuestsService);

    const guests = await listHostGuests.execute(event_name, host_id);

    return res.json(classToClass(guests));
  }
}

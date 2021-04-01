import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListEventsAsGuestService from '@modules/events/services/ListEventsAsGuestService';

export default class ListEventsAsGuestController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listEventsAsGuest = container.resolve(ListEventsAsGuestService);

    const events = await listEventsAsGuest.execute(user_id);

    return res.json(classToClass(events));
  }
}

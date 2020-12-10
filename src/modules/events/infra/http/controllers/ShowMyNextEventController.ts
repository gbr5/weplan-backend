import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowMyNextEventService from '@modules/events/services/ShowMyNextEventService';

export default class ShowMyNextEventController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showNextEvent = container.resolve(ShowMyNextEventService);
    const user_id = req.user.id;

    const nextEvent = await showNextEvent.execute(user_id);

    return res.json(nextEvent);
  }
}

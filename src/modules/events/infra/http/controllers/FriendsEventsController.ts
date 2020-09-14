import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListFriendsEventsService from '@modules/events/services/ListFriendsEventsService';

export default class UserAsWeplanGuestsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listFriendsEvents = container.resolve(ListFriendsEventsService);

    const friendsEvents = await listFriendsEvents.execute(user_id);

    return res.json(classToClass(friendsEvents));
  }
}

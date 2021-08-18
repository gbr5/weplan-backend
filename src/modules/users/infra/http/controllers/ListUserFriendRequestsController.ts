import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUserFriendRequestsService from '@modules/users/services/ListUserFriendRequestsService';

export default class ListUserFriendRequestsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listUsersFriend = container.resolve(ListUserFriendRequestsService);

    const friends = await listUsersFriend.execute(user_id);

    return res.json(classToClass(friends));
  }
}

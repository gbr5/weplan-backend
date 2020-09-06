import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserFriendService from '@modules/users/services/CreateUserFriendService';
import DeleteUserFriendService from '@modules/users/services/DeleteUserFriendService';
import ListUserFriendsService from '@modules/users/services/ListUserFriendsService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { friend_id, friend_group } = req.body;
    const user_id = req.user.id;

    const createUserFriend = container.resolve(CreateUserFriendService);

    const user = await createUserFriend.execute({
      user_id,
      friend_id,
      friend_group,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listUsersFriend = container.resolve(ListUserFriendsService);

    const friends = await listUsersFriend.execute(user_id);

    return res.json(classToClass(friends));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteUserFriend = container.resolve(DeleteUserFriendService);

    const friend = await deleteUserFriend.execute(id);

    return res.json(classToClass(friend));
  }
}

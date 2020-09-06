import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFriendGroupService from '@modules/users/services/CreateFriendGroupService';
import UpdateFriendGroupService from '@modules/users/services/UpdateFriendGroupService';
import ListFriendsGroupService from '@modules/users/services/ListFriendsGroupService';
import DeleteFriendGroupService from '@modules/users/services/DeleteFriendGroupService';

export default class FriendGroupsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const user_id = req.user.id;

    const createFriendGroup = container.resolve(CreateFriendGroupService);

    const user = await createFriendGroup.execute({
      user_id,
      name,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listFriendsGroup = container.resolve(ListFriendsGroupService);

    const friends = await listFriendsGroup.execute(user_id);

    return res.json(classToClass(friends));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { name } = req.body;

    const updateFriendGroup = container.resolve(UpdateFriendGroupService);

    const groups = await updateFriendGroup.execute({ name, id });

    return res.json(classToClass(groups));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteFriendGroup = container.resolve(DeleteFriendGroupService);

    await deleteFriendGroup.execute(id);

    return res.status(204).send();
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserCheckListService from '@modules/events/services/CreateUserCheckListService';
import ListUserCheckListsService from '@modules/events/services/ListUserCheckListsService';
import UpdateUserCheckListService from '@modules/events/services/UpdateUserCheckListService';
import DeleteUserCheckListService from '@modules/events/services/DeleteUserCheckListService';

export default class UserCheckListsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, priority_level, checked } = req.body;
    const dataParams = req.params;

    const createUserCheckList = container.resolve(CreateUserCheckListService);

    const checkList = await createUserCheckList.execute({
      name,
      priority_level,
      checked,
      event_id: dataParams.event_id,
    });

    return res.json(classToClass(checkList));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { event_id } = dataParams;

    const listUserCheckLists = container.resolve(ListUserCheckListsService);

    const userCheckList = await listUserCheckLists.execute(event_id);

    return res.json(userCheckList);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, priority_level, checked } = req.body;

    const dataParams = req.params;

    const { event_id, id } = dataParams;

    const updateUserCheckList = container.resolve(UpdateUserCheckListService);

    const checkList = await updateUserCheckList.execute({
      name,
      priority_level,
      checked,
      event_id,
      id,
    });

    return res.json(classToClass(checkList));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { event_id, id } = dataParams;

    const deleteUserCheckList = container.resolve(DeleteUserCheckListService);

    await deleteUserCheckList.execute({
      event_id,
      id,
    });

    return res.status(200).send();
  }
}
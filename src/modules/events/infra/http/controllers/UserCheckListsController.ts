import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserCheckListService from '@modules/events/services/CreateUserCheckListService';
import ListUserCheckListsService from '@modules/events/services/ListUserCheckListsService';
import UpdateUserCheckListService from '@modules/events/services/UpdateUserCheckListService';
import DeleteUserCheckListService from '@modules/events/services/DeleteUserCheckListService';
import UpdateCheckListItemStatusService from '@modules/events/services/UpdateCheckListItemStatusService';
import UpdateCheckListItemPriorityLevelService from '@modules/events/services/UpdateCheckListItemPriorityLevelService';

export default class UserCheckListsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, priority_level, status, due_date } = req.body;
    const dataParams = req.params;
    const { event_id } = dataParams;

    const createUserCheckList = container.resolve(CreateUserCheckListService);

    const checkList = await createUserCheckList.execute({
      name,
      priority_level,
      status,
      due_date,
      event_id,
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
    const { name, priority_level, due_date } = req.body;

    const dataParams = req.params;

    const { id } = dataParams;

    const updateUserCheckList = container.resolve(UpdateUserCheckListService);

    const checkList = await updateUserCheckList.execute({
      name,
      priority_level,
      due_date,
      id,
    });

    return res.json(classToClass(checkList));
  }

  public async updateStatus(req: Request, res: Response): Promise<Response> {
    const { status } = req.body;

    const dataParams = req.params;

    const { id } = dataParams;

    const updateUserCheckList = container.resolve(
      UpdateCheckListItemStatusService,
    );

    const checkList = await updateUserCheckList.execute({
      status,
      id,
    });

    return res.json(classToClass(checkList));
  }

  public async updatePriorityLevel(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { priority_level } = req.body;

    const dataParams = req.params;

    const { id } = dataParams;

    const updateUserCheckList = container.resolve(
      UpdateCheckListItemPriorityLevelService,
    );

    const checkList = await updateUserCheckList.execute({
      priority_level,
      id,
    });

    return res.json(classToClass(checkList));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteUserCheckList = container.resolve(DeleteUserCheckListService);

    await deleteUserCheckList.execute(id);

    return res.status(200).send();
  }
}

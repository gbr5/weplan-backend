import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCheckListTaskService from '@modules/checklists/services/CreateCheckListTaskService';
import UpdateCheckListTasksService from '@modules/checklists/services/UpdateCheckListTaskService';
import ListCheckListTasksService from '@modules/checklists/services/ListCheckListTasksService';

export default class CheckListTasksController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { check_list_id } = reqParams;
    const {
      owner_id,
      status,
      task,
      color,
      isActive,
      priority,
      due_date,
    } = req.body;

    const createCheckListTasks = container.resolve(CreateCheckListTaskService);

    const checkListTask = await createCheckListTasks.execute({
      owner_id,
      check_list_id,
      task,
      color,
      isActive,
      priority,
      status,
      due_date,
    });

    return res.json(classToClass(checkListTask));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { check_list_id } = reqParams;

    const listCheckListTasks = container.resolve(ListCheckListTasksService);

    const checkListTask = await listCheckListTasks.execute(check_list_id);

    return res.json(classToClass(checkListTask));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const { task, color, isActive, status, priority, due_date } = req.body;

    const updateCheckListTasks = container.resolve(UpdateCheckListTasksService);

    const checkListTask = await updateCheckListTasks.execute({
      id,
      task,
      color,
      isActive,
      priority,
      status,
      due_date,
    });

    return res.json(classToClass(checkListTask));
  }
}
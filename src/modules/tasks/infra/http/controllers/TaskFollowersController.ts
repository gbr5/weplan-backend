import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTaskFollowerService from '@modules/tasks/services/CreateTaskFollowerService';
import ListTaskFollowersService from '@modules/tasks/services/ListTaskFollowersService';
import DeleteTaskFollowerService from '@modules/tasks/services/DeleteTaskFollowerService';

export default class TaskFollowerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { task_id, user_id, type } = req.body;
    const createTaskFollower = container.resolve(CreateTaskFollowerService);

    const taskFollower = await createTaskFollower.execute({
      task_id,
      user_id,
      type,
    });

    return res.json(taskFollower);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { task_id } = dataParams;

    const listTaskFollower = container.resolve(ListTaskFollowersService);

    const taskFollower = await listTaskFollower.execute(task_id);

    return res.json(classToClass(taskFollower));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showTaskFollower = container.resolve(DeleteTaskFollowerService);

    await showTaskFollower.execute(id);

    return res.status(200).send();
  }
}

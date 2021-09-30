import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateTaskService from '@modules/tasks/services/UpdateTaskService';
import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import DeleteTaskService from '@modules/tasks/services/DeleteTaskService';
import ListUserTasksService from '@modules/tasks/services/ListUserTasksService';

export default class TasksController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { title, status, priority, due_date } = req.body;

    const createTasks = container.resolve(CreateTaskService);

    const task = await createTasks.execute({
      user_id,
      title,
      status,
      priority,
      due_date,
    });

    return res.json(classToClass(task));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, title, status, priority, due_date } = req.body;

    const updateTasks = container.resolve(UpdateTaskService);

    const task = await updateTasks.execute({
      id,
      title,
      status,
      priority,
      due_date,
    });

    return res.json(classToClass(task));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listUserTasks = container.resolve(ListUserTasksService);

    const task = await listUserTasks.execute(user_id);

    return res.json(classToClass(task));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteTasks = container.resolve(DeleteTaskService);

    await deleteTasks.execute(id);

    return res.status(200).send('Successfully deleted task!');
  }
}

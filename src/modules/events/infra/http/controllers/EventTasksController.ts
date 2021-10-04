import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventTaskService from '@modules/events/services/CreateEventTaskService';
import ListEventTasksService from '@modules/events/services/ListEventTasksService';
import DeleteEventTaskService from '@modules/events/services/DeleteEventTaskService';

export default class EventTaskController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { event_id, title, priority, status, due_date } = req.body;
    const createEventTask = container.resolve(CreateEventTaskService);

    const eventTask = await createEventTask.execute({
      event_id,
      title,
      priority,
      status,
      due_date,
      user_id,
    });

    return res.json(classToClass(eventTask));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const listEventTask = container.resolve(ListEventTasksService);

    const eventTasks = await listEventTask.execute(event_id);

    return res.json(classToClass(eventTasks));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showEventTask = container.resolve(DeleteEventTaskService);

    await showEventTask.execute(id);

    return res.status(200).send();
  }
}

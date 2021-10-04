import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventOwnerTaskService from '@modules/events/services/CreateEventOwnerTaskService';

export default class CreateEventOwnerTaskController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { event_id, owner_id, title, priority, status, due_date } = req.body;
    const createEventOwnerTask = container.resolve(CreateEventOwnerTaskService);

    const eventTask = await createEventOwnerTask.execute({
      event_id,
      title,
      priority,
      status,
      due_date,
      user_id,
      owner_id,
    });

    return res.json(classToClass(eventTask));
  }
}

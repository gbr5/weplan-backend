import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventMemberTaskService from '@modules/events/services/CreateEventMemberTaskService';

export default class CreateEventMemberTaskController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { event_id, member_id, title, priority, status, due_date } = req.body;
    const createEventMemberTask = container.resolve(
      CreateEventMemberTaskService,
    );

    const eventTask = await createEventMemberTask.execute({
      event_id,
      title,
      priority,
      status,
      due_date,
      user_id,
      member_id,
    });

    return res.json(classToClass(eventTask));
  }
}

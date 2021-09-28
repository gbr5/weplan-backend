import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventTaskFollowerService from '@modules/events/services/CreateEventTaskFollowerService';
import ListEventTaskFollowersService from '@modules/events/services/ListEventTaskFollowersService';
import DeleteEventTaskFollowerService from '@modules/events/services/DeleteEventTaskFollowerService';

export default class EventTaskFollowerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { task_id, user_id, type } = req.body;
    const createEventTaskFollower = container.resolve(
      CreateEventTaskFollowerService,
    );

    const eventTaskFollower = await createEventTaskFollower.execute({
      task_id,
      user_id,
      type,
    });

    return res.json(eventTaskFollower);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { task_id } = dataParams;

    const listEventTaskFollower = container.resolve(
      ListEventTaskFollowersService,
    );

    const eventTaskFollower = await listEventTaskFollower.execute(task_id);

    return res.json(classToClass(eventTaskFollower));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showEventTaskFollower = container.resolve(
      DeleteEventTaskFollowerService,
    );

    await showEventTaskFollower.execute(id);

    return res.status(200).send();
  }
}

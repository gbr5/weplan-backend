import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListEventTasksByUserService from '@modules/events/services/ListEventTasksByUserService';

export default class ListEventTasksByUserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id, event_id } = reqParams;

    const listEventTasksByUserService = container.resolve(
      ListEventTasksByUserService,
    );

    const eventEventTaskFollower = await listEventTasksByUserService.execute({
      user_id,
      event_id,
    });

    return res.json(classToClass(eventEventTaskFollower));
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListTasksByUserService from '@modules/tasks/services/ListTasksByUserService';

export default class ListTasksByUserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listTasksByUserService = container.resolve(ListTasksByUserService);

    const eventTaskFollower = await listTasksByUserService.execute(user_id);

    return res.json(classToClass(eventTaskFollower));
  }
}

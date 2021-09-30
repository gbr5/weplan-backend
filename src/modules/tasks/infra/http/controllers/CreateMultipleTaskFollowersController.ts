import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMultipleTaskFollowersService from '@modules/tasks/services/CreateMultipleTaskFollowersService';

export default class CreateMultipleTaskFollowersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { task_id, followers } = req.body;
    const createTaskFollower = container.resolve(
      CreateMultipleTaskFollowersService,
    );

    await createTaskFollower.execute({
      task_id,
      followers,
    });

    return res.status(200).send('Followers created successfully');
  }
}

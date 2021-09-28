import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMultipleEventTaskFollowersService from '@modules/events/services/CreateMultipleEventTaskFollowersService';

export default class CreateMultipleEventTaskFollowersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { task_id, followers } = req.body;
    const createEventTaskFollower = container.resolve(
      CreateMultipleEventTaskFollowersService,
    );

    await createEventTaskFollower.execute({
      task_id,
      followers,
    });

    return res.status(200).send('Followers created successfully');
  }
}

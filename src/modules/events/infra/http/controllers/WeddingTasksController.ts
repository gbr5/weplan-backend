import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWeddingTasksService from '@modules/events/services/CreateWeddingTasksService';

export default class WeddingTasksController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_id } = req.body;
    const createWeddingTasks = container.resolve(CreateWeddingTasksService);

    await createWeddingTasks.execute({
      event_id,
    });

    return res.send(200);
  }
}
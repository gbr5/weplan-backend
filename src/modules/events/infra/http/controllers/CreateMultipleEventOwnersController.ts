import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMultipleEventOwnersService from '@modules/events/services/CreateMultipleEventOwnersService';

export default class CreateMultipleEventOwnersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_id, owners } = req.body;
    const user_id = req.user.id;

    const createMultipleEventOwnersService = container.resolve(
      CreateMultipleEventOwnersService,
    );

    await createMultipleEventOwnersService.execute({
      user_id,
      event_id,
      owners,
    });

    return res.status(200).send('Successfully created owners!');
  }
}

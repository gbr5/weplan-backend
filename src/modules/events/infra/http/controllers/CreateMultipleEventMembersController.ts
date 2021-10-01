import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMultipleEventMembersService from '@modules/events/services/CreateMultipleEventMembersService';

export default class CreateMultipleEventMembersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_id, members } = req.body;
    const user_id = req.user.id;

    const createMultipleEventMembersService = container.resolve(
      CreateMultipleEventMembersService,
    );

    await createMultipleEventMembersService.execute({
      user_id,
      event_id,
      members,
    });

    return res.status(200).send('Successfully created members!');
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListUserAsImageParticipantsService from '@modules/events/services/ListUserAsImageParticipantsService';

export default class ListUserImageParticipantsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUserImageParticipants = container.resolve(
      ListUserAsImageParticipantsService,
    );
    const user_id = req.user.id;

    const userEventImages = await listUserImageParticipants.execute(user_id);

    return res.json(userEventImages);
  }
}

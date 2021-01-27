import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListUserEventImagesService from '@modules/events/services/ListUserEventImagesService';

export default class ListUserEventImagesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUserEventImages = container.resolve(ListUserEventImagesService);
    const user_id = req.user.id;

    const userEventImages = await listUserEventImages.execute(user_id);

    return res.json(userEventImages);
  }
}

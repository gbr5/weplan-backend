import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateEventAvatarService from '@modules/events/services/UpdateEventAvatarService';
import AppError from '@shared/errors/AppError';

export default class EventAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_id } = reqParams;

    const updateEventAvatar = container.resolve(UpdateEventAvatarService);

    const event = await updateEventAvatar.execute({
      event_id,
      avatarFilename: req.file.filename,
    });

    const avatar = event.getAvatarUrl();

    if (!avatar) {
      throw new AppError('Avatar not found.');
    }
    return res.json(avatar);
  }
}

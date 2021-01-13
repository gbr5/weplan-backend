import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateEventAvatarService from '@modules/events/services/UpdateEventAvatarService';

export default class EventAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_id } = reqParams;

    const updateEventAvatar = container.resolve(UpdateEventAvatarService);

    const event = await updateEventAvatar.execute({
      event_id,
      avatarFilename: req.file.filename,
    });

    return res.json(event);
  }
}

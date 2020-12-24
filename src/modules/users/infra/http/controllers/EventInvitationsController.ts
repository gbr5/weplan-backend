import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventInvitationService from '@modules/users/services/CreateEventInvitationService';

export default class EventInvitationsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { sender_id, receiver_id, title, message, files } = req.body;

    const createEventInvitationService = container.resolve(
      CreateEventInvitationService,
    );

    const eventInvitation = await createEventInvitationService.execute({
      sender_id,
      receiver_id,
      title,
      message,
      files,
    });

    return res.json(classToClass(eventInvitation));
  }
}

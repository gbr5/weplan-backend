import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AssociateUserToEventGuestService from '@modules/events/services/AssociateUserToEventGuestService';

export default class AssociateUserToEventGuestController {
  public async post(req: Request, res: Response): Promise<Response> {
    const { guest_id, user_id } = req.body;
    const host_id = req.user.id;

    const updateGuest = container.resolve(AssociateUserToEventGuestService);

    const event = await updateGuest.execute({
      guest_id,
      host_id,
      user_id,
    });

    return res.json(event);
  }
}

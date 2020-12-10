import { Request, Response } from 'express';
import { container } from 'tsyringe';
import WeplanGuestConfirmationService from '@modules/events/services/WeplanGuestConfirmationService';

export default class WeplanGuestConfirmationController {
  public async updateWeplanGuest(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const user_id = req.user.id;

    const { confirmed } = req.body;
    const updateGuest = container.resolve(WeplanGuestConfirmationService);

    const updatedEventGuest = await updateGuest.execute({
      id,
      confirmed,
      user_id,
    });

    return res.json(updatedEventGuest);
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GuestConfirmationService from '@modules/events/services/GuestConfirmationService';

export default class GuestConfirmationController {
  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const updateGuest = container.resolve(GuestConfirmationService);

    const updatedEventGuest = await updateGuest.execute({
      id,
    });

    return res.json(updatedEventGuest);
  }
}

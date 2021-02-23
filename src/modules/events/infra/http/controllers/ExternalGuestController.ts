import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GuestConfirmationService from '@modules/events/services/GuestConfirmationService';
import { classToClass } from 'class-transformer';
import ShowExternalGuestService from '@modules/events/services/ShowExternalGuestService';

export default class GuestConfirmationController {
  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const showGuest = container.resolve(ShowExternalGuestService);

    const guest = await showGuest.execute(id);

    return res.json(classToClass(guest));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const updateGuest = container.resolve(GuestConfirmationService);

    const updatedEventGuest = await updateGuest.execute({
      id,
    });

    return res.json(classToClass(updatedEventGuest));
  }
}

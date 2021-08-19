import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMultipleMobileGuestsService from '@modules/events/services/CreateMultipleMobileGuestsService';

export default class CreateMultipleMobileGuestsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { contacts } = req.body;

    const host_id = req.user.id;

    const dataParams = req.params;

    const { event_id } = dataParams;

    const createGuests = container.resolve(CreateMultipleMobileGuestsService);

    const guest = await createGuests.execute({
      event_id,
      host_id,
      contacts,
    });

    return res.json(classToClass(guest));
  }
}

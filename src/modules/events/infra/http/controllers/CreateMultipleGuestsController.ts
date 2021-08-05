import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMultipleGuestsService from '@modules/events/services/CreateMultipleGuestsService';

export default class CreateMultipleGuestsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { contacts } = req.body;

    const host_id = req.user.id;

    const dataParams = req.params;

    const { event_id } = dataParams;

    const createGuests = container.resolve(CreateMultipleGuestsService);

    const guest = await createGuests.execute({
      event_id,
      host_id,
      contacts,
    });

    return res.json(classToClass(guest));
  }
}

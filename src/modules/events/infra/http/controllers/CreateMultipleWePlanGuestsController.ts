import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMultipleWePlanGuestsService from '@modules/events/services/CreateMultipleWePlanGuestsService';

export default class CreateMultipleWePlanGuestsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { users } = req.body;

    const host_id = req.user.id;

    const dataParams = req.params;

    const { event_id } = dataParams;

    const createGuests = container.resolve(CreateMultipleWePlanGuestsService);

    const guest = await createGuests.execute({
      event_id,
      host_id,
      users,
    });

    return res.json(classToClass(guest));
  }
}

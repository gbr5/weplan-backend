import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateEventOwnerNumberOfGuestsService from '@modules/events/services/UpdateEventOwnerNumberOfGuestsService';

export default class EventOwnerNumberOfGuestsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { owner_id } = reqParams;
    const { number_of_guests } = req.body;

    const updateEventOwner = container.resolve(
      UpdateEventOwnerNumberOfGuestsService,
    );

    const owner = await updateEventOwner.execute({
      owner_id,
      number_of_guests,
    });

    return res.json(classToClass(owner));
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateEventOwnersNumberOfGuestsService from '@modules/events/services/UpdateEventOwnersNumberOfGuestsService';

export default class EventOwnersNumberOfGuestsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_id } = reqParams;
    const { number_of_guests } = req.body;

    const updateEventOwner = container.resolve(
      UpdateEventOwnersNumberOfGuestsService,
    );

    await updateEventOwner.execute({
      event_id,
      number_of_guests,
    });
    return res
      .status(200)
      .send('Owners number of guests successfully updated.');
  }
}

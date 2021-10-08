import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateEventMembersNumberOfGuestsService from '@modules/events/services/UpdateEventMembersNumberOfGuestsService';

export default class EventMembersNumberOfGuestsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_id } = reqParams;
    const { number_of_guests } = req.body;

    const updateEventMember = container.resolve(
      UpdateEventMembersNumberOfGuestsService,
    );

    await updateEventMember.execute({
      event_id,
      number_of_guests,
    });
    return res
      .status(200)
      .send('Members number of guests successfully updated.');
  }
}

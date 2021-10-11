import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import DefineEventMembersNumberOfGuestsService from '@modules/events/services/DefineEventMembersNumberOfGuestsService';

export default class DefineEventMembersNumberOfGuestsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { event_id, number_of_guests } = req.body;
    const createEventMemberTask = container.resolve(
      DefineEventMembersNumberOfGuestsService,
    );

    const eventTask = await createEventMemberTask.execute({
      event_id,
      number_of_guests,
    });

    return res.json(classToClass(eventTask));
  }
}

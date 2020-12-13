import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateEventMemberNumberOfGuestsService from '@modules/events/services/UpdateEventMemberNumberOfGuestsService';

export default class EventMemberNumberOfGuestsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { member_id } = reqParams;
    const { number_of_guests } = req.body;

    const updateEventMember = container.resolve(
      UpdateEventMemberNumberOfGuestsService,
    );

    const member = await updateEventMember.execute({
      member_id,
      number_of_guests,
    });

    return res.json(classToClass(member));
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateEventDateVotingTypeService from '@modules/events/services/UpdateEventDateVotingTypeService';

export default class EventDateVotingTypeController {
  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;
    const { date_voting_type } = req.body;

    const updateEventDateVotingTypeService = container.resolve(
      UpdateEventDateVotingTypeService,
    );

    const event = await updateEventDateVotingTypeService.execute(
      event_id,
      date_voting_type,
    );

    return res.json(classToClass(event));
  }
}

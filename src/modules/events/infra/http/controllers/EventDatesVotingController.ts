import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateEventDatesVotingService from '@modules/events/services/UpdateEventDatesVotingService';

export default class EventDatesVotingController {
  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const updateEventDatesVotingService = container.resolve(
      UpdateEventDatesVotingService,
    );

    const event = await updateEventDatesVotingService.execute(event_id);

    return res.json(classToClass(event));
  }
}

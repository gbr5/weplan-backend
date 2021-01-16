import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEventDateVoteService from '@modules/events/services/CreateEventDateVoteService';
import DeleteEventDateVoteService from '@modules/events/services/DeleteEventDateVoteService';

export default class EventDateVotesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_date_id, isOwner } = req.body;
    const user_id = req.user.id;
    const createEventDateVotes = container.resolve(CreateEventDateVoteService);

    const eventDate = await createEventDateVotes.execute({
      event_date_id,
      isOwner,
      user_id,
    });

    return res.json(eventDate);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showEventDateVotes = container.resolve(DeleteEventDateVoteService);

    await showEventDateVotes.execute(id);

    return res.status(200).send();
  }
}

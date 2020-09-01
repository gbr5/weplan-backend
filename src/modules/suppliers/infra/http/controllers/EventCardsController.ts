import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventCardService from '@modules/suppliers/services/CreateEventCardService';
import ListEventCardsService from '@modules/suppliers/services/ListEventCardsService';
import ShowEventCardService from '@modules/suppliers/services/ShowEventCardService';
import DeleteEventCardService from '@modules/suppliers/services/DeleteEventCardService';
import UpdateEventCardService from '@modules/suppliers/services/UpdateFunnelStageService copy';

export default class EventCardsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_id } = req.body;

    const dataParams = req.params;

    const { card_unique_name } = dataParams;

    const createEventCards = container.resolve(CreateEventCardService);

    const card = await createEventCards.execute({
      event_id,
      card_unique_name,
    });

    return res.json(classToClass(card));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_unique_name } = dataParams;

    const showEventCard = container.resolve(ShowEventCardService);

    const card = await showEventCard.execute(card_unique_name);

    return res.json(classToClass(card));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const listEventCards = container.resolve(ListEventCardsService);

    const cards = await listEventCards.execute(event_id);

    return res.json(classToClass(cards));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { card_unique_name, event_id } = dataParams;

    const eventCard = container.resolve(UpdateEventCardService);

    await eventCard.execute(card_unique_name, event_id);

    return res.json(classToClass(eventCard));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { card_unique_name } = dataParams;

    const deleteEventCard = container.resolve(DeleteEventCardService);

    await deleteEventCard.execute(card_unique_name);

    return res.status(200).send();
  }
}

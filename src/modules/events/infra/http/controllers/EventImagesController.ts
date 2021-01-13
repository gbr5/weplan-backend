import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventImageService from '@modules/events/services/CreateEventImageService';
import ListEventImagesService from '@modules/events/services/ListEventImagesService';
import DeleteEventImageService from '@modules/events/services/DeleteEventImageService';

export default class EventImagesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_id, image_id } = req.body;
    const createEventImage = container.resolve(CreateEventImageService);
    const eventImage = await createEventImage.execute({
      event_id,
      image_id,
    });
    return res.json(classToClass(eventImage));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;
    const listEventImage = container.resolve(ListEventImagesService);
    const eventImage = await listEventImage.execute(event_id);
    return res.json(classToClass(eventImage));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteEventImage = container.resolve(DeleteEventImageService);
    await deleteEventImage.execute(id);
    return res.status(200).send();
  }
}

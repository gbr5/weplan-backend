import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventInspirationImageService from '@modules/events/services/CreateEventInspirationImageService';
import ListEventInspirationImagesService from '@modules/events/services/ListEventInspirationImagesService';
import DeleteEventInspirationImageService from '@modules/events/services/DeleteEventInspirationImageService';

export default class EventInspirationImagesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_id, inspiration_image_id } = req.body;
    const createEventInspirationImage = container.resolve(
      CreateEventInspirationImageService,
    );
    const eventInspirationImage = await createEventInspirationImage.execute({
      event_id,
      inspiration_image_id,
    });
    return res.json(classToClass(eventInspirationImage));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;
    const listEventInspirationImage = container.resolve(
      ListEventInspirationImagesService,
    );
    const eventInspirationImage = await listEventInspirationImage.execute(
      event_id,
    );
    return res.json(classToClass(eventInspirationImage));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteEventInspirationImage = container.resolve(
      DeleteEventInspirationImageService,
    );
    await deleteEventInspirationImage.execute(id);
    return res.status(200).send();
  }
}

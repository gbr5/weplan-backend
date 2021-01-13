import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventFileService from '@modules/events/services/CreateEventFileService';
import ListEventFilesService from '@modules/events/services/ListEventFilesService';
import DeleteEventFileService from '@modules/events/services/DeleteEventFileService';

export default class EventFilesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { file_id, event_id } = req.body;
    const createEventFile = container.resolve(CreateEventFileService);
    const eventFile = await createEventFile.execute({
      file_id,
      event_id,
    });
    return res.json(classToClass(eventFile));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;
    const listEventFile = container.resolve(ListEventFilesService);
    const eventFile = await listEventFile.execute(event_id);
    return res.json(classToClass(eventFile));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteEventFile = container.resolve(DeleteEventFileService);
    await deleteEventFile.execute(id);
    return res.status(200).send();
  }
}

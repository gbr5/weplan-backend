import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCardFileService from '@modules/users/services/CreateCardFileService';
import DeleteCardFileService from '@modules/users/services/DeleteCardFileService';
import ListCardFilesService from '@modules/users/services/ListCardFilesService';

export default class CardsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { card_unique_name, file_id } = req.body;

    const createCardFile = container.resolve(CreateCardFileService);

    const user = await createCardFile.execute({
      card_unique_name,
      file_id,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { card_unique_name } = reqParams;

    const listCardsFile = container.resolve(ListCardFilesService);

    const files = await listCardsFile.execute(card_unique_name);

    return res.json(classToClass(files));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCardFile = container.resolve(DeleteCardFileService);

    const file = await deleteCardFile.execute(id);

    return res.json(classToClass(file));
  }
}

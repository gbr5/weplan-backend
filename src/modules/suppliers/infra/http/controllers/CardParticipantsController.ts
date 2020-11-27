import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCardParticipantService from '@modules/suppliers/services/CreateCardParticipantService';
import ListCardParticipantsService from '@modules/suppliers/services/ListCardParticipantsService';
import DeleteCardParticipantService from '@modules/suppliers/services/DeleteCardParticipantService';

export default class CardParticipantsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, card_unique_name } = req.body;

    const createCardParticipants = container.resolve(
      CreateCardParticipantService,
    );

    const card = await createCardParticipants.execute({
      user_id,
      card_unique_name,
    });

    return res.json(classToClass(card));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_unique_name } = dataParams;

    const listCardParticipants = container.resolve(ListCardParticipantsService);

    const cards = await listCardParticipants.execute(card_unique_name);

    return res.json(classToClass(cards));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteCardParticipant = container.resolve(
      DeleteCardParticipantService,
    );

    await deleteCardParticipant.execute(id);

    return res.status(200).send();
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCardOutsideParticipantService from '@modules/suppliers/services/CreateCardOutsideParticipantService';
import ListCardOutsideParticipantsService from '@modules/suppliers/services/ListCardOutsideParticipantsService';
import DeleteCardOutsideParticipantService from '@modules/suppliers/services/DeleteCardOutsideParticipantService';
import UpdateCardOutsideParticipantService from '@modules/suppliers/services/UpdateCardOutsideParticipantService';

export default class CardOutsideParticipantsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      company_contact_id,
      card_unique_name,
      contact_card_unique_name,
      status,
      isActive,
    } = req.body;

    const createCardOutsideParticipants = container.resolve(
      CreateCardOutsideParticipantService,
    );

    const card = await createCardOutsideParticipants.execute({
      company_contact_id,
      card_unique_name,
      contact_card_unique_name,
      status,
      isActive,
    });

    return res.json(classToClass(card));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_unique_name } = dataParams;

    const listCardOutsideParticipants = container.resolve(
      ListCardOutsideParticipantsService,
    );

    const cards = await listCardOutsideParticipants.execute(card_unique_name);

    return res.json(classToClass(cards));
  }

  public async listContactCards(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const dataParams = req.params;
    const { contact_card_unique_name } = dataParams;

    const listCardOutsideParticipants = container.resolve(
      ListCardOutsideParticipantsService,
    );

    const cards = await listCardOutsideParticipants.execute(
      contact_card_unique_name,
    );

    return res.json(classToClass(cards));
  }

  public async listCompanyContact(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const dataParams = req.params;
    const { company_contact_id } = dataParams;

    const listCardOutsideParticipants = container.resolve(
      ListCardOutsideParticipantsService,
    );

    const cards = await listCardOutsideParticipants.execute(company_contact_id);

    return res.json(classToClass(cards));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;
    const {
      card_unique_name,
      contact_card_unique_name,
      status,
      isActive,
    } = req.body;

    const updateCardOutsideParticipant = container.resolve(
      UpdateCardOutsideParticipantService,
    );

    const cardOutsideParticipant = await updateCardOutsideParticipant.execute({
      id,
      card_unique_name,
      contact_card_unique_name,
      status,
      isActive,
    });

    return res.json(classToClass(cardOutsideParticipant));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteCardOutsideParticipant = container.resolve(
      DeleteCardOutsideParticipantService,
    );

    await deleteCardOutsideParticipant.execute(id);

    return res.status(200).send();
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateStageCardService from '@modules/suppliers/services/CreateStageCardService';
import UpdateStageCardService from '@modules/suppliers/services/UpdateStageCardService';
import ListStageCardsService from '@modules/suppliers/services/ListStageCardsService';
import DeleteStageCardService from '@modules/suppliers/services/DeleteStageCardService';

export default class StageCardController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { weplanEvent, name, card_owner } = req.body;
    const dataParams = req.params;
    const { stage_id } = dataParams;

    const isActive = true;
    const now = new Date();
    const uniqueName = `${name}-${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    const unique_name = uniqueName
      .split(' ')
      .map(word => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join('');

    const createStageCard = container.resolve(CreateStageCardService);

    const stageCard = await createStageCard.execute({
      weplanEvent,
      name,
      unique_name,
      isActive,
      stage_id,
      card_owner,
    });

    return res.json(classToClass(stageCard));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { stage_id } = dataParams;
    const listStageCards = container.resolve(ListStageCardsService);

    const stageCard = await listStageCards.execute(stage_id);

    return res.json(classToClass(stageCard));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      weplanEvent,
      name,
      isActive,
      new_stage_id,
      new_card_owner,
    } = req.body;
    const dataParams = req.params;
    const { id } = dataParams;

    const updateStageCard = container.resolve(UpdateStageCardService);

    const stageCard = await updateStageCard.execute(
      id,
      weplanEvent,
      name,
      isActive,
      new_stage_id,
      new_card_owner,
    );

    return res.json(classToClass(stageCard));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteStageCard = container.resolve(DeleteStageCardService);

    await deleteStageCard.execute(id);

    return res.status(200).send();
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStageCardService from '@modules/suppliers/services/CreateStageCardService';
import UpdateStageCardService from '@modules/suppliers/services/UpdateStageCardService';
import ListStageCardsService from '@modules/suppliers/services/ListStageCardsService';
import DeleteStageCardService from '@modules/suppliers/services/DeleteStageCardService';

export default class StageCardController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, card_owner } = req.body;
    const dataParams = req.params;
    const { stage_id } = dataParams;

    const createStageCard = container.resolve(CreateStageCardService);

    const stageCard = await createStageCard.execute({
      name,
      stage_id,
      card_owner,
    });

    return res.json(stageCard);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { stage_id } = dataParams;
    const listStageCards = container.resolve(ListStageCardsService);

    const stageCard = await listStageCards.execute(stage_id);

    return res.json(stageCard);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, card_owner, new_stage_id } = req.body;
    const dataParams = req.params;
    const { id, stage_id } = dataParams;

    const updateStageCard = container.resolve(UpdateStageCardService);

    const stageCard = await updateStageCard.execute(
      name,
      id,
      stage_id,
      new_stage_id,
      card_owner,
    );

    return res.json(stageCard);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteStageCard = container.resolve(DeleteStageCardService);

    await deleteStageCard.execute(id);

    return res.status(200).send();
  }
}

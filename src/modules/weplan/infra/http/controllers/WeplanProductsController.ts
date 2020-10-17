import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWeplanProductService from '@modules/weplan/services/CreateWeplanProductService';
import UpdateWeplanProductService from '@modules/weplan/services/UpdateWeplanProductService';
import DeleteWeplanProductService from '@modules/weplan/services/DeleteWeplanProductService';
import ListWeplanProductsService from '@modules/weplan/services/ListWeplanProductsService';

export default class WeplanProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, target_audience, price } = req.body;

    const createWeplanProduct = container.resolve(CreateWeplanProductService);

    const product = await createWeplanProduct.execute({
      name,
      target_audience,
      price,
    });

    return res.json(product);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listWeplanProducts = container.resolve(ListWeplanProductsService);

    const products = await listWeplanProducts.execute();

    return res.json(products);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { name, target_audience, price } = req.body;

    const updateWeplanProduct = container.resolve(UpdateWeplanProductService);

    const funnelType = await updateWeplanProduct.execute({
      id,
      name,
      target_audience,
      price,
    });

    return res.json(funnelType);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteWeplanProduct = container.resolve(DeleteWeplanProductService);

    await deleteWeplanProduct.execute(id);

    return res.status(200).send();
  }
}

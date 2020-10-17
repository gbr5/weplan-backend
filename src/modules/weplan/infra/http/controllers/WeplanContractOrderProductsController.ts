import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWeplanContractOrderProductService from '@modules/weplan/services/CreateWeplanContractOrderProductService';
import DeleteWeplanContractOrderProductService from '@modules/weplan/services/DeleteWeplanContractOrderProductService';
import ListWeplanContractOrderProductsService from '@modules/weplan/services/ListWeplanContractOrderProductsService';

export default class WeplanContractOrderProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { contract_order_id, weplan_product_id, price, quantity } = req.body;

    const createWeplanContractOrderProduct = container.resolve(
      CreateWeplanContractOrderProductService,
    );

    const order = await createWeplanContractOrderProduct.execute({
      contract_order_id,
      weplan_product_id,
      price,
      quantity,
    });

    return res.json(order);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { contract_order_id } = reqParams;
    const listWeplanContractOrderProducts = container.resolve(
      ListWeplanContractOrderProductsService,
    );

    const products = await listWeplanContractOrderProducts.execute(
      contract_order_id,
    );

    return res.json(products);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteWeplanContractOrderProduct = container.resolve(
      DeleteWeplanContractOrderProductService,
    );

    await deleteWeplanContractOrderProduct.execute(id);

    return res.status(200).send();
  }
}

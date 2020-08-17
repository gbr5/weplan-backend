import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSelectedSupplierService from '@modules/events/services/CreateSelectedSupplierService';
import ListSelectedSuppliersIsHiredService from '@modules/events/services/ListSelectedSuppliersIsHiredService';
import UpdateSelectedSupplierService from '@modules/events/services/UpdateSelectedSupplierService';
import DeleteSelectedSupplierService from '@modules/events/services/DeleteSelectedSupplierService';

export default class SelectedSuppliersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { supplier_id, event_id, supplier_sub_category, isHired } = req.body;

    const createSelectedSupplier = container.resolve(
      CreateSelectedSupplierService,
    );

    const selectedSupplier = await createSelectedSupplier.execute({
      supplier_id,
      event_id,
      supplier_sub_category,
      isHired,
    });

    return res.json(classToClass(selectedSupplier));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const listSelectedSuppliersIsHired = container.resolve(
      ListSelectedSuppliersIsHiredService,
    );

    const isHired = false;

    const selectedSuppliers = await listSelectedSuppliersIsHired.execute({
      event_id: dataParams.event_id,
      isHired,
    });

    return res.json(classToClass(selectedSuppliers));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { supplier_sub_category, isHired } = req.body;

    const dataParams = req.params;

    const updateSelectedSupplier = container.resolve(
      UpdateSelectedSupplierService,
    );

    const selectedSupplier = await updateSelectedSupplier.execute({
      supplier_id: dataParams.supplier_id,
      event_id: dataParams.event_id,
      supplier_sub_category,
      isHired,
    });

    return res.json(classToClass(selectedSupplier));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const deleteSelectedSupplier = container.resolve(
      DeleteSelectedSupplierService,
    );

    await deleteSelectedSupplier.execute({
      supplier_id: dataParams.supplier_id,
      event_id: dataParams.event_id,
    });

    return res.status(200).send();
  }
}

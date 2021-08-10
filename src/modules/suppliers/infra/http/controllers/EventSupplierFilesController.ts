import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventSupplierFileService from '@modules/suppliers/services/CreateEventSupplierFileService';
import DeleteEventSupplierFileService from '@modules/suppliers/services/DeleteEventSupplierFileService';
import ListEventSupplierFilesService from '@modules/suppliers/services/ListEventSupplierFilesService';

export default class EventSuppliersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { supplier_id } = reqParams;

    const createEventSupplierFile = container.resolve(
      CreateEventSupplierFileService,
    );

    const supplier = await createEventSupplierFile.execute({
      supplier_id,
      name: req.file.filename,
    });

    return res.json(classToClass(supplier));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { supplier_id } = reqParams;

    const listEventSuppliersFile = container.resolve(
      ListEventSupplierFilesService,
    );

    const files = await listEventSuppliersFile.execute(supplier_id);

    return res.json(classToClass(files));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteEventSupplierFile = container.resolve(
      DeleteEventSupplierFileService,
    );

    await deleteEventSupplierFile.execute(id);

    return res.status(200).send();
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowSupplierByTrimmedNameService from '@modules/suppliers/services/ShowSupplierByTrimmedNameService';

export default class ShowSupplierByTrimmedNameController {
  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { trimmed_name } = reqParams;

    const showSupplierByTrimmedName = container.resolve(
      ShowSupplierByTrimmedNameService,
    );

    const supplier = await showSupplierByTrimmedName.execute(trimmed_name);

    return res.json(classToClass(supplier));
  }
}

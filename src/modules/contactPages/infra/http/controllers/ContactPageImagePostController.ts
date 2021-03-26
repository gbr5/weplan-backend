import { Request, Response } from 'express';
import { container } from 'tsyringe';

import PatchContactPageImagePostService from '@modules/contactPages/services/PatchContactPageImagePostService';
import { classToClass } from 'class-transformer';

export default class ContactPageImagePostController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const patchContactPageImagePost = container.resolve(
      PatchContactPageImagePostService,
    );

    const contact_page = await patchContactPageImagePost.execute({
      id,
      image_url: req.file.filename,
    });

    return res.json(classToClass(contact_page));
  }
}

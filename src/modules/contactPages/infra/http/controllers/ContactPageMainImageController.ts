import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateContactPageMainImageService from '@modules/contactPages/services/UpdateContactPageMainImageService';

export default class ContactPageMainImage {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { contact_page_id } = reqParams;

    const updateContactPageMainImage = container.resolve(
      UpdateContactPageMainImageService,
    );

    const contact_page = await updateContactPageMainImage.execute({
      contact_page_id,
      image_url: req.file.filename,
    });

    return res.json(classToClass(contact_page));
  }
}

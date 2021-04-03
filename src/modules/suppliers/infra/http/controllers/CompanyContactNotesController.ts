import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyContactNoteService from '@modules/suppliers/services/CreateCompanyContactNoteService';
import ListCompanyContactNotesService from '@modules/suppliers/services/ListCompanyContactNotesService';
import DeleteCompanyContactNoteService from '@modules/suppliers/services/DeleteCompanyContactNoteService';
import UpdateCompanyContactNoteService from '@modules/suppliers/services/UpdateCompanyContactNoteService';

export default class CompanyContactNotesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_contact_id, note } = req.body;
    const createCompanyContactNotes = container.resolve(
      CreateCompanyContactNoteService,
    );

    const companyContactNote = await createCompanyContactNotes.execute({
      company_contact_id,
      note,
      isNew: true,
    });

    return res.json(classToClass(companyContactNote));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_contact_id } = reqParams;
    const listCompanyContactNotes = container.resolve(
      ListCompanyContactNotesService,
    );

    const companyContactNotes = await listCompanyContactNotes.execute(
      company_contact_id,
    );

    return res.json(classToClass(companyContactNotes));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { note, isNew } = req.body;
    const updateCompanyContactNote = container.resolve(
      UpdateCompanyContactNoteService,
    );

    const companyContactNote = await updateCompanyContactNote.execute(
      id,
      note,
      isNew,
    );

    return res.json(classToClass(companyContactNote));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCompanyContactNotes = container.resolve(
      DeleteCompanyContactNoteService,
    );

    await deleteCompanyContactNotes.execute(id);

    return res.status(200).send();
  }
}

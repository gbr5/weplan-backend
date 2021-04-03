import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyContactNotesRepository from '@modules/suppliers/repositories/ICompanyContactNotesRepository';

import CompanyContactNote from '@modules/suppliers/infra/typeorm/entities/CompanyContactNote';

@injectable()
class UpdateCompanyContactNoteDescriptionService {
  constructor(
    @inject('CompanyContactNotesRepository')
    private companyContactNotesRepository: ICompanyContactNotesRepository,
  ) {}

  public async execute(
    id: string,
    note: string,
    isNew: boolean,
  ): Promise<CompanyContactNote> {
    const companyContactNote = await this.companyContactNotesRepository.findById(
      id,
    );

    if (!companyContactNote) {
      throw new AppError('CompanyContactNotes not found.');
    }

    companyContactNote.note = note;
    companyContactNote.isNew = isNew;

    const updatedCompanyContactNotes = await this.companyContactNotesRepository.save(
      companyContactNote,
    );

    return updatedCompanyContactNotes;
  }
}

export default UpdateCompanyContactNoteDescriptionService;

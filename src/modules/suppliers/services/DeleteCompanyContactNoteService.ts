import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyContactNotesRepository from '@modules/suppliers/repositories/ICompanyContactNotesRepository';

@injectable()
class DeleteCompanyContactNoteService {
  constructor(
    @inject('CompanyContactNotesRepository')
    private companyContactNotesRepository: ICompanyContactNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const companyContactNote = await this.companyContactNotesRepository.findById(
      id,
    );

    if (!companyContactNote) {
      throw new AppError('No supplier found, within this category.');
    }

    await this.companyContactNotesRepository.delete(companyContactNote);
  }
}

export default DeleteCompanyContactNoteService;

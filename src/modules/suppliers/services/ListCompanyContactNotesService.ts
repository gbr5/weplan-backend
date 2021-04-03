import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICompanyContactNotesRepository from '@modules/suppliers/repositories/ICompanyContactNotesRepository';
import CompanyContactNote from '../infra/typeorm/entities/CompanyContactNote';

@injectable()
class ListCompanyContactNotesService {
  constructor(
    @inject('CompanyContactNotesRepository')
    private companyContactNotesRepository: ICompanyContactNotesRepository,
  ) {}

  public async execute(
    company_contact_id: string,
  ): Promise<CompanyContactNote[]> {
    const companyContactNotes = await this.companyContactNotesRepository.findByCompanyContactId(
      company_contact_id,
    );

    return companyContactNotes;
  }
}

export default ListCompanyContactNotesService;

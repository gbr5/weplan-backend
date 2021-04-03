import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyContactNote from '@modules/suppliers/infra/typeorm/entities/CompanyContactNote';
import ICompanyContactNotesRepository from '@modules/suppliers/repositories/ICompanyContactNotesRepository';
import ICreateCompanyContactNoteDTO from '../dtos/ICreateCompanyContactNoteDTO';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';

@injectable()
class CreateCompanyContactNoteService {
  constructor(
    @inject('CompanyContactNotesRepository')
    private companyContactNotesRepository: ICompanyContactNotesRepository,

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,
  ) {}

  public async execute({
    company_contact_id,
    note,
    isNew,
  }: ICreateCompanyContactNoteDTO): Promise<CompanyContactNote> {
    const companyContactExists = await this.companyContactsRepository.findById(
      company_contact_id,
    );

    if (!companyContactExists) {
      throw new AppError('Company not found!');
    }

    const companyContact = await this.companyContactNotesRepository.create({
      company_contact_id,
      note,
      isNew,
    });

    return companyContact;
  }
}

export default CreateCompanyContactNoteService;

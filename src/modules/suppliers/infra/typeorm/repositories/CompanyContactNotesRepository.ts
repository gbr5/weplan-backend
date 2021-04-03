import { getRepository, Repository } from 'typeorm';

import ICompanyContactNotesRepository from '@modules/suppliers/repositories/ICompanyContactNotesRepository';
import ICreateCompanyContactNoteDTO from '@modules/suppliers/dtos/ICreateCompanyContactNoteDTO';

import CompanyContactNote from '@modules/suppliers/infra/typeorm/entities/CompanyContactNote';
import AppError from '@shared/errors/AppError';

class CompanyContactNotesRepository implements ICompanyContactNotesRepository {
  private ormRepository: Repository<CompanyContactNote>;

  constructor() {
    this.ormRepository = getRepository(CompanyContactNote);
  }

  public async findByCompanyContactId(
    company_contact_id: string,
  ): Promise<CompanyContactNote[]> {
    const findCompanyContactNote = await this.ormRepository.find({
      where: { company_contact_id },
    });

    return findCompanyContactNote;
  }

  public async findById(id: string): Promise<CompanyContactNote | undefined> {
    const companyContact = await this.ormRepository.findOne(id);

    return companyContact;
  }

  public async create(
    data: ICreateCompanyContactNoteDTO,
  ): Promise<CompanyContactNote> {
    try {
      const companyEmployee = this.ormRepository.create(data);

      await this.ormRepository.save(companyEmployee);

      return companyEmployee;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyContactNotesRepository.create',
        err,
      );
    }
  }

  public async save(
    companyContact: CompanyContactNote,
  ): Promise<CompanyContactNote> {
    return this.ormRepository.save(companyContact);
  }

  public async delete(companyContact: CompanyContactNote): Promise<void> {
    try {
      await this.ormRepository.delete(companyContact.id);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyContactNotesRepository.delete',
      );
    }
  }
}

export default CompanyContactNotesRepository;

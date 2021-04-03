import CompanyContactNote from '@modules/suppliers/infra/typeorm/entities/CompanyContactNote';
import ICreateCompanyContactNoteDTO from '@modules/suppliers/dtos/ICreateCompanyContactNoteDTO';

export default interface ICompanyContactNotesRepository {
  create(data: ICreateCompanyContactNoteDTO): Promise<CompanyContactNote>;
  findByCompanyContactId(
    company_contact_id: string,
  ): Promise<CompanyContactNote[]>;
  findById(id: string): Promise<CompanyContactNote | undefined>;
  save(supplier: CompanyContactNote): Promise<CompanyContactNote>;
  delete(employee: CompanyContactNote): Promise<void>;
}

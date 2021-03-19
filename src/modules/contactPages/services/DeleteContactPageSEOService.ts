import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IContactPageSEORepository from '../repositories/IContactPageSEORepository';

@injectable()
class DeleteContactPageSEOService {
  constructor(
    @inject('ContactPageSEORepository')
    private contactPageSEORepository: IContactPageSEORepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const employee = await this.companyEmployeesRepository.findById(user_id);

    if (!employee) {
      throw new AppError('Contact page seo not found!');
    }

    const seo = await this.contactPageSEORepository.findById(id);

    if (!seo) {
      throw new AppError('Contact page seo not found!');
    }

    const contactPage = await this.userContactPagesRepository.findById(
      seo.contact_page_id,
    );

    if (!contactPage || contactPage.user_id !== employee.company_id) {
      throw new AppError('Contact page not found!');
    }

    await this.contactPageSEORepository.delete(id);
  }
}

export default DeleteContactPageSEOService;

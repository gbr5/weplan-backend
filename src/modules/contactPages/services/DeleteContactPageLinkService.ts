import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IContactPageLinksRepository from '../repositories/IContactPageLinksRepository';

@injectable()
class DeleteContactPageLinkService {
  constructor(
    @inject('ContactPageLinksRepository')
    private contactPageLinksRepository: IContactPageLinksRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const employee = await this.companyEmployeesRepository.findById(user_id);

    if (!employee) {
      throw new AppError('Contact page link not found!');
    }

    const link = await this.contactPageLinksRepository.findById(id);

    if (!link) {
      throw new AppError('Contact page link not found!');
    }

    const contactPage = await this.userContactPagesRepository.findById(
      link.contact_page_id,
    );

    if (!contactPage || contactPage.user_id !== employee.company_id) {
      throw new AppError('Contact page not found!');
    }

    await this.contactPageLinksRepository.delete(id);
  }
}

export default DeleteContactPageLinkService;

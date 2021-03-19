import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IContactPageCampaignsRepository from '../repositories/IContactPageCampaignsRepository';

@injectable()
class DeleteContactPageCampaignService {
  constructor(
    @inject('ContactPageCampaignsRepository')
    private contactPageCampaignsRepository: IContactPageCampaignsRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const employee = await this.companyEmployeesRepository.findById(user_id);

    if (!employee) {
      throw new AppError('User not found!');
    }

    const post = await this.contactPageCampaignsRepository.findById(id);

    if (!post) {
      throw new AppError('Contact page post not found!');
    }

    const contactPage = await this.userContactPagesRepository.findById(
      post.contact_page_id,
    );

    if (!contactPage || contactPage.user_id !== employee.company_id) {
      throw new AppError('Contact page not found!');
    }

    await this.contactPageCampaignsRepository.delete(id);
  }
}

export default DeleteContactPageCampaignService;

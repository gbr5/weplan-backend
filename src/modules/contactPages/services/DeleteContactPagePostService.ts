import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IContactPagePostsRepository from '../repositories/IContactPagePostsRepository';

@injectable()
class DeleteContactPagePostService {
  constructor(
    @inject('ContactPagePostsRepository')
    private contactPagePostsRepository: IContactPagePostsRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const employee = await this.companyEmployeesRepository.findById(user_id);

    if (!employee) {
      throw new AppError('Contact page post not found!');
    }

    const post = await this.contactPagePostsRepository.findById(id);

    if (!post) {
      throw new AppError('Contact page post not found!');
    }

    const contactPage = await this.userContactPagesRepository.findById(
      post.contact_page_id,
    );

    if (!contactPage || contactPage.user_id !== employee.company.id) {
      throw new AppError('Contact page not found!');
    }

    await this.contactPagePostsRepository.delete(id);
  }
}

export default DeleteContactPagePostService;

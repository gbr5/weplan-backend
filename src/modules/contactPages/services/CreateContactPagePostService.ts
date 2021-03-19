import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IContactPagePostsRepository from '../repositories/IContactPagePostsRepository';
import ContactPagePost from '../infra/typeorm/entities/ContactPagePost';
import ICreateContactPagePostDTO from '../dtos/ICreateContactPagePostDTO';

interface IRequest extends ICreateContactPagePostDTO {
  user_id: string;
}

@injectable()
class CreateContactPagePostService {
  constructor(
    @inject('ContactPagePostsRepository')
    private contactPagePostsRepository: IContactPagePostsRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    user_id,
    contact_page_id,
    image_url,
    destination_url,
  }: IRequest): Promise<ContactPagePost> {
    const employee = await this.companyEmployeesRepository.findById(user_id);

    if (!employee) {
      throw new AppError('User not found!');
    }

    const userContactPage = await this.userContactPagesRepository.findById(
      contact_page_id,
    );

    if (!userContactPage) {
      throw new AppError('Contact page not found!');
    }

    if (employee.company_id !== userContactPage.user_id) {
      throw new AppError('User not found!');
    }

    const contactPagePost = await this.contactPagePostsRepository.create({
      contact_page_id,
      image_url,
      destination_url,
    });

    return contactPagePost;
  }
}

export default CreateContactPagePostService;

import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IContactPageSEORepository from '../repositories/IContactPageSEORepository';
import ContactPageSEO from '../infra/typeorm/entities/ContactPageSEO';
import ICreateContactPageSEO from '../dtos/ICreateContactPageSEO';

interface IRequest extends ICreateContactPageSEO {
  user_id: string;
}

@injectable()
class CreateContactPageSEOService {
  constructor(
    @inject('ContactPageSEORepository')
    private contactPageSEORepository: IContactPageSEORepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    user_id,
    contact_page_id,
    image_url,
    title,
    description,
    shouldIndexPage,
  }: IRequest): Promise<ContactPageSEO> {
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

    if (user_id !== userContactPage.user_id) {
      throw new AppError('User not found!');
    }

    const contactPageSEO = await this.contactPageSEORepository.create({
      contact_page_id,
      image_url,
      title,
      description,
      shouldIndexPage,
    });

    return contactPageSEO;
  }
}

export default CreateContactPageSEOService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IContactPageSEORepository from '../repositories/IContactPageSEORepository';
import ContactPageSEO from '../infra/typeorm/entities/ContactPageSEO';
import IUserContactPagesRepository from '../repositories/IUserContactPagesRepository';

interface IRequest {
  id: string;
  user_id: string;
  image_url: string;
  title: string;
  description: string;
  shouldIndexPage: boolean;
}

@injectable()
class UpdateContactPageSEOService {
  constructor(
    @inject('ContactPageSEORepository')
    private contactPageSEORepository: IContactPageSEORepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    id,
    user_id,
    image_url,
    title,
    description,
    shouldIndexPage,
  }: IRequest): Promise<ContactPageSEO> {
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

    seo.image_url = image_url;
    seo.title = title;
    seo.shouldIndexPage = shouldIndexPage;
    seo.description = description;

    await this.contactPageSEORepository.save(seo);

    return seo;
  }
}

export default UpdateContactPageSEOService;

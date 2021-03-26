import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import { sortContactPageLink } from '@config/sortContactPageLink';
import IContactPageLinksRepository from '../repositories/IContactPageLinksRepository';
import ContactPageLink from '../infra/typeorm/entities/ContactPageLink';
import ICreateContactPageLinkDTO from '../dtos/ICreateContactPageLinkDTO';

interface IRequest extends Omit<ICreateContactPageLinkDTO, 'position'> {
  user_id: string;
}

@injectable()
class CreateContactPageLinkService {
  constructor(
    @inject('ContactPageLinksRepository')
    private contactPageLinksRepository: IContactPageLinksRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    user_id,
    contact_page_id,
    label,
    url,
    text_color,
    background_color,
    isActive,
  }: IRequest): Promise<ContactPageLink> {
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

    const sortedLinks = sortContactPageLink(userContactPage.links).reverse();

    const position =
      sortedLinks && sortedLinks.length > 0
        ? Number(sortedLinks[0].position) + 1
        : 1;

    const contactPageLink = await this.contactPageLinksRepository.create({
      contact_page_id,
      label,
      url,
      text_color,
      position,
      background_color,
      isActive,
    });

    return contactPageLink;
  }
}

export default CreateContactPageLinkService;

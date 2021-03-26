import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IContactPageLinksRepository from '../repositories/IContactPageLinksRepository';
import ContactPageLink from '../infra/typeorm/entities/ContactPageLink';
import IUserContactPagesRepository from '../repositories/IUserContactPagesRepository';

interface IRequest {
  id: string;
  user_id: string;
  label: string;
  url: string;
  text_color: string;
  background_color: string;
  position: number;
  isActive: boolean;
}

@injectable()
class UpdateContactPageLinkService {
  constructor(
    @inject('ContactPageLinksRepository')
    private contactPageLinksRepository: IContactPageLinksRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    id,
    user_id,
    label,
    url,
    text_color,
    background_color,
    position,
    isActive,
  }: IRequest): Promise<ContactPageLink> {
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

    if (link.position !== position) {
      const linksToUpdate = contactPage.links
        .filter(thisLink => thisLink.position >= position)
        .map(thisLink => {
          return {
            ...thisLink,
            position: Number(thisLink) + 1,
          };
        });
      if (linksToUpdate.length > 0) {
        Promise.all([
          linksToUpdate.map(thisLink => {
            return this.contactPageLinksRepository.save(thisLink);
          }),
        ]);
      }
      if (position > contactPage.links.length) {
        link.position = contactPage.links.length;
      } else {
        link.position = position;
      }
    }

    link.label = label;
    link.url = url;
    link.text_color = text_color;
    link.background_color = background_color;
    link.isActive = isActive;

    await this.contactPageLinksRepository.save(link);

    return link;
  }
}

export default UpdateContactPageLinkService;

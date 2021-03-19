import { injectable, inject } from 'tsyringe';

import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICreateUserContactPageDTO from '../dtos/ICreateUserContactPageDTO';

@injectable()
class CreateUserContactPageService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    slug,
    user_id,
    image_url,
    title,
    cta_label,
    cta_url,
    isActive,
  }: ICreateUserContactPageDTO): Promise<UserContactPage> {
    const employee = await this.companyEmployeesRepository.findById(user_id);

    if (!employee) {
      throw new AppError('User not found.');
    }

    const userContactPage = await this.userContactPagesRepository.findByUserIdAndSlug(
      {
        slug,
        user_id: employee.company_id,
      },
    );

    if (userContactPage) {
      throw new AppError(
        'A page with the same slug already exists. Try another one!',
      );
    }

    const contactPage = await this.userContactPagesRepository.create({
      user_id: employee.company_id,
      slug,
      image_url,
      title,
      cta_label,
      cta_url,
      isActive,
    });

    return contactPage;
  }
}

export default CreateUserContactPageService;

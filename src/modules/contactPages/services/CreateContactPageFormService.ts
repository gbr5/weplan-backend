import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IContactPageFormsRepository from '../repositories/IContactPageFormsRepository';
import ContactPageForm from '../infra/typeorm/entities/ContactPageForm';
import ICreateContactPageFormDTO from '../dtos/ICreateContactPageFormDTO';

interface IRequest extends ICreateContactPageFormDTO {
  user_id: string;
}

@injectable()
class CreateContactPageFormService {
  constructor(
    @inject('ContactPageFormsRepository')
    private contactPageFormsRepository: IContactPageFormsRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    user_id,
    contact_page_id,
    form_id,
    isActive,
  }: IRequest): Promise<ContactPageForm> {
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
    const userForm = await this.userFormsRepository.findById(form_id);

    if (!userForm) {
      throw new AppError('User form not found!');
    }

    if (
      employee.company_id !== userForm.user_id ||
      employee.company_id !== userContactPage.user_id
    ) {
      throw new AppError('User not found!');
    }

    const contactPageForm = await this.contactPageFormsRepository.create({
      contact_page_id,
      form_id,
      isActive,
    });

    return contactPageForm;
  }
}

export default CreateContactPageFormService;

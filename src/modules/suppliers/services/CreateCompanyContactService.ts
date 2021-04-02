import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyContact from '@modules/suppliers/infra/typeorm/entities/CompanyContact';
import ICompanyContactsRepository from '@modules/suppliers/repositories/ICompanyContactsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateCompanyContactDTO from '../dtos/ICreateCompanyContactDTO';

@injectable()
class CreateCompanyContactService {
  constructor(
    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    company_id,
    name,
    family_name,
    description,
    company_contact_type,
    weplanUser,
    isCompany,
    isNew,
  }: ICreateCompanyContactDTO): Promise<CompanyContact> {
    try {
      const companyContactExists = await this.companyContactsRepository.findByCompanyIdAndNameAndFamilyName(
        company_id,
        name,
        family_name,
      );

      if (companyContactExists) {
        throw new AppError(
          `${name} is already registered to your contact list.`,
        );
      }

      const company = await this.usersRepository.findById(company_id);

      if (!company || !company.isCompany) {
        throw new AppError('Company not found');
      }

      const companyContact = await this.companyContactsRepository.create({
        company_id,
        name,
        family_name,
        description,
        company_contact_type,
        weplanUser,
        isCompany,
        isNew,
      });

      return companyContact;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCompanyContactService;

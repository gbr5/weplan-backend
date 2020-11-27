import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyContactInfo from '@modules/suppliers/infra/typeorm/entities/CompanyContactInfo';
import ICompanyContactInfosRepository from '@modules/suppliers/repositories/ICompanyContactInfosRepository';
import ICreateCompanyContactInfoDTO from '../dtos/ICreateCompanyContactInfoDTO';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';

@injectable()
class CreateCompanyContactInfoService {
  constructor(
    @inject('CompanyContactInfosRepository')
    private companyContactInfosRepository: ICompanyContactInfosRepository,

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,
  ) {}

  public async execute({
    company_contact_id,
    info_type,
    info,
  }: ICreateCompanyContactInfoDTO): Promise<CompanyContactInfo> {
    try {
      const companyContactExists = await this.companyContactsRepository.findByCompanyIdAndName(
        company_contact_id,
        info,
      );

      if (companyContactExists) {
        throw new AppError(`${info} is already registered to your contact.`);
      }

      const company_contact = await this.companyContactsRepository.findById(
        company_contact_id,
      );

      if (!company_contact) {
        throw new AppError('Company not found');
      }

      const companyContact = await this.companyContactInfosRepository.create({
        company_contact_id,
        info_type,
        info,
      });

      return companyContact;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCompanyContactInfoService;

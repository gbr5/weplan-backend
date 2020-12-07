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
      const companyContactExists = await this.companyContactsRepository.findById(
        company_contact_id,
      );

      if (!companyContactExists) {
        throw new AppError('Company not found!');
      }

      if (info_type === 'Email') {
        const companyContacts = await this.companyContactsRepository.findByCompanyId(
          companyContactExists.company_id,
        );
        companyContacts.find(contact => {
          const emailExists = contact.contact_infos.find(
            xInfo => xInfo.info_type === 'Email' && xInfo.info === info,
          );

          if (emailExists) {
            throw new AppError(
              'This email is already associated with another contact',
            );
          }
          return '';
        });
      }

      const company_contact = await this.companyContactInfosRepository.findByContactIdAndInfo(
        company_contact_id,
        info,
      );

      if (company_contact) {
        throw new AppError('Info already exists!');
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

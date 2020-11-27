import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICompanyContactInfosRepository from '@modules/suppliers/repositories/ICompanyContactInfosRepository';
import CompanyContactInfo from '../infra/typeorm/entities/CompanyContactInfo';

@injectable()
class ListCompanyContactInfosService {
  constructor(
    @inject('CompanyContactInfosRepository')
    private companyContactInfosRepository: ICompanyContactInfosRepository,
  ) {}

  public async execute(
    company_contact_id: string,
  ): Promise<CompanyContactInfo[]> {
    const companyContactInfos = await this.companyContactInfosRepository.findByCompanyContactId(
      company_contact_id,
    );

    return companyContactInfos;
  }
}

export default ListCompanyContactInfosService;

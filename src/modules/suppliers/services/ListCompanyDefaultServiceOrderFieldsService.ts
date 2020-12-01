import { injectable, inject } from 'tsyringe';

import ICompanyDefaultServiceOrderFieldsRepository from '@modules/suppliers/repositories/ICompanyDefaultServiceOrderFieldsRepository';

import CompanyDefaultServiceOrderField from '@modules/suppliers/infra/typeorm/entities/CompanyDefaultServiceOrderField';

@injectable()
class ListCompanyDefaultServiceOrderFieldsService {
  constructor(
    @inject('CompanyDefaultServiceOrderFieldsRepository')
    private companyDefaultServiceOrderFieldsRepository: ICompanyDefaultServiceOrderFieldsRepository,
  ) {}

  public async execute(
    company_id: string,
  ): Promise<CompanyDefaultServiceOrderField[]> {
    const budgets = await this.companyDefaultServiceOrderFieldsRepository.findByCompanyId(
      company_id,
    );

    return budgets;
  }
}

export default ListCompanyDefaultServiceOrderFieldsService;

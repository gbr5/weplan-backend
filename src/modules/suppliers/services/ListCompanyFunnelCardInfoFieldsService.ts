import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyFunnelCardInfoField from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfoField';
import ICompanyFunnelCardInfoFieldsRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfoFieldsRepository';

@injectable()
class ListCompanyFunnelCardInfoFieldsService {
  constructor(
    @inject('CompanyFunnelCardInfoFieldsRepository')
    private funnelCardInfoFieldsRepository: ICompanyFunnelCardInfoFieldsRepository,
  ) {}

  public async execute(
    funnel_id: string,
  ): Promise<CompanyFunnelCardInfoField[]> {
    const funnelCardInfoFields = await this.funnelCardInfoFieldsRepository.findByFunnelId(
      funnel_id,
    );

    return funnelCardInfoFields;
  }
}

export default ListCompanyFunnelCardInfoFieldsService;

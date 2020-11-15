import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyFunnelCardInfo from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfo';
import ICompanyFunnelCardInfosRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfosRepository';

@injectable()
class ListCompanyFunnelCardInfosService {
  constructor(
    @inject('CompanyFunnelCardInfosRepository')
    private funnelCardInfosRepository: ICompanyFunnelCardInfosRepository,
  ) {}

  public async execute(
    card_unique_name: string,
  ): Promise<CompanyFunnelCardInfo[]> {
    const funnelCardInfos = await this.funnelCardInfosRepository.findByCardUniqueName(
      card_unique_name,
    );

    return funnelCardInfos;
  }
}

export default ListCompanyFunnelCardInfosService;

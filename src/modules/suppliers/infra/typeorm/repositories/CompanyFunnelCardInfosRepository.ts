import { getRepository, Repository } from 'typeorm';

import ICompanyFunnelCardInfosRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfosRepository';

import CompanyFunnelCardInfo from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfo';
import ICreateCompanyFunnelCardInfoDTO from '@modules/suppliers/dtos/ICreateCompanyFunnelCardInfoDTO';

class CompanyFunnelCardInfosRepository
  implements ICompanyFunnelCardInfosRepository {
  private ormRepository: Repository<CompanyFunnelCardInfo>;

  constructor() {
    this.ormRepository = getRepository(CompanyFunnelCardInfo);
  }

  public async findById(
    id: string,
  ): Promise<CompanyFunnelCardInfo | undefined> {
    const funnelCardInfo = await this.ormRepository.findOne({ id });

    return funnelCardInfo;
  }

  public async findByCardUniqueNameAndFunnelId(
    card_unique_name: string,
    funnel_card_field_id: string,
  ): Promise<CompanyFunnelCardInfo | undefined> {
    const funnelCardInfo = await this.ormRepository.findOne({
      funnel_card_field_id,
      card_unique_name,
    });

    return funnelCardInfo;
  }

  public async findByCardUniqueName(
    card_unique_name: string,
  ): Promise<CompanyFunnelCardInfo[]> {
    const funnelCardInfos = await this.ormRepository.find({
      where: { card_unique_name },
    });

    return funnelCardInfos;
  }

  public async create(
    data: ICreateCompanyFunnelCardInfoDTO,
  ): Promise<CompanyFunnelCardInfo> {
    const funnelCardInfo = await this.ormRepository.create(data);

    await this.ormRepository.save(funnelCardInfo);

    return funnelCardInfo;
  }

  public async save(
    funnelCardInfo: CompanyFunnelCardInfo,
  ): Promise<CompanyFunnelCardInfo> {
    return this.ormRepository.save(funnelCardInfo);
  }

  public async delete({ id }: CompanyFunnelCardInfo): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default CompanyFunnelCardInfosRepository;

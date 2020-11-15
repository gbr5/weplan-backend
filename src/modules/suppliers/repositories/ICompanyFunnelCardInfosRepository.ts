import CompanyFunnelCardInfo from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfo';
import ICreateCompanyFunnelCardInfoDTO from '@modules/suppliers/dtos/ICreateCompanyFunnelCardInfoDTO';

export default interface ICompanyFunnelCardInfosRepository {
  create(data: ICreateCompanyFunnelCardInfoDTO): Promise<CompanyFunnelCardInfo>;
  findById(id: string): Promise<CompanyFunnelCardInfo | undefined>;
  findByCardUniqueNameAndFunnelId(
    funnel_card_field_id: string,
    card_unique_name: string,
  ): Promise<CompanyFunnelCardInfo | undefined>;
  findByCardUniqueName(
    card_unique_name: string,
  ): Promise<CompanyFunnelCardInfo[]>;
  save(funnelStage: CompanyFunnelCardInfo): Promise<CompanyFunnelCardInfo>;
  delete(funnelStage: CompanyFunnelCardInfo): Promise<void>;
}

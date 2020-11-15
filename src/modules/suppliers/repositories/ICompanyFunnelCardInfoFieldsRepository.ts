import CompanyFunnelCardInfoField from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfoField';
import ICreateCompanyFunnelCardInfoFieldDTO from '@modules/suppliers/dtos/ICreateCompanyFunnelCardInfoFieldDTO';

export default interface ICompanyFunnelCardInfoFieldsRepository {
  create(
    data: ICreateCompanyFunnelCardInfoFieldDTO,
  ): Promise<CompanyFunnelCardInfoField>;
  findById(id: string): Promise<CompanyFunnelCardInfoField | undefined>;
  findByFunnelId(funnel_id: string): Promise<CompanyFunnelCardInfoField[]>;
  findByFunnelIdAndName(
    funnel_id: string,
    name: string,
  ): Promise<CompanyFunnelCardInfoField | undefined>;
  save(
    funnelStage: CompanyFunnelCardInfoField,
  ): Promise<CompanyFunnelCardInfoField>;
  delete(funnelStage: CompanyFunnelCardInfoField): Promise<void>;
}

import { getRepository, Repository } from 'typeorm';

import ICompanyFunnelCardInfoFieldsRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfoFieldsRepository';

import CompanyFunnelCardInfoField from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfoField';
import ICreateCompanyFunnelCardInfoFieldDTO from '@modules/suppliers/dtos/ICreateCompanyFunnelCardInfoFieldDTO';

class CompanyFunnelCardInfoFieldsRepository
  implements ICompanyFunnelCardInfoFieldsRepository {
  private ormRepository: Repository<CompanyFunnelCardInfoField>;

  constructor() {
    this.ormRepository = getRepository(CompanyFunnelCardInfoField);
  }

  public async findById(
    id: string,
  ): Promise<CompanyFunnelCardInfoField | undefined> {
    const funnelCardInfoField = await this.ormRepository.findOne({ id });

    return funnelCardInfoField;
  }

  public async findByFunnelId(
    funnel_id: string,
  ): Promise<CompanyFunnelCardInfoField[]> {
    const funnelCardInfoFields = await this.ormRepository.find({
      where: { funnel_id },
    });

    return funnelCardInfoFields;
  }

  public async findByFunnelIdAndName(
    funnel_id: string,
    name: string,
  ): Promise<CompanyFunnelCardInfoField | undefined> {
    const funnelCardInfoField = await this.ormRepository.findOne({
      where: { funnel_id, name },
    });

    return funnelCardInfoField;
  }

  public async create(
    data: ICreateCompanyFunnelCardInfoFieldDTO,
  ): Promise<CompanyFunnelCardInfoField> {
    const funnelCardInfoField = await this.ormRepository.create(data);

    await this.ormRepository.save(funnelCardInfoField);

    return funnelCardInfoField;
  }

  public async save(
    funnelCardInfoField: CompanyFunnelCardInfoField,
  ): Promise<CompanyFunnelCardInfoField> {
    return this.ormRepository.save(funnelCardInfoField);
  }

  public async delete({
    id,
    funnel_id,
  }: CompanyFunnelCardInfoField): Promise<void> {
    await this.ormRepository.delete({ id, funnel_id });
  }
}

export default CompanyFunnelCardInfoFieldsRepository;

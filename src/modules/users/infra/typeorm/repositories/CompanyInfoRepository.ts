import { getRepository, Repository } from 'typeorm';

import ICompanyInfoRepository from '@modules/users/repositories/ICompanyInfoRepository';
import ICreateCompanyInfoDTO from '@modules/users/dtos/ICreateCompanyInfoDTO';

import CompanyInfo from '@modules/users/infra/typeorm/entities/CompanyInfo';

class CompanyInfoRepository implements ICompanyInfoRepository {
  private ormRepository: Repository<CompanyInfo>;

  constructor() {
    this.ormRepository = getRepository(CompanyInfo);
  }

  public async findByUserId(id: string): Promise<CompanyInfo | undefined> {
    const companyInfo = await this.ormRepository.findOne({
      where: { user_id: id },
    });

    return companyInfo;
  }

  public async create(
    companyInfoData: ICreateCompanyInfoDTO,
  ): Promise<CompanyInfo> {
    const companyInfo = this.ormRepository.create(companyInfoData);

    await this.ormRepository.save(companyInfo);

    return companyInfo;
  }

  public async save(companyInfo: CompanyInfo): Promise<CompanyInfo> {
    return this.ormRepository.save(companyInfo);
  }
}

export default CompanyInfoRepository;

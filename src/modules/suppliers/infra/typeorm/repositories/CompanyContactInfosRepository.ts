import { getRepository, Repository } from 'typeorm';

import ICompanyContactInfosRepository from '@modules/suppliers/repositories/ICompanyContactInfosRepository';
import ICreateCompanyContactInfoDTO from '@modules/suppliers/dtos/ICreateCompanyContactInfoDTO';

import CompanyContactInfo from '@modules/suppliers/infra/typeorm/entities/CompanyContactInfo';
import AppError from '@shared/errors/AppError';

class CompanyContactInfosRepository implements ICompanyContactInfosRepository {
  private ormRepository: Repository<CompanyContactInfo>;

  constructor() {
    this.ormRepository = getRepository(CompanyContactInfo);
  }

  public async findByCompanyContactId(
    company_contact_id: string,
  ): Promise<CompanyContactInfo[]> {
    const findCompanyContactInfo = await this.ormRepository.find({
      where: { company_contact_id },
    });

    return findCompanyContactInfo;
  }

  public async findByContactIdAndInfo(
    company_contact_id: string,
    info: string,
  ): Promise<CompanyContactInfo | undefined> {
    const findCompanyContactInfo = await this.ormRepository.findOne({
      where: { company_contact_id, info },
    });

    return findCompanyContactInfo;
  }

  public async findById(id: string): Promise<CompanyContactInfo | undefined> {
    const companyContact = await this.ormRepository.findOne(id);

    return companyContact;
  }

  public async create(
    data: ICreateCompanyContactInfoDTO,
  ): Promise<CompanyContactInfo> {
    try {
      const companyEmployee = this.ormRepository.create(data);

      await this.ormRepository.save(companyEmployee);

      return companyEmployee;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyContactInfosRepository.create',
        err,
      );
    }
  }

  public async save(
    companyContact: CompanyContactInfo,
  ): Promise<CompanyContactInfo> {
    return this.ormRepository.save(companyContact);
  }

  public async delete(companyContact: CompanyContactInfo): Promise<void> {
    try {
      await this.ormRepository.delete(companyContact.id);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyContactInfosRepository.delete',
      );
    }
  }
}

export default CompanyContactInfosRepository;

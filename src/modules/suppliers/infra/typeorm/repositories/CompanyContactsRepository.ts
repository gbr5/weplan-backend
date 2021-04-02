import { getRepository, Repository } from 'typeorm';

import ICompanyContactsRepository from '@modules/suppliers/repositories/ICompanyContactsRepository';
import ICreateCompanyContactDTO from '@modules/suppliers/dtos/ICreateCompanyContactDTO';

import CompanyContact from '@modules/suppliers/infra/typeorm/entities/CompanyContact';
import AppError from '@shared/errors/AppError';

class CompanyContactsRepository implements ICompanyContactsRepository {
  private ormRepository: Repository<CompanyContact>;

  constructor() {
    this.ormRepository = getRepository(CompanyContact);
  }

  public async findByCompanyId(company_id: string): Promise<CompanyContact[]> {
    const findCompanyContact = await this.ormRepository.find({
      where: { company_id },
    });

    return findCompanyContact;
  }

  public async findByCompanyIdAndNameAndFamilyName(
    company_id: string,
    name: string,
    family_name: string,
  ): Promise<CompanyContact | undefined> {
    const findCompanyContact = await this.ormRepository.findOne({
      where: { company_id, name, family_name },
    });

    return findCompanyContact;
  }

  public async findById(id: string): Promise<CompanyContact | undefined> {
    const companyContact = await this.ormRepository.findOne(id);

    return companyContact;
  }

  public async create(data: ICreateCompanyContactDTO): Promise<CompanyContact> {
    try {
      const companyEmployee = this.ormRepository.create(data);

      await this.ormRepository.save(companyEmployee);

      return companyEmployee;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyContactsRepository.create',
        err,
      );
    }
  }

  public async save(companyContact: CompanyContact): Promise<CompanyContact> {
    return this.ormRepository.save(companyContact);
  }

  public async delete(companyContact: CompanyContact): Promise<void> {
    try {
      await this.ormRepository.delete(companyContact.id);
    } catch (err) {
      throw new AppError('Algo deu errado, CompanyContactsRepository.delete');
    }
  }
}

export default CompanyContactsRepository;

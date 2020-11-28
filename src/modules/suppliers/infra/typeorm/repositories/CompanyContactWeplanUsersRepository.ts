import { getRepository, Repository } from 'typeorm';

import ICompanyContactWeplanUsersRepository from '@modules/suppliers/repositories/ICompanyContactWeplanUsersRepository';
import ICreateCompanyContactWeplanUserDTO from '@modules/suppliers/dtos/ICreateCompanyContactWeplanUserDTO';

import CompanyContactWeplanUser from '@modules/suppliers/infra/typeorm/entities/CompanyContactWeplanUser';
import AppError from '@shared/errors/AppError';

class CompanyContactWeplanUsersRepository
  implements ICompanyContactWeplanUsersRepository {
  private ormRepository: Repository<CompanyContactWeplanUser>;

  constructor() {
    this.ormRepository = getRepository(CompanyContactWeplanUser);
  }

  public async findByUserId(
    user_id: string,
  ): Promise<CompanyContactWeplanUser[]> {
    const findCompanyContactWeplanUser = await this.ormRepository.find({
      where: { user_id },
    });

    return findCompanyContactWeplanUser;
  }

  public async findByCompanyContactId(
    company_contact_id: string,
  ): Promise<CompanyContactWeplanUser | undefined> {
    const findCompanyContactWeplanUser = await this.ormRepository.findOne({
      where: { company_contact_id },
    });

    return findCompanyContactWeplanUser;
  }

  public async findByContactIdAndWeplanUser(
    company_contact_id: string,
    user_id: string,
  ): Promise<CompanyContactWeplanUser | undefined> {
    const findCompanyContactWeplanUser = await this.ormRepository.findOne({
      where: { company_contact_id, user_id },
    });

    return findCompanyContactWeplanUser;
  }

  public async findById(
    id: string,
  ): Promise<CompanyContactWeplanUser | undefined> {
    const companyContact = await this.ormRepository.findOne(id);

    return companyContact;
  }

  public async create(
    data: ICreateCompanyContactWeplanUserDTO,
  ): Promise<CompanyContactWeplanUser> {
    try {
      const companyEmployee = this.ormRepository.create(data);

      await this.ormRepository.save(companyEmployee);

      return companyEmployee;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyContactWeplanUsersRepository.create',
        err,
      );
    }
  }

  public async save(
    companyContact: CompanyContactWeplanUser,
  ): Promise<CompanyContactWeplanUser> {
    return this.ormRepository.save(companyContact);
  }

  public async delete(companyContact: CompanyContactWeplanUser): Promise<void> {
    try {
      await this.ormRepository.delete(companyContact.id);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyContactWeplanUsersRepository.delete',
      );
    }
  }
}

export default CompanyContactWeplanUsersRepository;

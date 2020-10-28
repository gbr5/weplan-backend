import { getRepository, Repository } from 'typeorm';

import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';
import ICreateCompanyMasterUserDTO from '@modules/suppliers/dtos/ICompanyMasterUserDTO';

import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';

class CompanyMasterUserRepository implements ICompanyMasterUsersRepository {
  private ormRepository: Repository<CompanyMasterUser>;

  constructor() {
    this.ormRepository = getRepository(CompanyMasterUser);
  }

  public async findByCompanyId(
    company_id: string,
  ): Promise<CompanyMasterUser[]> {
    const findCompanyMasterUser = await this.ormRepository.find({
      where: { company_id },
    });

    return findCompanyMasterUser;
  }

  public async findByUserId(user_id: string): Promise<CompanyMasterUser[]> {
    const findCompanyMasterUser = await this.ormRepository.find({
      where: { user_id },
    });

    return findCompanyMasterUser;
  }

  public async findById(id: string): Promise<CompanyMasterUser | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(
    email: string,
  ): Promise<CompanyMasterUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findByUserIdAndCompanyId(
    user_id: string,
    company_id: string,
  ): Promise<CompanyMasterUser | undefined> {
    const findCompanyMasterUser = await this.ormRepository.findOne({
      where: {
        user_id,
        company_id,
      },
    });
    return findCompanyMasterUser;
  }

  public async create(
    data: ICreateCompanyMasterUserDTO,
  ): Promise<CompanyMasterUser> {
    const companyUser = this.ormRepository.create(data);

    await this.ormRepository.save(companyUser);

    return companyUser;
  }

  public async save(user: CompanyMasterUser): Promise<CompanyMasterUser> {
    return this.ormRepository.save(user);
  }

  public async delete(user: CompanyMasterUser): Promise<void> {
    await this.ormRepository.delete(user.id);
  }
}

export default CompanyMasterUserRepository;

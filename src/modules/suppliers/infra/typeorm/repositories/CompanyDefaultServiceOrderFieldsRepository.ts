import { getRepository, Repository } from 'typeorm';

import ICompanyDefaultServiceOrderFieldsRepository from '@modules/suppliers/repositories/ICompanyDefaultServiceOrderFieldsRepository';
import ICreateCompanyDefaultServiceOrderFieldDTO from '@modules/suppliers/dtos/ICreateCompanyDefaultServiceOrderFieldDTO';

import CompanyDefaultServiceOrderField from '@modules/suppliers/infra/typeorm/entities/CompanyDefaultServiceOrderField';
import AppError from '@shared/errors/AppError';

class CompanyDefaultServiceOrderFieldsRepository
  implements ICompanyDefaultServiceOrderFieldsRepository {
  private ormRepository: Repository<CompanyDefaultServiceOrderField>;

  constructor() {
    this.ormRepository = getRepository(CompanyDefaultServiceOrderField);
  }

  public async findByCompanyId(
    company_id: string,
  ): Promise<CompanyDefaultServiceOrderField[]> {
    const findCompanyDefaultServiceOrderField = await this.ormRepository.find({
      where: { company_id },
    });

    return findCompanyDefaultServiceOrderField;
  }

  public async findByCompanyIdAndFieldName(
    company_id: string,
    field_name: string,
  ): Promise<CompanyDefaultServiceOrderField | undefined> {
    const findCompanyDefaultServiceOrderField = await this.ormRepository.findOne(
      {
        where: { company_id, field_name },
      },
    );

    return findCompanyDefaultServiceOrderField;
  }

  public async findById(
    id: string,
  ): Promise<CompanyDefaultServiceOrderField | undefined> {
    const companyContact = await this.ormRepository.findOne(id);

    return companyContact;
  }

  public async create(
    data: ICreateCompanyDefaultServiceOrderFieldDTO,
  ): Promise<CompanyDefaultServiceOrderField> {
    try {
      const companyEmployee = this.ormRepository.create(data);

      await this.ormRepository.save(companyEmployee);

      return companyEmployee;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyDefaultServiceOrderFieldsRepository.create',
        err,
      );
    }
  }

  public async save(
    companyContact: CompanyDefaultServiceOrderField,
  ): Promise<CompanyDefaultServiceOrderField> {
    return this.ormRepository.save(companyContact);
  }

  public async delete(
    companyContact: CompanyDefaultServiceOrderField,
  ): Promise<void> {
    try {
      await this.ormRepository.delete(companyContact.id);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyDefaultServiceOrderFieldsRepository.delete',
      );
    }
  }
}

export default CompanyDefaultServiceOrderFieldsRepository;

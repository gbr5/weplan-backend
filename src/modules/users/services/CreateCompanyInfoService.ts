import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICompanyInfoRepository from '@modules/users/repositories/ICompanyInfoRepository';
import CompanyInfo from '@modules/users/infra/typeorm/entities/CompanyInfo';

interface IRequest {
  company_id: string;
  user_id: string;
  name: string;
}

@injectable()
class CreateCompanyInfoService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CompanyInfoRepository')
    private companyInfoRepository: ICompanyInfoRepository,
  ) {}

  public async execute({
    company_id,
    user_id,
    name,
  }: IRequest): Promise<CompanyInfo> {
    const checkIfUserExists = await this.usersRepository.findById(user_id);

    if (!checkIfUserExists) {
      throw new AppError('Usernot found!');
    }

    if (!checkIfUserExists.isCompany) {
      throw new AppError(
        'This user has a person account, therefore, cannot create a company information profile!',
      );
    }

    const checkIfCompanyInfoExists = await this.companyInfoRepository.findByUserId(
      user_id,
    );

    if (checkIfCompanyInfoExists) {
      throw new AppError(
        'This user already have a company information profile!',
      );
    }

    const companyInfo = await this.companyInfoRepository.create({
      company_id,
      user_id,
      name,
    });

    return companyInfo;
  }
}

export default CreateCompanyInfoService;

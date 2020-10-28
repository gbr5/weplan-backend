import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import UserManagementModule from '../infra/typeorm/entities/UserManagementModule';
import ICompanyInfoRepository from '../repositories/ICompanyInfoRepository';
import IPersonInfoRepository from '../repositories/IPersonInfoRepository';
import IUserManagementModulesRepository from '../repositories/IUserManagementModulesRepository';

interface IRequest {
  email: string;
  password: string;
}

interface ICompanyInfo {
  name: string;
  company_id: string;
  logo_url?: string;
}
interface IPersonInfo {
  first_name: string;
  last_name: string;
  person_id: string;
}

interface IResponse {
  personInfo: IPersonInfo;
  modules: UserManagementModule[];
  companyInfo: ICompanyInfo;
  user: CompanyEmployee;
  token: string;
}
@injectable()
class AuthenticatePROService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('CompanyInfoRepository')
    private companyInfoRepository: ICompanyInfoRepository,

    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,

    @inject('UserManagementModulesRepository')
    private userManagementModulesRepository: IUserManagementModulesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.companyEmployeesRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid e-mail adress/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Invalid e-mail adress/password combination.', 401);
    }
    if (!user.isActive) {
      throw new AppError(
        'Este usuário está temporariamente suspenso, entre em contato com a empresa responsável.',
        401,
      );
    }

    const modules = await this.userManagementModulesRepository.findByUserId(
      user.id,
    );

    if (!modules) {
      throw new AppError('This user does not have modules access.', 401);
    }

    const companyInfoPlaceholder = {
      name: user.id,
      company_id: user.id,
      logo_url: user.avatar ? user.avatar : '',
    };
    const personInfoPlaceholder = {
      first_name: user.id,
      last_name: user.id,
      person_id: user.id,
    };
    const company_info = await this.companyInfoRepository.findByUserId(
      user.company_id,
    );
    const companyInfo =
      company_info === undefined ? companyInfoPlaceholder : company_info;
    const person_info = await this.personInfoRepository.findByUserId(
      user.employee_id,
    );
    const personInfo =
      person_info === undefined ? personInfoPlaceholder : person_info;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      companyInfo,
      modules,
      personInfo,
      user,
      token,
    };
  }
}

export default AuthenticatePROService;

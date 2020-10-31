import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';

import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';
import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';
import UserManagementModule from '../infra/typeorm/entities/UserManagementModule';
import IUserManagementModulesRepository from '../repositories/IUserManagementModulesRepository';
import ICompanyInfoRepository from '../repositories/ICompanyInfoRepository';
import IPersonInfoRepository from '../repositories/IPersonInfoRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponseCompanyInfo {
  id: string;
  name: string;
  company_id: string;
  getLogoUrl: FunctionStringCallback;
}

interface ICompanyInfo {
  id: string;
  name: string;
  company_id: string;
  logo_url: string;
}
interface IPersonInfo {
  first_name: string;
  last_name: string;
  person_id: string;
}

interface IResponse {
  user: CompanyMasterUser;
  companyInfo: ICompanyInfo;
  personInfo: IPersonInfo;
  modules: UserManagementModule[];
  token: string;
}
@injectable()
class AuthenticateEnterpriseService {
  constructor(
    @inject('UserManagementModulesRepository')
    private userManagementModulesRepository: IUserManagementModulesRepository,

    @inject('CompanyInfoRepository')
    private companyInfoRepository: ICompanyInfoRepository,

    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,

    @inject('CompanyMasterUsersRepository')
    private companyMasterUsersRepository: ICompanyMasterUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.companyMasterUsersRepository.findByEmail(email);

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
    const modules = await this.userManagementModulesRepository.findByUserId(
      user.company_id,
    );

    if (!modules) {
      throw new AppError('This user does not have modules access.', 401);
    }

    const companyInfoPlaceholder = {
      id: '',
      name: '',
      company_id: '',
      logo_url: '',
    };
    const personInfoPlaceholder = {
      first_name: '',
      last_name: '',
      person_id: '',
    };

    const company_info = await this.companyInfoRepository.findByUserId(
      user.company_id,
    );

    const person_info = await this.personInfoRepository.findByUserId(
      user.user_id,
    );

    const companyInfo =
      company_info === undefined ? companyInfoPlaceholder : company_info;

    const personInfo =
      person_info === undefined ? personInfoPlaceholder : person_info;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    const logo_url = company_info ? company_info.getLogoUrl() : '';

    if (!user.isConfirmed) {
      user.isConfirmed = true;

      await this.companyMasterUsersRepository.save(user);
    }

    return {
      companyInfo: {
        id: companyInfo.id,
        company_id: companyInfo.company_id,
        name: companyInfo.name,
        logo_url: logo_url || '',
      },
      personInfo,
      modules,
      user,
      token,
    };
  }
}

export default AuthenticateEnterpriseService;

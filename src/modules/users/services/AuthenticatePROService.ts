import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IFunnelsRepository from '@modules/suppliers/repositories/IFunnelsRepository';
import UserManagementModule from '../infra/typeorm/entities/UserManagementModule';
import ICompanyInfoRepository from '../repositories/ICompanyInfoRepository';
import IPersonInfoRepository from '../repositories/IPersonInfoRepository';
import IUserManagementModulesRepository from '../repositories/IUserManagementModulesRepository';
import IUserConfirmationRepository from '../repositories/IUserConfirmationRepository';
import UserConfirmation from '../infra/typeorm/entities/UserConfirmation';
import IFunnelDTO from '../dtos/IListFunnelDTO';

interface IRequest {
  email: string;
  password: string;
}

interface ICompanyInfo {
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
  personInfo: IPersonInfo;
  modules: UserManagementModule[];
  confirmation: UserConfirmation;
  companyInfo: ICompanyInfo;
  user: CompanyEmployee;
  token: string;
  funnels: IFunnelDTO[];
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

    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,

    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,

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

    const companyFunnels = await this.funnelsRepository.findBySupplierId(
      user.company_id,
    );

    if (!companyFunnels) {
      throw new AppError('The company does not have funnels.', 401);
    }

    const comercial = modules.filter(
      thisModule => thisModule.management_module === 'Comercial',
    );
    const production = modules.filter(
      thisModule => thisModule.management_module === 'Production',
    );
    const projects = modules.filter(
      thisModule => thisModule.management_module === 'Projects',
    );
    const financial = modules.filter(
      thisModule => thisModule.management_module === 'Financial',
    );

    const employeeFunnels: IFunnelDTO[] = [];

    if (comercial.length > 0) {
      const crmAccess = companyFunnels.find(
        ciaFunnel => ciaFunnel.name === 'Comercial',
      );
      if (crmAccess) {
        employeeFunnels.push(crmAccess);
      }
    }

    if (production.length > 0) {
      const productionAccess = companyFunnels.find(
        ciaFunnel => ciaFunnel.name === 'Production',
      );
      if (productionAccess) {
        employeeFunnels.push(productionAccess);
      }
    }

    if (projects.length > 0) {
      const projectsAccess = companyFunnels.find(
        ciaFunnel => ciaFunnel.name === 'Projects',
      );
      if (projectsAccess) {
        employeeFunnels.push(projectsAccess);
      }
    }

    if (financial.length > 0) {
      const financialAccess = companyFunnels.find(
        ciaFunnel => ciaFunnel.name === 'Financial',
      );
      if (financialAccess) {
        employeeFunnels.push(financialAccess);
      }
    }

    const confirmation = await this.userConfirmationRepository.findByReceiverIdAndSenderId(
      user.id,
      user.company.id,
    );

    if (!confirmation) {
      throw new AppError('This user does not have confirmation request.', 401);
    }

    if (confirmation.isConfirmed === false) {
      confirmation.isConfirmed = true;
      await this.userConfirmationRepository.save(confirmation);
    }

    const companyInfoPlaceholder = {
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
    const logo_url = company_info ? company_info.getLogoUrl() : '';

    return {
      companyInfo: {
        company_id: companyInfo.company_id,
        name: companyInfo.name,
        logo_url: logo_url || '',
      },
      modules,
      personInfo,
      confirmation,
      user,
      token,
      funnels: employeeFunnels,
    };
  }
}

export default AuthenticatePROService;

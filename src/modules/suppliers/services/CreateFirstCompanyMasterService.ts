import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';
import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';
import ICompanyEmployeesRepository from '../repositories/ICompanyEmployeesRepository';
import IFunnelsRepository from '../repositories/IFunnelsRepository';
import IFunnelStagesRepository from '../repositories/IFunnelStagesRepository';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';

interface IRequest {
  user_id: string;
  companyEmail: string;
  email: string;
  password: string;
  name: string;
  family_name: string;
}

@injectable()
class CreateFirstCompanyMasterService {
  constructor(
    @inject('CompanyMasterUsersRepository')
    private companyMasterUsersRepository: ICompanyMasterUsersRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,

    @inject('FunnelStagesRepository')
    private funnelStagesRepository: IFunnelStagesRepository,

    @inject('UserManagementModulesRepository')
    private managementModulesRepository: IUserManagementModulesRepository,

    @inject('UserConfirmationRepository')
    private userConfirmationsRepository: IUserConfirmationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    companyEmail,
    email,
    password,
    name,
    family_name,
  }: IRequest): Promise<CompanyMasterUser> {
    const user = await this.usersRepository.findById(user_id);
    const company = await this.usersRepository.findByEmail(companyEmail);

    if (!user) {
      throw new AppError("User's user not found");
    }
    if (!company) {
      throw new AppError("User's user not found");
    }
    if (user.isCompany) {
      throw new AppError(
        'It is not possible to add a company as an user Master',
      );
    }
    const companyMasterUserExists = await this.companyMasterUsersRepository.findByUserIdAndCompanyId(
      user_id,
      company.id,
    );

    if (companyMasterUserExists) {
      throw new AppError(
        `${user_id} is already registered to ${company.name}.`,
      );
    }

    const emailRegistered = await this.companyMasterUsersRepository.findByEmail(
      email,
    );

    if (emailRegistered) {
      throw new AppError(`${email} is already registered to ${company.name}.`);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const companyMasterUser = await this.companyMasterUsersRepository.create({
      user_id,
      email,
      password: hashedPassword,
      company_id: company.id,
      isConfirmed: false,
    });

    const companyEmployee = await this.companyEmployeesRepository.create({
      access_key: hashedPassword,
      company_id: company.id,
      employee_id: user.id,
      isActive: true,
      position: 'Master',
      email,
      password: hashedPassword,
    });
    Promise.all([
      this.companyContactsRepository.create({
        company_contact_type: 'Employee',
        company_id: company.id,
        description: 'Usuário Master',
        family_name,
        name,
        isCompany: false,
        isNew: true,
        weplanUser: false,
      }),
      this.userConfirmationsRepository.create({
        isConfirmed: true,
        message: 'Seja bem vindo',
        receiver_id: companyEmployee.id,
        sender_id: company.id,
        title: 'WePlan PRO Master',
      }),
      this.managementModulesRepository.create({
        access_level: 1,
        management_module: 'Comercial',
        user_id: companyEmployee.id,
      }),
    ]);
    const response = await this.funnelsRepository.create({
      name: 'Comercial',
      funnel_type: 'Comercial',
      supplier_id: company.id,
    });

    Promise.all([
      this.funnelStagesRepository.create({
        funnel_id: response.id,
        funnel_order: 1,
        name: 'Prospectos',
      }),
      this.funnelStagesRepository.create({
        funnel_id: response.id,
        funnel_order: 2,
        name: '1° Contato',
      }),
      this.funnelStagesRepository.create({
        funnel_id: response.id,
        funnel_order: 3,
        name: 'Orçamento Enviado',
      }),
      this.funnelStagesRepository.create({
        funnel_id: response.id,
        funnel_order: 4,
        name: 'Negociação',
      }),
      this.funnelStagesRepository.create({
        funnel_id: response.id,
        funnel_order: 5,
        name: 'Contrato Enviado',
      }),
    ]);

    return companyMasterUser;
  }
}

export default CreateFirstCompanyMasterService;

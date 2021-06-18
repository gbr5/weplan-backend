import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';
import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';
import IEmployeeCheckListRepository from '@modules/checklists/repositories/IEmployeeCheckListRepository';
import ICheckListsRepository from '@modules/checklists/repositories/ICheckListsRepository';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';
import IPersonInfoRepository from '@modules/users/repositories/IPersonInfoRepository';
import ICompanyEmployeesRepository from '../repositories/ICompanyEmployeesRepository';
import IFunnelsRepository from '../repositories/IFunnelsRepository';
import IFunnelStagesRepository from '../repositories/IFunnelStagesRepository';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';
import ICompanyEmployeeContactsRepository from '../repositories/ICompanyEmployeeContactRepository';
import ICompanyContactInfosRepository from '../repositories/ICompanyContactInfosRepository';

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

    @inject('CompanyEmployeeContactRepository')
    private companyEmployeeContactsRepository: ICompanyEmployeeContactsRepository,

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,

    @inject('CompanyContactInfosRepository')
    private companyContactInfosRepository: ICompanyContactInfosRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,

    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,

    @inject('FunnelStagesRepository')
    private funnelStagesRepository: IFunnelStagesRepository,

    @inject('UserManagementModulesRepository')
    private managementModulesRepository: IUserManagementModulesRepository,

    @inject('UserConfirmationRepository')
    private userConfirmationsRepository: IUserConfirmationRepository,

    @inject('EmployeeCheckListRepository')
    private employeeCheckListRepository: IEmployeeCheckListRepository,

    @inject('CheckListsRepository')
    private checkListsRepository: ICheckListsRepository,

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
    // Tem algum erro nestas rotas abaixo, em desenvolvimento, acaba travando o backend
    // Que é destravado quando o backend é renderizado

    const user = await this.usersRepository.findById(user_id);
    const company = await this.usersRepository.findByEmail(companyEmail);

    if (!user) {
      throw new AppError("User's user not found");
    }
    if (!user.isActive) {
      user.isActive = true;

      await this.usersRepository.save(user);
    }
    if (!company) {
      throw new AppError("User's user not found");
    }
    if (user.isCompany) {
      throw new AppError(
        'It is not possible to add a company as a master user',
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
    const response = await this.funnelsRepository.create({
      name: 'Comercial',
      funnel_type: 'Comercial',
      supplier_id: company.id,
    });

    await this.funnelStagesRepository.create({
      funnel_id: response.id,
      funnel_order: 1,
      name: 'Prospectos',
    });
    if (!user.personInfo) {
      const first_name = name;
      const last_name = family_name;
      const findByNameAndFamilyName = await this.personInfoRepository.findByFirstAndLastName(
        first_name,
        last_name,
      );

      if (findByNameAndFamilyName) {
        await this.personInfoRepository.create({
          first_name: name,
          last_name: `${family_name} ${company.name}`,
          person_id: user_id,
          user_id,
        });
      } else {
        await this.personInfoRepository.create({
          first_name: name,
          last_name: family_name,
          person_id: user_id,
          user_id,
        });
      }
    }
    await this.funnelStagesRepository.create({
      funnel_id: response.id,
      funnel_order: 2,
      name: '1° Contato',
    });
    const hashedPassword = await this.hashProvider.generateHash(password);
    await this.funnelStagesRepository.create({
      funnel_id: response.id,
      funnel_order: 3,
      name: 'Orçamento Enviado',
    });
    const companyMasterUser = await this.companyMasterUsersRepository.create({
      user_id,
      email,
      password: hashedPassword,
      company_id: company.id,
      isConfirmed: false,
    });

    await this.funnelStagesRepository.create({
      funnel_id: response.id,
      funnel_order: 4,
      name: 'Negociação',
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
    const companyContact = await this.companyContactsRepository.create({
      company_contact_type: 'Employee',
      company_id: company.id,
      description: 'Usuário Master',
      family_name,
      name,
      isCompany: false,
      isNew: true,
      weplanUser: false,
    });

    const checkList = await this.checkListsRepository.create({
      color: 'transparent',
      due_date: String(new Date()),
      isActive: true,
      name: `Tarefas do Colaborador ${companyEmployee.email}`,
      priority: 'high',
      user_id: company.id,
    });
    Promise.all([
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
      this.companyEmployeeContactsRepository.create({
        company_contact_id: companyContact.id,
        employee_id: companyEmployee.id,
      }),
      this.companyContactInfosRepository.create({
        company_contact_id: companyContact.id,
        info: companyEmployee.email,
        info_type: 'Email',
      }),
      this.employeeCheckListRepository.create({
        employee_id: companyEmployee.id,
        check_list_id: checkList.id,
      }),
    ]);
    await this.funnelStagesRepository.create({
      funnel_id: response.id,
      funnel_order: 5,
      name: 'Contrato Enviado',
    });
    return companyMasterUser;
  }
}

export default CreateFirstCompanyMasterService;

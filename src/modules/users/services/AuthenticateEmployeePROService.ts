import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IUserConfirmationRepository from '../repositories/IUserConfirmationRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  employee: CompanyEmployee;
  token: string;
}
@injectable()
class AuthenticatePROService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const employee = await this.companyEmployeesRepository.findByEmail(email);
    if (!employee) {
      throw new AppError('Invalid e-mail adress/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      employee.password,
    );

    if (!passwordMatched) {
      throw new AppError('Invalid e-mail adress/password combination.', 401);
    }
    if (!employee.isActive) {
      throw new AppError(
        'Este usuário está temporariamente suspenso, entre em contato com a empresa responsável.',
        401,
      );
    }

    const confirmation = await this.userConfirmationRepository.findByReceiverIdAndSenderId(
      employee.id,
      employee.company.id,
    );

    if (!confirmation) {
      throw new AppError(
        'This employee does not have confirmation request.',
        401,
      );
    }

    if (confirmation.isConfirmed === false) {
      confirmation.isConfirmed = true;
      await this.userConfirmationRepository.save(confirmation);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: employee.id,
      expiresIn,
    });

    return {
      employee,
      token,
    };
  }
}

export default AuthenticatePROService;

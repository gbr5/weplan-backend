import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import { OAuth2Client } from 'google-auth-library';
import IUserConfirmationRepository from '../repositories/IUserConfirmationRepository';

interface IRequest {
  googleEmail: string;
  googleToken: string;
}

interface IResponse {
  employee: CompanyEmployee;
  token: string;
}
@injectable()
class AuthenticateEmployeePROWithGoogleService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,
  ) {}

  public async execute({
    googleEmail,
    googleToken,
  }: IRequest): Promise<IResponse> {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      throw new AppError('Invalid e-mail adress/password combination.', 401);
    }
    const { email } = payload;

    const employee = await this.companyEmployeesRepository.findByEmail(
      googleEmail,
    );

    if (!employee || employee.email !== email) {
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
      throw new AppError('This user does not have confirmation request.', 401);
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
      token,
      employee,
    };
  }
}

export default AuthenticateEmployeePROWithGoogleService;

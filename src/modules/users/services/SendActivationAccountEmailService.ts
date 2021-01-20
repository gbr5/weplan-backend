import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendActivationAccountEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    console.log(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const accountActivationTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'activate_account.hbs',
    );
    console.log({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[WePlan] Ativação de conta',
      templateData: {
        file: accountActivationTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/wellcome?token=${token}`,
        },
      },
    });
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[WePlan] Ativação de conta',
      templateData: {
        file: accountActivationTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/wellcome?token=${token}`,
        },
      },
    });
  }
}

export default SendActivationAccountEmailService;

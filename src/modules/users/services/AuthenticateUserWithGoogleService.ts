import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';
import { OAuth2Client } from 'google-auth-library';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserGoogleProfilesRepository from '@modules/googleProfiles/repositories/IUserGoogleProfilesRepository';
import IGoogleProfilesRepository from '@modules/googleProfiles/repositories/IGoogleProfilesRepository';
import IUserFileCategoriesRepository from '../repositories/IUserFileCategoriesRepository';

interface IRequest {
  googleEmail: string;
  googleToken: string;
  name: string;
  givenName: string;
  familyName: string;
  googleId: string;
  imageUrl: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserWithGoogleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserFileCategoriesRepository')
    private userFileCategoriesRepository: IUserFileCategoriesRepository,

    @inject('UserGoogleProfilesRepository')
    private userGoogleProfilesRepository: IUserGoogleProfilesRepository,

    @inject('GoogleProfilesRepository')
    private googleProfilesRepository: IGoogleProfilesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    googleEmail,
    googleToken,
    name,
    givenName,
    familyName,
    googleId,
    imageUrl,
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
    // const { sub, email, name, picture } = payload;
    // const userId = sub;
    // console.log({ userId, email, fullName: name, photoUrl: picture });

    const user = await this.usersRepository.findByEmail(googleEmail);

    if (!user) {
      throw new AppError('Invalid e-mail adress/password combination.', 401);
    }

    const userGoogleProfile = await this.userGoogleProfilesRepository.findByUserId(
      user.id,
    );

    if (!userGoogleProfile) {
      const googleProfile = await this.googleProfilesRepository.create({
        email: googleEmail,
        name,
        givenName,
        familyName,
        googleId,
        imageUrl,
      });
      await this.userGoogleProfilesRepository.create(user.id, googleProfile.id);
    }
    if (!email || user.email !== email) {
      throw new AppError('Invalid e-mail adress/password combination.', 401);
    }

    if (!user.isActive) {
      user.isActive = true;
      await this.usersRepository.save(user);
    }

    const userFileCategories = await this.userFileCategoriesRepository.findByUserId(
      user.id,
    );

    if (!userFileCategories) {
      Promise.all([
        this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Transações',
          description: 'Comprovantes de transações.',
          color: 'rgba(229, 93, 93, 1)',
        }),
        this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Contratos',
          description: 'Contratos de produtos e serviços.',
          color: 'rgba(97, 181, 255, 1)',
        }),
        this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Orçamentos',
          description: 'Orçamentos de produtos e serviços.',
          color: 'rgba(233, 208, 119, 1)',
        }),
        this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Convites',
          description: 'Convites dos seus eventos.',
          color: 'rgba(151, 233, 119, 1)',
        }),
        this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Convites de Amigos',
          description: 'Convites dos eventos de amigos.',
          color: 'rgba(233, 172, 119, 1)',
        }),
        this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Atas de Reuniões',
          description: 'Atas de reuniões com fornecedores e/ou parceiros.',
          color: 'rgba(176, 242, 232, 1)',
        }),
        this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Outros',
          description: 'Demais arquivos.',
          color: 'rgba(250, 252, 232, 1)',
        }),
      ]);
    } else {
      const transactionsCategory = userFileCategories.find(
        category => category.name === 'Transações',
      );
      const contractsCategory = userFileCategories.find(
        category => category.name === 'Contratos',
      );
      const budgetsCategory = userFileCategories.find(
        category => category.name === 'Orçamentos',
      );
      const invitationsCategory = userFileCategories.find(
        category => category.name === 'Convites',
      );
      const friendsInvitationsCategory = userFileCategories.find(
        category => category.name === 'Convites de Amigos',
      );
      const minutesOfMeetingsCategory = userFileCategories.find(
        category => category.name === 'Atas de Reuniões',
      );
      const othersCategory = userFileCategories.find(
        category => category.name === 'Outros',
      );

      if (!transactionsCategory) {
        await this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Transações',
          description: 'Comprovantes de transações.',
          color: 'rgba(229, 93, 93, 1)',
        });
      }
      if (!contractsCategory) {
        await this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Contratos',
          description: 'Contratos de produtos e serviços.',
          color: 'rgba(97, 181, 255, 1)',
        });
      }
      if (!budgetsCategory) {
        await this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Orçamentos',
          description: 'Orçamentos de produtos e serviços.',
          color: 'rgba(233, 208, 119, 1)',
        });
      }
      if (!invitationsCategory) {
        await this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Convites',
          description: 'Convites dos seus eventos.',
          color: 'rgba(151, 233, 119, 1)',
        });
      }
      if (!friendsInvitationsCategory) {
        await this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Convites de Amigos',
          description: 'Convites dos eventos de amigos.',
          color: 'rgba(233, 172, 119, 1)',
        });
      }
      if (!minutesOfMeetingsCategory) {
        await this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Atas de Reuniões',
          description: 'Atas de reuniões com fornecedores e/ou parceiros.',
          color: 'rgba(176, 242, 232, 1)',
        });
      }
      if (!othersCategory) {
        await this.userFileCategoriesRepository.create({
          user_id: user.id,
          name: 'Outros',
          description: 'Demais arquivos.',
          color: 'rgba(250, 252, 232, 1)',
        });
      }
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserWithGoogleService;

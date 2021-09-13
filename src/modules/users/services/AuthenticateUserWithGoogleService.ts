import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';
import { OAuth2Client } from 'google-auth-library';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPersonInfoRepository from '@modules/users/repositories/IPersonInfoRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import IGoogleProfilesRepository from '@modules/googleProfiles/repositories/IGoogleProfilesRepository';
// import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

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

    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,

    @inject('GoogleProfilesRepository')
    private googleProfilesRepository: IGoogleProfilesRepository,
  ) {}

  public async execute({
    googleEmail,
    googleToken,
    name,
    givenName,
    familyName,
    googleId,
  }: // imageUrl,
  IRequest): Promise<IResponse> {
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

    let newUser = {} as User;

    if (!user) {
      // throw new AppError('Invalid e-mail adress/password combination.', 401);
      const response = await this.usersRepository.create({
        email: email ?? googleEmail,
        isCompany: false,
        name,
        password: googleId,
        trimmed_name: givenName,
      });
      newUser = response;

      await this.personInfoRepository.create({
        first_name: givenName,
        last_name: familyName,
        person_id: newUser.id,
        user_id: newUser.id,
      });
    } else {
      newUser = user;
      const personInfo = await this.personInfoRepository.findByUserId(user.id);
      if (!personInfo) {
        await this.personInfoRepository.create({
          first_name: givenName,
          last_name: familyName,
          person_id: user.id,
          user_id: user.id,
        });
      }
    }
    // const userGoogleProfile = await this.userGoogleProfilesRepository.findByUserId(
    //   newUser.id,
    // );

    // if (!userGoogleProfile) {
    //   const googleProfile = await this.googleProfilesRepository.create({
    //     email: googleEmail,
    //     name,
    //     givenName,
    //     familyName,
    //     googleId,
    //     imageUrl,
    //   });
    //   await this.userGoogleProfilesRepository.create(
    //     newUser.id,
    //     googleProfile.id,
    //   );
    // }
    if (!email || newUser.email !== email) {
      throw new AppError('Invalid e-mail adress/password combination.', 401);
    }

    if (!newUser.isActive) {
      newUser.isActive = true;
      await this.usersRepository.save(newUser);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: newUser.id,
      expiresIn,
    });

    return {
      user: newUser,
      token,
    };
  }
}

export default AuthenticateUserWithGoogleService;

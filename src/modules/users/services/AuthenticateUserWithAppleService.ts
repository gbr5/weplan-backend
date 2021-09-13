import { sign, decode, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';
import jwksClient from 'jwks-rsa';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import IPersonInfoRepository from '../repositories/IPersonInfoRepository';

interface IPayload {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  nonce: string;
  c_hash: string;
  email: string;
  email_verified: string;
  auth_time: number;
  nonce_supported: string;
}

interface IAppleJWT {
  header: {
    kid: string;
    alg: string;
  };
  payload: IPayload;
  signature: string;
}

interface IRequest {
  provider: string;
  appleResponse: {
    identityToken: string;
    user: string;
    authorizationCode: string;
    fullName?: {
      givenName: string | null;
      familyName: string | null;
    };
  };
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserWithAppleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,
  ) {}

  public async execute({
    appleResponse,
    provider,
  }: IRequest): Promise<IResponse> {
    // Sign In with aready created user or create user then Sign In
    if (provider !== 'apple') throw new AppError('User not found!');
    const { identityToken } = appleResponse;
    const appleJWT = decode(identityToken, { complete: true }) as IAppleJWT;

    if (!appleJWT) throw new AppError('User not found!');

    const { kid } = appleJWT.header;

    const client = await jwksClient({
      jwksUri: 'https://appleid.apple.com/auth/keys',
    });

    const key = await client.getSigningKey(kid);

    if (!key) throw new AppError('User not found!');

    const appleKey = key.getPublicKey();

    if (!appleKey) throw new AppError('User not found!');

    const payloadResponse = (await verify(
      identityToken,
      appleKey,
      (err, payload) => {
        if (err) return console.log(err);
        return payload;
      },
    )) as IPayload | undefined;

    if (!payloadResponse) throw new AppError('User not found!');

    const { aud, email_verified, email } = payloadResponse;
    const { fullName } = appleResponse;

    if (
      aud !== 'com.weplanapp-' ||
      !email_verified ||
      email !== appleJWT.payload.email
    )
      throw new AppError('User not found!');

    const findUser = await this.usersRepository.findByEmail(email);
    const users: User[] = [];

    if (!findUser) {
      if (fullName && fullName.givenName && fullName.familyName) {
        const nickName = `${fullName.givenName} ${fullName.familyName}`;
        const findUserGivenName = await this.usersRepository.findByTrimmedName(
          nickName,
        );
        if (!findUserGivenName) {
          const newUser = await this.usersRepository.create({
            email,
            isCompany: false,
            name: nickName,
            password: identityToken,
            trimmed_name: `${fullName.givenName}-${fullName.familyName}`,
          });
          users.push(newUser);
        } else {
          const newUser = await this.usersRepository.create({
            email,
            isCompany: false,
            name: email,
            password: identityToken,
            trimmed_name: email,
          });
          users.push(newUser);
        }
        await this.personInfoRepository.create({
          first_name: fullName.givenName,
          last_name: fullName.familyName,
          person_id: users[0].id,
          user_id: users[0].id,
        });
      } else {
        const newUser = await this.usersRepository.create({
          email,
          isCompany: false,
          name: email,
          password: identityToken,
          trimmed_name: email,
        });
        users.push(newUser);
      }
    } else {
      users.push(findUser);
    }

    const thisUser = users[0];

    if (!thisUser.isActive) {
      thisUser.isActive = true;
      await this.usersRepository.save(thisUser);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: thisUser.id,
      expiresIn,
    });

    return {
      user: thisUser,
      token,
    };
  }
}

export default AuthenticateUserWithAppleService;
